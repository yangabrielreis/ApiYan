import User from "@modules/users/typeorm/entities/User";
import AppError from "@shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import UsersRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
    email: string;
    password: string;
}

export default class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // compare método pronto do bcrypt.
        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        return user;
    }
}
