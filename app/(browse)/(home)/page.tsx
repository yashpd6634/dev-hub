import Results, { ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";
import InitialModal from "@/components/server/modals/initial-modal";
import { currentUser } from "@/actions/user";
import { getFirstServer } from "@/lib/server-service";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="h-full p-8 mx-auto max-w-screen-2xl">
        <Suspense fallback={<ResultsSkeleton />}>
          <Results />
        </Suspense>
      </div>
    );
  }

  const server = await getFirstServer();

  console.log(user);
  console.log(server);

  if (!server) return <InitialModal />;

  return (
    <div className="h-full p-8 mx-auto max-w-screen-2xl">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
