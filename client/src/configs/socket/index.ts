import socketIOClient from "socket.io-client";
import { SOCKET_URL } from "constants/index";

export const socketio = socketIOClient(SOCKET_URL);
