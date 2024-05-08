import { z } from "zod";

export const PrismaMessageValidator = z.object({
  id: z.string(),
  text_content: z.string(),
  image_content: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
    image: z.string(),
  }),
  reply_to_id: z.string().nullable(),
  reactions: z.array(
    z.object({
      emote: z.string(),
      user_id: z.string(),
    }),
  ),
});

export type PrismaMessageType = z.infer<typeof PrismaMessageValidator>;
