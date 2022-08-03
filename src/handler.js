const {nanoid} = require('nanoid');
const fs = require('fs');

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
    const response = h.respone({
      status: 'fail',
      message: `Gagal menambahkan buku. 
      readPage tidak boleh lebih besar dari pageCount`,
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

  fs.readFile('./src/data/books.json', (err, data) => {
    const file = JSON.parse(data.toString());

    file.push(newBooks);

    fs.writeFile('./src/data/books.json', JSON.stringify(file), (err) => {
      if (err) {
        const response = h.response({
          status: 'error',
          message: 'Buku gagal ditambahkan',
        });

        console.log('Hello');

        response.code(500);
        return response;
      }
    });

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    console.log('Berhasil');

    response.code(201);

    return response;
  });
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
