// newSocket.js
import { io } from "socket.io-client";

const URL = process.env.REACT_APP_NEW_BACKEND_SOCKET_URL_GAME;
// const URL = "https://ball2-api.maharaj365.in/ball_ball_game";

export const createSocket = (token, gameId) => {
  return io(URL, {
    transports: ["websocket"],
    query: {
      token,
      game_id: gameId,
    },
  });
};
