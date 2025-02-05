import { HttpException } from "./http.exception";

export class ValidationException extends HttpException {
    constructor(...error: any[]) {
        super(400, error);
    }
}