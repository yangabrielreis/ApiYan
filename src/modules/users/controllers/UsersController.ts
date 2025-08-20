import { Request, Response, NextFunction } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

export default class UsersController {
    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const listUser = new ListUserService();
        console.log(request.user.id);
        const users = await listUser.execute();
        return response.json(users);
    }

    public async create(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { name, email, password } = request.body;
            const createUser = new CreateUserService();
            const user = await createUser.execute({ name, email, password });
            return response.json(user);
        } catch (err) {
            next(err);
        }
    }

    
}