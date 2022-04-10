import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { userModel } from "../collection/user/user.schema";
import { User } from "../collection/user/user.interface";
import { userService } from "../collection/user/user.service";
import { config } from "./app.config";

const localStrategy = new LocalStrategy(
  { usernameField: "login" },
  async (login, password, done) => {
    try {
      const user = (await userModel.find({ login }).exec()) as User;
      const validPassword = await userService.comparePassword(
        password,
        user[0].password
      );
      if (!user || !validPassword) {
        return done(null, false, {
          message: "Inappropriate username or password provided",
        });
      }
      return done(null, user);
    } catch (ex) {
      return done(ex);
    }
  }
);

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: config.jwt.secretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (jwtPayload, done) => {
    try {
      const user = await userModel.findById(jwtPayload._id).exec();
      return user ? done(null, user) : done(null, false);
    } catch (ex) {
      return done(ex);
    }
  }
);

passport.use(localStrategy);
passport.use(jwtStrategy);

export default passport;
