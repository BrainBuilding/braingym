const { admin } = require("../config/firebase.config");

class AuthMiddleWare {
  async decodeToken(req, res, next) {
    if (!req.url.startsWith("/api/")) {
      return next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      const authUser = await admin.auth().verifyIdToken(token);

      if (authUser) {
        next();
      } else {
        return res.json({ message: "Unauthorized" });
      }
    } catch (error) {
      return res.json({ message: "Server Error", error });
    }
  }
}

const authMiddleWare = new AuthMiddleWare();

module.exports = { authMiddleWare };
