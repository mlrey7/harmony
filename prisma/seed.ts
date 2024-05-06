import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const sampleUserId = "de413f27-7e22-473d-8a2d-9403ea675d68";
  const server = await prisma.server.create({
    data: {
      title: "Own Server",
      description: "Your first server",
      server_members: {
        create: {
          user_id: sampleUserId,
        },
      },
    },
  });

  const channel_group = await prisma.channel_group.create({
    data: {
      title: "text channels",
      server_id: server.id,
      channels: {
        create: {
          title: "general",
          channel_members: {
            create: {
              user_id: sampleUserId,
            },
          },
          message: {
            create: {
              author_id: sampleUserId,
              text_content: "My first message",
            },
          },
        },
      },
    },
  });

  await prisma.channel.create({
    data: {
      channel_group_id: channel_group.id,
      title: "welcome",
      channel_members: {
        create: {
          user_id: sampleUserId,
        },
      },
      message: {
        create: {
          author_id: sampleUserId,
          text_content: "My first welcome message",
        },
      },
    },
  });

  await prisma.channel.create({
    data: {
      channel_group_id: channel_group.id,
      title: "test",
      channel_members: {
        create: {
          user_id: sampleUserId,
        },
      },
      message: {
        create: {
          author_id: sampleUserId,
          text_content: "My first test message",
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
