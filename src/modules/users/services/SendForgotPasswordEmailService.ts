import AppError from "@shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import path from 'path';
import UsersRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";

const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

interface IRequest {
    email: string;
}

export default class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const usersTokensRespository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const { token } = await usersTokensRespository.generate(user.id);

        // futuramente vamos implementar o método de enviar isso para o email.
        console.log(token);

        await EtherealMail.sendMail({
            to: { name: user.name, email: user.email },
            subject: '[API VENDAS] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`,
                },
            },
        });
    }
}