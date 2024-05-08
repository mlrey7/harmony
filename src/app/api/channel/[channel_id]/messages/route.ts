import { db } from "@/lib/db";
import { getAuthUser } from "@/utils/auth";
import { z } from "zod";

export async function GET(
  req: Request,
  { params: { channel_id } }: { params: { channel_id: string } },
) {
  const url = new URL(req.url);

  const user = await getAuthUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        page: url.searchParams.get("page"),
        limit: url.searchParams.get("limit"),
      });

    const messages = await db.message.findMany({
      where: {
        channel_id,
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
      orderBy: {
        created_at: "desc",
      },
      include: {
        author: true,
        reactions: true,
      },
    });

    return Response.json(messages);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not get messages", { status: 500 });
  }
}
