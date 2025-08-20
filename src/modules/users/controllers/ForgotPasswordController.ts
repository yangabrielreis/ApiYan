import { NextFunction, Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const { email } = request.body;
            const sendForgotPasswordEmail = new SendForgotPasswordEmailService();
            await sendForgotPasswordEmail.execute({ email });
            return response.status(204).json();
        } catch (err) {
            next(err);
            return response.status(500).json({ error: "Internal Server Error" });
        }
    }
}