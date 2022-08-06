/* eslint-disable max-len */

/**
 * Syncronus API Functions
 */

const books = require('./data/books');

const read = () => {
  return books;
};

const verify = (uid) => {
  const success = books.find((book) => book.id === uid);

  return success ? true : false;
};

const insert = (obj) => {
  books.push(obj);
};

const findById = (uid) => {
  const book = books.find((book) => book.id === uid);
  const isFound = book? true: false;

  return {isFound, book};
};

const update = (obj, uid) => {
  const index = books.findIndex((book) => book.id === uid);

  books[index] = {
    ...books[index],
    ...obj,
  };
};

const deleteBook = (uid) => {
  const index = books.findIndex((book) => book.id === uid);

  books.splice(index, 1);
};

const search = (object) => {
  const {finished, reading, name} = object;
  const retVal = [];

  if (finished && !reading && !name) {
    books.forEach((book) => {
      if (Number(book.finished) == Number(finished)) {
        const {id, name, publisher} = book;

        retVal.push({id, name, publisher});
      }
    });
  }

  if (reading && !finished && !name) {
    books.forEach((book) => {
      if (Number(reading) === Number(book.reading)) {
        const {id, name, publisher} = book;

        retVal.push({id, name, publisher});
      }
    });
  }

  if (name && !finished && !reading) {
    books.forEach((book) => {
      const nameTags = book.name.split(' ');
      const mapArr = nameTags.map((tag) => tag.toLowerCase());

      if (mapArr.includes(name.toLowerCase())) {
        const {id, name, publisher} = book;

        retVal.push({id, name, publisher});
      }
    });
  }

  return retVal;
};

module.exports = {read, insert, verify, findById, update, search, deleteBook};
