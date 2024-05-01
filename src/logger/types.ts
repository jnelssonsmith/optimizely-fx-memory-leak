export type AccessLog = {
  logtype: string;
  req_time: string;
  method: string | number;
  uri: string | number;
  version: string | number;
  status: string | number;
  response_time: number;
};

export type RegularLog = {
  message: string;
  [key: string]: unknown;
};
