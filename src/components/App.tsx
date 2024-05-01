import React, { FunctionComponent } from "react";
import { Experiment } from "./Experiment";

export const App: FunctionComponent<{ optimizelyClient: any; userId: string }> = ({
  optimizelyClient,
  userId,
}) => {
  return (
    <Experiment optimizelyClient={optimizelyClient} userId={userId} />
  );
};
