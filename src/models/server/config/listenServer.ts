import { Express } from "express";

interface IListenServer {
  (server: Express, port: string): void;
}

const listenServer: IListenServer = (server, port) => {
  server.listen(port, () => console.log(`Server running on port ${port}`));
};

export default listenServer;
