export const SERVER_PORT = 5001;
export const BASE_URL = window.location.protocol + "//" + window.location.host;
export const SOCKET_URL =
  window.location.hostname === "localhost"
    ? window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      SERVER_PORT
    : BASE_URL;
