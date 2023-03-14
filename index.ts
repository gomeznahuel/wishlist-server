// Dotenv config
require("dotenv").config();

// Import dependencies and modules.
import { Server } from "./src/models";

// Server instance.
const server = new Server();

// Start server.
server.start();