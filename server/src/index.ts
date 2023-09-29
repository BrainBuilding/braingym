import express, { Request } from "express";
import http from "http";

import { Server } from "socket.io";
import path from "path";
import cors from "cors";
import { authMiddleWare } from "./middlewares/auth";
import { ProfileDB } from "./models/Profile";
import { UserInfo } from "firebase-admin/auth";
import { userDetails } from "./controllers/UserDetails";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(authMiddleWare.decodeToken);
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build");

app.use(express.static(buildPath));

app.get("/api/user-details", userDetails.get);

app.post("/api/profiles", async function (req, res) {
  const data = req.body;

  const dbRes = await ProfileDB.addProfileIfNotExist(
    data.uid,
    data.profile.profile
  );

  res.send(JSON.stringify(dbRes));
});

app.get("/api/*", async function (req, res) {
  res.status(200).send(
    JSON.stringify({
      errorMessage: "The endpoint doesn't exist.",
    })
  );
});

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

io.on("connection", (socket) => {
  console.log("We are connected");

  socket.on("chat", (chat) => {
    io.emit("chat", chat);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Listening to port ${PORT}`));
