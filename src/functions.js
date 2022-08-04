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
  const fd = fs.openSync('./src/data/books.json', 'r+');

  fs.writeSync(fd, JSON.stringify(arr));
};

module.exports = {getFileData, insertDataToFile, insertedCheck, writeDataToFile};
