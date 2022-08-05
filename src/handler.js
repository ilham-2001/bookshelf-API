/* eslint-disable max-len */
const {nanoid} = require('nanoid');
const fn = require('./functions.async');

const addBooksHandler = async (req, h) => {
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
  const finished = false;
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

  const file = await fn.insert(newBooks);
  fn.writeFile(file);

  const isSuccess = await fn.verifyFile(id);

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

const getAllBooksHandler = async (req, h) => {
  const books = [];
  const file = await fn.readFile();

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
};

const getBooksByIdHandler = async (req, h) => {
  const {bookId: uid} = req.params;
  const {isFound, book} = await fn.find(uid);

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

const updateBookByIdHandler = async (req, h) => {
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

  const {isFound} = await fn.find(uid);

  if (!isFound) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });

    response.code(404);

    return response;
  }

  const updatedAt = new Date().toISOString();

  fn.updateFile({name, year, author, summary, publisher, updatedAt, reading, pageCount, readPage}, uid);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });

  response.code(200);

  return response;
};

const deleteBookHandler = async (req, h) => {
  const {bookId: uid} = req.params;

  const {isFound} = await fn.find(uid);

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
