import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return Response.json(user);
  } catch (error) {
    return new Response("Could not get user", { status: 500 });
  }
}
