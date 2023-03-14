import { ConnectOptions } from "mongoose";

interface CustomConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

interface IDataConfig {
  key: string;
  object: CustomConnectOptions;
}

const dataConfig: IDataConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions as IDataConfig;

export default dataConfig;
