import { db } from "@/lib/db";
import { getAuthUser } from "@/utils/auth";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const authUser = await getAuthUser();

  if (authUser?.id !== id) {
    return new Response("Unauthorized", { status: 401 });
  }

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
