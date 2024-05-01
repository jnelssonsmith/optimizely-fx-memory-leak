import React, { FunctionComponent } from "react";
import optimizelyConfig from "../../optimizelyConfig.json";

export const Experiment: FunctionComponent<{
  optimizelyClient: any;
  userId: string;
}> = ({ optimizelyClient, userId }) => {
  let user = optimizelyClient.createUserContext(userId);
  let decision = user?.decide(optimizelyConfig.experimentId);
  let variation = decision?.variationKey;

  if (optimizelyClient === null) {
    console.log("optimizely is null");
  }

  if (user === null) {
    console.log("user is null");
  }

  if (decision === null) {
    console.log("decision is null");
  }

  if (variation === null) {
    console.log("variationKey is null");
  }

  return (
    <>
      <h1>Optimizely Experiment Demo app</h1>
      <p>Variation: {variation}</p>
    </>
  );
};
