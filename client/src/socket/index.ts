import { localStore } from "utils";
import { socketio } from "configs/socket";

const getToken = () => {
  return localStore.getData("token");
};

const getUser = () => {
  return localStore.getData("user");
};

export class SocketApi {
  static on = (event: string, listener: (data: any) => any) =>
    socketio.on(event, listener);

  static off = (event: string, listener: (data: any) => any) =>
    socketio.off(event, listener);

  static removeAllListeners = (event: string) =>
    socketio.removeAllListeners(event);

  static emit = (event: string, data?: any) => {
    return socketio.emit(event, {
      token: getToken(),
      user: getUser(),
      data,
    });
  };
}
