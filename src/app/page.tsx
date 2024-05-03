import AuthCard from "@/components/AuthCard";
import { getAuthUser } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getAuthUser();
  if (user) return redirect("/channels/me");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthCard />
    </main>
  );
}
