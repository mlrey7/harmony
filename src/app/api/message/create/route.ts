import { db } from "@/lib/db";
import { CreateMessagePayloadValidator } from "@/lib/validators/message";
import { getAuthUser } from "@/utils/auth";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const user = await getAuthUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { channel_id, text_content } =
      CreateMessagePayloadValidator.parse(body);

    await db.message.create({
      data: {
        text_content,
        channel_id,
        author_id: user.id,
      },
    });

    return new Response("Message successfully created");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not post", { status: 500 });
  }
}
