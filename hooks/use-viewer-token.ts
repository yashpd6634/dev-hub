import { createViewerToken } from "@/actions/token";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";

const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodeToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const name = decodeToken?.name;
        const identity = decodeToken.sub;

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }
      } catch {
        toast.error("Something went wrong");
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};

export default useViewerToken;
