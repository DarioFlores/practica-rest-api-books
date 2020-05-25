const authors = require("../../authors.json");
const bookService = require('../book/book.service');
const lodash = require('lodash');
const NotFoundException = require('../err/NotFoundException');
const InternalException = require('../err/InternalException');



module.exports.create = (name) => {
    const id = authors.length + 1;
    authors.push({
        id,
        name,
    });
};

module.exports.find = () => {
    return authors;
};

module.exports.findOne = (id) => {
    for (const author of authors) {
        if (author.id === id) {
            return {
                id: author.id,
                name: author.name
            };
        }
    }
    throw new NotFoundException(`No se encontro autor con id: ${id}`)
};

module.exports.delete = (id) => {
    for (const author of authors) {
        if (author.id === id) {
            const booksByAuthor = bookService.findByAuthor(id);
            if (booksByAuthor.length == 0) {
                lodash.remove(authors,(author) => {
                    return author.id == id
                })
                return true
            } else {
                throw new InternalException(`No se puede eliminar el autor ${author.name} porque hay libros a su nombre, elimine los libros antes`)
            }
        }
    }
    throw new NotFoundException(`No se encontro autor con id: ${id}`)
};

module.exports.update = (id, name) => {
    for (const author of authors) {
        if (author.id === id) {
            author.name = name;
            return;
        }
    }
    throw new NotFoundException(`No se encontro autor con id: ${id}`)
};
