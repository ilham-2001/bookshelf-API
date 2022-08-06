/* eslint-disable max-len */

/**
 * Asyncronus API Functions
 */

const fs = require('fs/promises');

const readFile = async () => {
  try {
    const file = await fs.readFile('./src/data/books.json');

    return JSON.parse(file.toString());
  } catch (err) {
    console.log(err);
  }
};

const insert = async (object) => {
  try {
    const file = await readFile();

    file.push(object);

    return file;
  } catch (err) {
    console.log(err);
  }
};

const writeFile = async (file) => {
  try {
    await fs.writeFile('./src/data/books.json', JSON.stringify(file));

    return true;
  } catch (err) {
    return false;
  }
};

const verifyFile = async (uid) => {
  try {
    const file = await readFile();

    const success = await file.find((book) => book.id === uid);

    return success? true: false;
  } catch (err) {
    console.log(err);
  }
};

const find = async (uid) => {
  try {
    const file = await readFile();

    const book = await file.find((book) => book.id === uid);
    const isFound = book? true: false;

    return {isFound, book};
  } catch (err) {
    console.log(err);
  }
};

const updateFile = async (object, uid) => {
  try {
    const file = await readFile();

    const index = await file.findIndex((book) => book.id === uid);

    file[index] = {
      ...file[index],
      ...object,
    };

    writeFile(file);
  } catch (err) {
    console.log(err);
  }
};

const deleteBook = async (uid) => {
  try {
    const file = await readFile();

    const index = await file.findIndex((book) => book.id === uid);

    file.splice(index, 1);

    writeFile(file);
  } catch (err) {
    console.log(err);
  }
};

const search = async (object) => {
  const {finished, reading, name} = object;
  const books = [];
  const file = await readFile();

  if (finished && !reading && !name) {
    file.forEach((book) => {
      if (Number(book.finished) == Number(finished)) {
        const {id, name, publisher} = book;

        books.push({id, name, publisher});
      }
    });

    return books;
  }

  if (reading && !finished && !name) {
    file.forEach((book) => {
      if (Number(reading) === Number(book.reading)) {
        const {id, name, publisher} = book;

        books.push({id, name, publisher});
      }
    });

    return books;
  }

  if (name && !finished && !reading) {
    file.forEach((book) => {
      const nameTags = book.name.split(' ');
      const mapArr = nameTags.map((tag) => tag.toLowerCase());

      if (mapArr.includes(name.toLowerCase())) {
        const {id, name, publisher} = book;

        books.push({id, name, publisher});
      }
    });

    return books;
  }
};

module.exports = {readFile, writeFile, verifyFile, find, updateFile, deleteBook, insert, search};
