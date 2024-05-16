import { db } from "@/lib/db";
import { getAuthUser } from "@/utils/auth";

export async function GET() {
  const authUser = await getAuthUser();

  if (!authUser) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id: authUser.id,
      },
    });

    return Response.json(user);
  } catch (error) {
    return new Response("Could not get user", { status: 500 });
  }
}
