import session, { SessionData } from "express-session";
import FileStore from "session-file-store";
import mongoStore from "connect-mongo";

// const FileStoreSession = FileStore(session);

interface MySessionData extends SessionData {
  counter?: number;
  name?: string;
  login?: boolean;
  // Type req.session.touch() is not working.
  touch?: () => void;
}

// const Store = new FileStoreSession({
//   path: "src/models/server/config/sessions",
//   ttl: 300,
//   retries: 0,
// });

const sessionConfig = {
  // store: Store,
  store: mongoStore.create({ mongoUrl: process.env.MONGODB_CNN as string }),
  secret: process.env.SECRETFORSESSION as string,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 50000 },
};

const Session = session({ ...sessionConfig });

export { Session, MySessionData}