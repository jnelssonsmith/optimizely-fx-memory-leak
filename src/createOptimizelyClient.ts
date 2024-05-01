import optimizely from "@optimizely/optimizely-sdk";

let _optimizelyClient: any = null;

export const getOptimizelyClientWithCache = (datafile: any) => {
  if (!_optimizelyClient) {
    const optimizelyClient = createOptimizelyClient(datafile);
    _optimizelyClient = optimizelyClient;
  }

  return _optimizelyClient;
};

const createOptimizelyClient = (datafile: any): any | null => {
  const newOptimizelyClient = optimizely.createInstance({
    sdkKey: datafile.sdkKey,
    odpOptions: { disabled: true },
    datafileOptions: { autoUpdate: true, updateInterval: 30_000 },
    datafile,
  });

  return newOptimizelyClient;
};

export default getOptimizelyClientWithCache;
