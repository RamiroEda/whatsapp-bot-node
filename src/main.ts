import { Client } from 'whatsapp-web.js';
import * as qrCode from 'qrcode-terminal';
import { PersonalBot } from './personal_bot';

const chatWhiteList = [
  '5214921713244-1574968617',
  '120363023369642371',
  '5214921463525-1574532703',
];

function bootstrap(): void {
  const client = new Client({});

  client.on('qr', (qr) => {
    qrCode.generate(qr);
  });

  client.on('message', async (msg) => {
    const chat = await msg.getChat();

    if (!chat.isGroup) return;

    console.debug(chat.name, chat.id.user, msg.body);
  });

  chatWhiteList.map((id) => new PersonalBot(id, client));

  client.initialize();
}

bootstrap();
