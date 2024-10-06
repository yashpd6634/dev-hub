import { currentUser } from "@/actions/user";
import { getGeneralServer } from "@/lib/server-service";
import { redirect } from "next/navigation";

type ServerIdPageProps = {
  params: {
    serverId: string;
  };
};

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const profile = await currentUser();

  if (!profile) {
    return redirect("/sign-in");
  }

  const server = await getGeneralServer(params.serverId);

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
