import breadcrumbsPathFactory from './BreadcrumbsPathFactory';

describe('BreadcrumbsPathFactory', () => {

  it('should create an options from a url', () => {
    const url = 'aaa/bbb/ccc';
    const options = [
      {id: 0, value: 'aaa', link: '/aaa'},
      {id: 1, value: 'bbb', link: '/aaa/bbb'},
      {id: 2, value: 'ccc', link: '/aaa/bbb/ccc'}
    ];
    expect(breadcrumbsPathFactory(url)).toEqual(options);
  });

  it('should create an options from a url with baseUrl include', () => {
    const url = 'aaa/bbb/ccc';
    const baseUrlLink = 'https://www.wix.com';
    const baseUrlValue = 'wix';
    const options = [
      {id: 0, value: 'wix', link: 'https://www.wix.com'},
      {id: 1, value: 'aaa', link: 'https://www.wix.com/aaa'},
      {id: 2, value: 'bbb', link: 'https://www.wix.com/aaa/bbb'},
      {id: 3, value: 'ccc', link: 'https://www.wix.com/aaa/bbb/ccc'}
    ];
    expect(breadcrumbsPathFactory(url, baseUrlLink, baseUrlValue)).toEqual(options);
  });

  it('should create an options from a url with baseUrl not include', () => {
    const url = 'aaa/bbb/ccc';
    const baseUrlLink = 'https://www.wix.com';
    const options = [
      {id: 0, value: 'aaa', link: 'https://www.wix.com/aaa'},
      {id: 1, value: 'bbb', link: 'https://www.wix.com/aaa/bbb'},
      {id: 2, value: 'ccc', link: 'https://www.wix.com/aaa/bbb/ccc'}
    ];
    expect(breadcrumbsPathFactory(url, baseUrlLink)).toEqual(options);
  });
  it('should create an options from a url with a custom separator', () => {
    const url = 'aaa-bbb-ccc';
    const separator = '-';
    const options = [
      {id: 0, value: 'aaa', link: '/aaa'},
      {id: 1, value: 'bbb', link: '/aaa/bbb'},
      {id: 2, value: 'ccc', link: '/aaa/bbb/ccc'}
    ];
    expect(breadcrumbsPathFactory(url, '', null, separator)).toEqual(options);
  });

});
