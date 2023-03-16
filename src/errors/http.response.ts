import { Response } from "express";
import { HttpStatus } from "./http.status-code";

class HttpResponse {
  send(res: Response, statusCode: HttpStatus, data?: unknown, error?: unknown ): Response {
    const statusMsg = HttpStatus[statusCode];
    return res.status(statusCode).json({ status: statusCode, statusMsg, data, error });
  }
}

export default new HttpResponse();