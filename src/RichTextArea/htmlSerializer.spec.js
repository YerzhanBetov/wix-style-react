import {Raw} from 'slate';
import htmlSerializer from './htmlSerializer';

describe('HTML serializer', () => {
  it('should correctly deserialize HTML string', () => {
    const text = `<p>Hello<strong>bold text</strong><em>italic<u>and underlined</u></em></p><ol><li>one</li><li>two</li></ol><p><a href="http://localhost">Link to localhost</a></p>`;
    const expected = {
      nodes: [
        {
          kind: 'block',
          type: 'paragraph',
          nodes: [
            {
              kind: 'text',
              ranges: [
                {
                  text: 'Hello'
                },
                {
                  text: 'bold text',
                  marks: [
                    {type: 'bold'}
                  ]
                },
                {
                  text: 'italic',
                  marks: [
                    {type: 'italic'}
                  ]
                },
                {
                  text: 'and underlined',
                  marks: [
                    {type: 'underline'},
                    {type: 'italic'}
                  ]
                }
              ]
            }
          ]
        },
        {
          kind: 'block',
          type: 'ordered-list',
          nodes: [
            {
              kind: 'block',
              type: 'list-item',
              nodes: [
                {
                  kind: 'text',
                  text: 'one'
                }
              ]
            },
            {
              kind: 'block',
              type: 'list-item',
              nodes: [
                {
                  kind: 'text',
                  text: 'two'
                }
              ]
            }
          ]
        },
        {
          kind: 'block',
          type: 'paragraph',
          nodes: [
            {kind: 'text', text: ''},
            {
              kind: 'inline',
              type: 'link',
              data: {
                href: 'http://localhost'
              },
              nodes: [
                {
                  kind: 'text',
                  text: 'Link to localhost'
                }
              ]
            },
            {kind: 'text', text: ''}
          ]
        }
      ]
    };

    const deserialized = htmlSerializer.deserialize(text);
    expect(Raw.serialize(deserialized, {terse: true})).toEqual(expected);
  });

  it('should correctly serialize slate object to HTML string', () => {
    const expected = `<ul><li>one</li><li>two</li></ul><p>Text here<strong>bold text</strong><em>italic</em><em><u>and underlined</u></em><a rel="noopener noreferrer" target="_blank" href="http://localhost">Link</a></p>`;
    const state = {
      nodes: [
        {
          kind: 'block',
          type: 'unordered-list',
          nodes: [
            {
              kind: 'block',
              type: 'list-item',
              nodes: [
                {
                  kind: 'text',
                  text: 'one'
                }
              ]
            },
            {
              kind: 'block',
              type: 'list-item',
              nodes: [
                {
                  kind: 'text',
                  text: 'two'
                }
              ]
            }
          ]
        },
        {
          kind: 'block',
          type: 'paragraph',
          nodes: [
            {
              kind: 'text',
              ranges: [
                {
                  text: 'Text here'
                },
                {
                  text: 'bold text',
                  marks: [
                    {type: 'bold'}
                  ]
                },
                {
                  text: 'italic',
                  marks: [
                    {type: 'italic'}
                  ]
                },
                {
                  text: 'and underlined',
                  marks: [
                    {type: 'underline'},
                    {type: 'italic'}
                  ]
                }
              ]
            },
            {
              kind: 'inline',
              type: 'link',
              data: {
                href: 'http://localhost'
              },
              nodes: [
                {
                  kind: 'text',
                  text: 'Link'
                }
              ]
            }
          ]
        }
      ]
    };
    const serialized = Raw.deserialize(state, {terse: true});
    expect(htmlSerializer.serialize(serialized)).toEqual(expected);
  });
});
