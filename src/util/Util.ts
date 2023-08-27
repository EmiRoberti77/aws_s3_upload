export interface IServer {
  port: number;
  host: string;
}

export enum ROOT_ENDPOINT {
  TRANSFER = '/transfer',
}

export const Server: IServer = {
  port: 3003,
  host: 'localhost',
};

export const Message = {
  serverStarted: (port: number) => `server started on port ${port}`,
  methodNotImplemented: (method: string) =>
    `${method} - method not implemented`,
  success: 'success',
};
