import express from "express"; // express 모듈을 불러옴(import)
import morgan from "morgan"; // 로그
import helmet from "helmet"; // node.js 보안
import cookieParser from "cookie-parser"; //cookie를 전달받아서 사용할 수 있도록 만들어주는 미들웨어(사용자 인증 등)
import bodyParser from "body-parser"; // 사용자가 웹 사이트로 전달하는 정보들을 검사하는 미들웨어 (request 정보에서 form 이나 json 형태로된 body를 검사함)
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleWare } from "./middlewares";

const app = express(); // express 어플리케이션을 실행함

const cors = require("cors");

app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(localsMiddleWare);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.options("*", cors());
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://www.youtube.com"
  );
  return next();
});

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
