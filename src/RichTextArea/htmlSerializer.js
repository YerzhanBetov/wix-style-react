import React from 'react';
import {Html} from 'slate';

const BLOCK_TAGS = {
  p: 'paragraph',
  ul: 'unordered-list',
  li: 'list-item',
  ol: 'ordered-list',
  img: 'image'
};

const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline'
};

const INLINE_TAGS = {
  a: 'link'
};

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName];
      if (!type) {
        return;
      }

      const data = {};
      switch (type) {
        case 'image': {
          data.src = el.attribs.src;
          break;
        }
        default: break;
      }

      return {
        kind: 'block',
        type,
        data,
        nodes: next(el.children)
      };
    },
    serialize(object, children) {
      if (object.kind !== 'block') {
        return;
      }

      switch (object.type) {
        case 'paragraph': return <p>{children}</p>;
        case 'list-item': return <li>{children}</li>;
        case 'ordered-list': return <ol>{children}</ol>;
        case 'unordered-list': return <ul>{children}</ul>;//data-hook="editor-image"
        case 'image': return <img data-hook="editor-image" src={object.data.get('src')}/>;
        default: return {children};
      }
    }
  },
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName];
      if (!type) {
        return;
      }

      return {
        kind: 'mark',
        type,
        nodes: next(el.children)
      };
    },
    serialize(object, children) {
      if (object.kind !== 'mark') {
        return;
      }

      switch (object.type) {
        case 'bold': return <strong>{children}</strong>;
        case 'italic': return <em>{children}</em>;
        case 'underline': return <u>{children}</u>;
        default: return {children};
      }
    }
  },
  {
    deserialize(el, next) {
      const type = INLINE_TAGS[el.tagName];
      if (!type) {
        return;
      }

      return {
        kind: 'inline',
        type,
        data: {
          href: el.attribs.href
        },
        nodes: next(el.children)
      };
    },
    serialize(object, children) {
      if (object.kind !== 'inline') {
        return;
      }

      switch (object.type) {
        case 'link': return <a rel="noopener noreferrer" target="_blank" href={object.data.get('href')}>{children}</a>;
        default: return {children};
      }
    }
  }
];

export default new Html({rules});
