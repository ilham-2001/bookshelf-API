const handler = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handler.addBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: handler.getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: handler.getBooksByIdHandler,
  },
];

module.exports = {routes};
