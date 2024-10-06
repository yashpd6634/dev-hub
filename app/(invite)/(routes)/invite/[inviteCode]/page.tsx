import { currentUser } from "@/actions/user";
import {
  addUserToInvitedServer,
  checkIfUserBelongsToInvitedServer,
} from "@/lib/server-service";
import { redirect } from "next/navigation";

type InviteCodePageProps = {
  params: {
    inviteCode: string;
  };
};

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentUser();

  if (!profile) {
    return redirect("/sign-in");
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await checkIfUserBelongsToInvitedServer(
    params.inviteCode
  );

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await addUserToInvitedServer(params.inviteCode);

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
