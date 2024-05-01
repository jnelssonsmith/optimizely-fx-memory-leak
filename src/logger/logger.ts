import { createLogger, format, transports } from "winston";

import { AccessLog, RegularLog } from "./types";

const { combine, timestamp, prettyPrint, printf, json } = format;
const DEVELOPMENT = process.env.NODE_ENV === "development";

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf((info) => JSON.stringify(info)),
    DEVELOPMENT ? prettyPrint() : json()
  ),
  transports: [new transports.Console()],
});

const logInfo = (info: RegularLog) => {
  logger.info({ ...info, logtype: "application" });
};

const logError = (info: RegularLog) => {
  logger.error({ ...info, logtype: "application" });
};

const logAccess = (info: AccessLog) => {
  logger.info({ ...info, logtype: "access", message: "Access log" });
};

export const log = {
  info: (info: RegularLog): void => logInfo(info),
  error: (info: RegularLog): void => logError(info),
  access: (info: AccessLog): void => logAccess(info),
};
