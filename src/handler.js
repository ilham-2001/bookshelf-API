/* eslint-disable max-len */
const {nanoid} = require('nanoid');
const fs = require('fs');

const insertedCheck = (id) => {
  const books = fs.readFileSync('./src/data/books.json').toString();
  const booksJson = JSON.parse(books);

  const success = booksJson.find((book) => book.id === id);

  return success? true: false;
};

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

  const file = fs.readFileSync('./src/data/books.json').toString();
  const fileJson = JSON.parse(file);
  fileJson.push(newBooks);

  const fd = fs.openSync('./src/data/books.json', 'r+');

  fs.writeSync(fd, JSON.stringify(fileJson));

  const isSuccess = insertedCheck(id);

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

// const testReadFile = () => {
//   fs.readFile('./src/data/books.json', (err, data) => {
//     const file = JSON.parse(data.toString());
//     file.push({name: 'Rudy'});

//     fs.writeFile('./src/data/books.json', JSON.stringify(file), (err) => {
//       if (err) {
//         throw new MediaError('Fail to write');
//       }

//       console.log('berhasil');
//     });
//   });
// };

// testReadFile();

module.exports = {addBooksHandler};
