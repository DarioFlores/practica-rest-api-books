const { Router } = require("express");
const router = Router();
const bookService = require("./book.service");

router.post("", (req, res) => {
    if (req.body.name && req.body.name) {
        if (typeof req.body.name == "string") {
            if (typeof req.body.authorId == "number") {
                try {
                    bookService.create(
                        req.body.name,
                        req.body.authorId
                    );
                } catch (error) {
                    return res.status(404).json({
                        message: error.message,
                    });
                }
            } else {
                return res.status(400).json({
                    message: "authorId tiene que ser de tipo number",
                });
            }
        } else {
            return res.status(400).json({
                message: "name tiene que ser de tipo string",
            });
        }
    } else {
        return res.status(400).json({
            message: "name y authorId tiene que ser definida",
        });
    }
});

router.get("", (req, res) => {
    const books = bookService.find();
    res.status(200).json({
        message: "You have successfully obtained all the resources!",
        data: books,
    });
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    if (typeof id == "number") {
        try {
            const book = bookService.findOne(id);
            return res.status(200).json({
                message: "You have successfully obtained the resource!",
                data: book,
            });
        } catch (error) {
            return res.status(404).json({
                message: error.message,
            });
        }
    } else {
        return res.status(400).json({
            message: `id debe ser un numero`,
        });
    }
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    if (typeof id == "number") {
        try {
            bookService.delete(id);
            return res.status(200).json({
                message: "You have successfully deleted the resources!",
            });
        } catch (error) {
            return res.status(404).json({
                message: error.message,
            });
        }
    } else {
        return res.status(400).json({
            message: `id debe ser un numero`,
        });
    }
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    if (typeof id == "number") {
        if (req.body.name) {
            if (typeof req.body.name == "string") {
                if (typeof req.body.authorId == "number") {
                    try {
                        if (
                            bookService.update(
                                id,
                                req.body.name,
                                req.body.authorId
                            )
                        ) {
                            return res.status(200).json({
                                message:
                                    "You have successfully updated the resources!",
                            });
                        }
                    } catch (error) {
                        return res.status(404).json({
                            message: error.message,
                        });
                    }
                } else {
                    return res.status(400).json({
                        message: "authorId tiene que ser de tipo number",
                    });
                }
            } else {
                return res.status(400).json({
                    message: "name tiene que ser de tipo string",
                });
            }
        } else {
            return res.status(400).json({
                message: "name tiene que ser definida",
            });
        }
    } else {
        return res.status(400).json({
            message: `id debe ser un numero`,
        });
    }
});

module.exports = router;
