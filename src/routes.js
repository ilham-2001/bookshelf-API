const handler = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handler.addBooksHandler,
  },
];

module.exports = {routes};
