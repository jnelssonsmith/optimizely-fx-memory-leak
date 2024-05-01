import { log } from "../logger";
import optimizelyConfig from "../../optimizelyConfig.json";

let _dataFile: any = null;

export const getDatafileWithCache = async () => {
  if (!_dataFile) {
    const datafile = await fetchDatafile();
    _dataFile = datafile;
  }

  return _dataFile;
};

export const fetchDatafile = async () => {
  try {
    const res = await fetch(optimizelyConfig.datafileUrl);
    const data = await res.json();

    return data;
  } catch (err) {
    log.error({
      message: "error fetching datafile",
    });
  }
};
