import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

// Create jsdom version of document and window
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

// Attach to global object so that react can discover
global.document = doc;
global.window = win;

// Attach all window properties to global so window.prop isn't required
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
