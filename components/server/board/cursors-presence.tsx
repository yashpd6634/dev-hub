"use client";

import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import Cursor from "./cursor";

type Props = {};

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const CursorsPresence = memo((props: Props) => {
  return (
    <>
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";

export default CursorsPresence;
