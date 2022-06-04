import { EventEntity } from 'src/event/entities/event.entity';
import { Injectable } from '@nestjs/common';
import { ISendEmail } from './mail.interface';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
  constructor() {}
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'doufullin@gmail.com',
      pass: 'Demion2289',
    },
  });
  async sendActivationMail(email: string, link: string) {
    await this.transporter.sendMail({
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

  async sendNotifyAboutEvent(email: string, dto: EventEntity) {
    await this.transporter.sendMail({
      from: 'doufullin@gmail.com',
      to: email,
      subject: `Событие ${dto.title}`,
      text: '',
      html: `
        <div>
            <h1>Приветствуем!</h1>
            <div>Через час событие ${dto.title}</div>
            <footer>До встречи.</footer>
        </div>
        `,
    });
  }
}
