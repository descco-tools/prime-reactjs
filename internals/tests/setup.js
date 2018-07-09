const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

require('@babel/register')();

Enzyme.configure({ adapter: new Adapter() });

const jsdom = require('jsdom').jsdom;
const exposedProperties = ['window', 'navigator', 'document'];

const document = jsdom('', {
  url: 'http://localhost/',
});
global.document = document;
global.window = document.defaultView;
global.window.localStorage = global.window.sessionStorage = {
  getItem(key) {
    return this[key];
  },
  setItem(key, value) {
    this[key] = value;
  },
  removeItem(key) {
    delete this[key];
  },
};
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
