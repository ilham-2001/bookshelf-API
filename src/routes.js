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
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handler.updateBookByIdHandler,
  },
];

module.exports = {routes};
