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
    method: 'POST',
    path: '/books/{bookid}',
    handler: handler.getBooksByIdHandler,
  },
];

module.exports = {routes};
