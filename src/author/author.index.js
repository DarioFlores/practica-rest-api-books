const { Router } = require("express");
const router = Router();
const authorService = require("./author.service");
const NotFoundException = require('../err/NotFoundException');
const InternalException = require('../err/InternalException');

router.post("", (req, res) => {
    if (req.body.name && req.body.name) {
        if (typeof req.body.name == "string") {
            authorService.create(req.body.name);
            return res.status(201).json({
                message: "You have successfully created the resource!",
            });
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
    const authors = authorService.find();
    res.status(200).json({
        message: "You have successfully obtained all the resources!",
        data: authors,
    });
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    if (typeof id == "number") {
        try {
            const author = authorService.findOne(id);
            return res.status(200).json({
                message: "You have successfully obtained the resource!",
                data: author,
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    } else {
        return res.status(400).json({
            error: {
                message: `id debe ser un numero`,
            },
        });
    }
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    if (typeof id == "number") {
        try {
            authorService.delete(id)
            return res.status(200).json({
                message: "You have successfully deleted the resources!",
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(404).json({
                    message: error.message,
                });
            }
            if (error instanceof InternalException) {
                return res.status(400).json({
                    message: error.message,
                });
            }
            
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
                try {
                    authorService.update(id, req.body.name)
                    return res.status(200).json({
                        message: "You have successfully updated the resources!",
                    });
                } catch (error) {
                    return res.status(404).json({
                        message: error.message,
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
