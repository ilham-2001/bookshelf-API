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
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt};

  const fileJson = fn.insertDataToFile(newBooks);

  fn.writeDataToFile(fileJson);

  const isSuccess = fn.insertedCheck(id);

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
  const books = [];
  const file = fn.getFileData();

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

const getBooksByIdHandler = (req, h) => {
  const file = fn.getFileData();
};

module.exports = {addBooksHandler, getAllBooksHandler, getBooksByIdHandler};
