/* eslint-disable max-len */
const fs = require('fs');

const getFileData = () => {
  const books = fs.readFileSync('./src/data/books.json').toString();
  const booksJson = JSON.parse(books);

  return booksJson;
};

const insertedCheck = (id) => {
  const books = fs.readFileSync('./src/data/books.json').toString();
  const booksJson = JSON.parse(books);

  const success = booksJson.find((book) => book.id === id);

  return success ? true : false;
};

const insertDataToFile = (obj) => {
  const file = fs.readFileSync('./src/data/books.json').toString();
  const fileJson = JSON.parse(file);
  fileJson.push(obj);

  return fileJson;
};

const writeDataToFile = (arr) => {
  fs.writeFileSync('./src/data/books.json', JSON.stringify(arr));
};

const findBookById = (uid) => {
  const file = getFileData();

  const book = file.find((book) => book.id === uid);
  const isFound = book? true: false;

  return {isFound, book};
};

const updateFile= (obj, uid) => {
  const file = getFileData();
  const {name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt} = obj;

  const index = file.findIndex((book) => book.id === uid);

  file[index] = {
    ...file[index],
    name,
    year,
    author,
    updatedAt,
    publisher,
    summary,
    reading,
    pageCount,
    readPage,
  };


  writeDataToFile(file);
};

module.exports = {getFileData, insertDataToFile, insertedCheck, writeDataToFile, findBookById, updateFile};
