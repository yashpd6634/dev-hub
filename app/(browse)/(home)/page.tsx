import Results, { ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";
import { db } from "@/lib/db";
import InitialModal from "@/components/server/modals/initial-modal";
import { currentUser } from "@/actions/user";

export default async function Home() {
  const user = await currentUser();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });

  if (!server) return <InitialModal />;

  return (
    <div className="h-full p-8 mx-auto max-w-screen-2xl">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
