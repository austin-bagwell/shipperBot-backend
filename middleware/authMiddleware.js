import { jwt } from "jsonwebtoken";
import { User } from "../models/User";
import { SECRET } from "../env/jwtSecret.js";

const requireAuth = (req, res, next) => {
  // first, get token from cookies
  const token = req.cookies.jwt;

  // check if token exists and is valid
  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;

        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export { requireAuth, checkUser };
