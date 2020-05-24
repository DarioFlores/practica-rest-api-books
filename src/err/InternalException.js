class InternalException extends Error {
    constructor(mensaje) {
        super(mensaje)
    }
} 

module.exports = InternalException