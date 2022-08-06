/* eslint-disable max-len */
const {nanoid} = require('nanoid');
const fn = require('./functions');

const addBooksHandler = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading} = req.payload;

  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;


  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);

    return response;
  }

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    insertedAt,
    updatedAt,
    finished,
    reading,
    pageCount,
    readPage,
  };

  fn.insert(newBooks);

  const isSuccess = fn.verify(id);

  if (!isSuccess) {
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);

    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);

  return response;
};

const getAllBooksHandler = (req, h) => {
  const query = req.query;
  const isEmpty = Object.keys(query).length === 0;

  if (isEmpty) {
    const file = fn.read();
    const books = [];

    file.forEach((book) => {
      const {id, name, publisher} = book;
      books.push({id, name, publisher});
    });

    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });

    response.code(200);

    return response;
  }

  const filteredBooks = fn.search(query);

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks,
    },
  });

  response.code(200);

  return response;
};

const getBooksByIdHandler = (req, h) => {
  const {bookId: uid} = req.params;
  const {isFound, book} = fn.findById(uid);

  if (!isFound) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });

    response.code(404);

    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      book,
    },
  });

  response.code(200);

  return response;
};

const updateBookByIdHandler = (req, h) => {
  const {bookId: uid} = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    reading,
    pageCount,
    readPage} = req.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);

    return response;
  }

  const {isFound} = fn.findById(uid);

  if (!isFound) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });

    response.code(404);

    return response;
  }

  const updatedAt = new Date().toISOString();

  fn.update({name, year, author, summary, publisher, updatedAt, reading, pageCount, readPage}, uid);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });

  response.code(200);

  return response;
};

const deleteBookHandler = (req, h) => {
  const {bookId: uid} = req.params;

  const {isFound} = fn.findById(uid);

  if (!isFound) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });

    response.code(404);

    return response;
  }

  fn.deleteBook(uid);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });

  response.code(200);

  return response;
};

module.exports = {addBooksHandler, getAllBooksHandler, getBooksByIdHandler, updateBookByIdHandler, deleteBookHandler};
