export class HttpException extends Error {
    constructor(public status: number, ...error: any[]) {
        super(error[0]);
    }
}