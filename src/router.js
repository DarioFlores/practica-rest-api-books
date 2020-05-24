const { Router } = require("express");
const {
    URL_BASE_BOOK,
    URL_BASE_AUTHOR,
    URL_BASE,
} = require("./utils/url.utils");
const books = require("./book/book.index");
const authors = require("./author/author.index");
const router = Router();

router.use(URL_BASE_BOOK, books);
router.use(URL_BASE_AUTHOR, authors);

router.get("", (req, res) => {
    const html = `
        <p>
            Endpoint books <a href=\"http://localhost:3000${URL_BASE_BOOK}\">aqui</a>
        </p>
        <p>
            Endpoint authors <a href=\"http://localhost:3000${URL_BASE_AUTHOR}\">aqui</a>
        </p>
    `;
    res.send(html);
});

router.get(URL_BASE, (req, res) => {
    const html = `
        <p>
            Endpoint books <a href=\"http://localhost:3000${URL_BASE_BOOK}\">aqui</a>
        </p>
        <p>
            Endpoint authors <a href=\"http://localhost:3000${URL_BASE_AUTHOR}\">aqui</a>
        </p>
    `;
    res.send(html);
});

module.exports = router;
