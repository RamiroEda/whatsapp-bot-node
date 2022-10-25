import { prisma } from './../prisma';
import { BotFunction } from './function';
import { Message, GroupChat } from 'whatsapp-web.js';
import { Client, Contact } from 'whatsapp-web.js';
import { BotCommand } from './command';

export abstract class IGroupChat {
  abstract functions: BotFunction[];
  abstract commands: BotCommand[];

  constructor(public groupId: string, protected client: Client) {
    client.on('ready', async () => {
      console.log(`${this.constructor.name} ID: ${groupId} initialized`);
    });

    client.on('message', async (msg) => {
      const chat = await msg.getChat();
      const contact = await msg.getContact();

      if (chat.id.user !== groupId || !chat.isGroup) return;

      // this.setUser(contact);

      this.onNewMessage(msg, chat as GroupChat, contact);
    });

    client.on('group_join', async (msg) => {
      const chat = await msg.getChat();

      if (chat.id.user !== groupId || !chat.isGroup) return;

      // const contact = await msg.getContact();

      // this.onUserJoins(contact);
    });

    client.on('group_leave', async (msg) => {
      const chat = await msg.getChat();

      if (chat.id.user !== groupId || !chat.isGroup) return;

      const contact = await msg.getContact();

      // this.onUserLeaves(contact);

      await prisma.user.update({
        where: {
          contactId: contact.id.user,
        },
        data: {
          leaveCount: {
            increment: 1,
          },
        },
      });

      const users = await prisma.user.findMany({
        where: {
          chatId: groupId,
        },
      });

      msg.reply(`Records
==================
👑${users
        .sort((a, b) => b.leaveCount - a.leaveCount)
        .map((user) => `${user.pushname}:\t\t\t${user.pushname}`)}\n`);
    });
  }

  // private async setUser(contact: Contact): Promise<void> {
  //   await prisma.user.upsert({
  //     create: {
  //       ...contact,
  //       Chat: {
  //         connect: {
  //           chatId: this.groupId,
  //         },
  //       },
  //     },
  //     update: {
  //       ...contact,
  //       Chat: {
  //         connect: {
  //           chatId: this.groupId,
  //         },
  //       },
  //     },
  //     where: {
  //       contactId: contact.id.user,
  //     },
  //   });
  //   const index = this.participants.indexOf(previewsContact);

  //   if (index >= 0) {
  //     this.participants[index] = contact;
  //   } else {
  //     this.participants.push(contact);
  //   }
  // }

  // private removeUser(contact: Contact): void {
  //   const previewsContact = this.participants.find(
  //     (user) => user.id.user === contact.id.user,
  //   );
  //   const index = this.participants.indexOf(previewsContact);

  //   if (index >= 0) {
  //     this.participants.splice(index, 1);
  //   }
  // }

  private async onNewMessage(
    message: Message,
    chat: GroupChat,
    contact: Contact,
  ): Promise<void> {
    for (const fun of this.functions) {
      await fun({
        bot: this,
        message,
        chat,
        contact,
      });
    }

    for (const command of this.commands) {
      const firstWord: string | undefined = message.body
        .toLowerCase()
        .split(' ')[0];
      const isCommand = firstWord[0] === '!';

      if (
        isCommand &&
        command.activationString.map((cmd) => `!${cmd}`).includes(firstWord)
      ) {
        await command.onMessage({
          bot: this,
          message,
          chat,
          contact,
        });
      }
    }
  }

  protected onUserJoins(): void {
    // this.setUser(contact);
  }

  protected onUserLeaves(): void {
    // this.removeUser(contact);
  }
}
