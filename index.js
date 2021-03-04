import express from "express"; // express 모듈을 불러옴(import)
const app = express(); // express 어플리케이션을 실행함

const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

const handleHome = (req, res) => {
  res.send("Hello from home");
};

const handleProfile = (req, res) => {
  res.send("You are on my profile");
};

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
