const books = require("../../books.json");
const authorService = require("../author/author.service");
const NotFoundException = require('../err/NotFoundException');


module.exports.create = (name, authorId) => {
    const author = authorService.findOne(authorId);
    if (author != null) {
        const id = books.length + 1;
        books.push({
            id,
            name,
            authorId,
        });
        return;
    } 
    throw new NotFoundException(`No se encontro el autor con id: ${authorId}`);
};

module.exports.find = () => {
    const booksWithAuthor = [];
    for (const book of books) {
        let author = authorService.findOne(book.authorId);
        booksWithAuthor.push({
            id: book.id,
            name: book.name,
            author,
        });
    }
    return booksWithAuthor;
};

module.exports.findOne = (id) => {
    for (const book of books) {
        if (book.id === id) {
            let author = authorService.findOne(book.authorId);
            return {
                id: book.id,
                name: book.name,
                author,
            };
        }
    }
    throw new NotFoundException(`No se encontro libro con id: ${id}`)
};

module.exports.findByAuthor = (authorId) => {
    let booksByAuthor = [];
    for (const book of books) {
        if (book.authorId === authorId) {
            booksByAuthor.push(book);
        }
    }
    return booksByAuthor;
};

module.exports.delete = (id) => {
    for (const book of books) {
        if (book.id === id) {
            // Eliminacion
            return true;
        }
    }
    throw new NotFoundException(`No se encontro libro con id: ${id}`)
};

module.exports.update = (id, name, authorId) => {
    for (const book of books) {
        if (book.id === id) {
            const author = authorService.findOne(authorId);
            if (author != null) {
                book.name = name;
                book.authorId = authorId;
                return true;
            } else {
                throw new NotFoundException(`No se encontro el autor con id: ${authorId}`);
            }
        }
    }
    throw new NotFoundException(`No se encontro libro con id: ${id}`)
};
