import { Injectable } from '@nestjs/common';
import { ISendEmail } from './mail.interface';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
  constructor() {}
  async sendActivationMail(email: string, link: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'doufullin@gmail.com',
        pass: 'Demion2289',
      },
    });
    await transporter.sendMail({
      from: 'doufullin@gmail.com',
      to: email,
      subject: 'Активация аккаунта на сайте calendar-yup.com',
      text: '',
      html: `
        <div>
            <h1>Приветствуем!</h1>
            <h2>Ссылка <a href="${link}">${link}</a></h2>
            <footer>До встречи.</footer>
        </div>
        `,
    });
  }
}
