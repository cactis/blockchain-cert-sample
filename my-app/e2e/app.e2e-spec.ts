import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for my-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be my-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('my-app');
    })
  });

  it('navbar-brand should be cert-network@0.0.9',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('cert-network@0.0.9');
  });

  
    it('CertTemplate component should be loadable',() => {
      page.navigateTo('/CertTemplate');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('CertTemplate');
    });

    it('CertTemplate table should have 4 columns',() => {
      page.navigateTo('/CertTemplate');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('Cert component should be loadable',() => {
      page.navigateTo('/Cert');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Cert');
    });

    it('Cert table should have 6 columns',() => {
      page.navigateTo('/Cert');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  

});
