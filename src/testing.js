const fs = require('fs/promises');

const readFile = async () => {
  const file = await fs.readFile('./src/data/books.json');

  return JSON.parse(file.toString());
};
