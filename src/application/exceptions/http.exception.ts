export class HttpException extends Error {
    constructor(name: string, message: string) {
        super(message);
        this.name = "ValidationException"; // Important for error handler
        Object.setPrototypeOf(this, HttpException.prototype);
    }
}
