const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const { join } = require("path");
const process = require("process");
const bodyParser = require("body-parser");
const jsonParser = express.json();
require("dotenv").config();

// Создаем боди-парсер, для парснига пост-форм
const fileJson = path.resolve(__dirname, "./public/user.json");
// Значение {extended: false} указывает, что объект - результат парсинга будет представлять
// набор пар ключ-значение,
// а каждое значение может быть представлено в виде строки или массива.
const urlEncodeParser = bodyParser.urlencoded({ extended: false });

const fileHome = path.resolve(__dirname, "./public/home.html");
const fileAbout = path.resolve(__dirname, "./public/about.html");
const fileRegister = path.resolve(__dirname, "./public/register.html");
const fileJsonUser = path.resolve(__dirname, "./public/user.json");

let writableStream = fs.createWriteStream("hello.txt");

writableStream.write(`Hello from NodeJS at ${new Date().toLocaleString()}`);

let newWritableStream = fs.createWriteStream("some.txt");
let newWritableStreamUsingPipe = fs.createWriteStream("someForPipe.txt");

let readableStream = fs.createReadStream("hello.txt", "utf8");
readableStream.on("data", (chunk) => newWritableStream.write(chunk));
readableStream.pipe(newWritableStreamUsingPipe);

// static files, using middleware
app.use(express.static(join(__dirname, "public")));
app.use("/about", (req, res, next) => {
  console.log("It was a middleware", new Date().toLocaleString());
  console.log("Selected page is ABOUT");
  next();
});

app.get("/home", (req, res) => {
  fs.readFile(fileHome, (err, data) => {
    if (err) throw err;
    // Логирование
    let log = `\nМетоды ${
      req.method
    } был вызван ${new Date().toLocaleString()}`;
    writableStream.write(log);
    console.log(req.query);

    res.sendFile(fileHome);
  });
});

app.get("/about", (req, res) => {
  fs.readFile(fileAbout, (err, data) => {
    if (err) throw err;
    res.sendFile(fileAbout);
  });
});

app.get("/register", (req, res) => {
  fs.readFile(fileRegister, (err, data) => {
    if (err) throw err;
    res.sendFile(fileRegister);
  });
});

app.post("/register", urlEncodeParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const name = req.body.userName;
  const age = req.body.userAge;

  res.send(
    `<div class='greetings'>Добро пожаловать ${name}, Вам ${age}, вы очень молоды!</div>`
  );
});

app.post("/user", jsonParser, (req, res) => {
  res.json(req.body);
});

app.use("/products/:name/year/:year", (req, res) => {
  let name = req.params["name"];
  let year = req.params["year"];
  res.send(`Запрашиваемый товар: ${req.params["name"]}, ${year} года выпуска`);
});

app.get("/info", (req, res) => {
  let id = req.query.user.id;
  // http://localhost:3000/info?user[id]=42
  res.send(`The used query 'request.query.user.id is: ${id}`);
});

app.get("/stuff", (req, res) => {
  fs.readFile(path.resolve(__dirname, "hello.txt"), (err, data) => {
    if (err) throw err;
    // res.sendFile(path.resolve(__dirname, 'hello.txt'))
    res.send("<h1>Something new</h1>");
  });
});

app.use("/log", (req, res) => {
  res.redirect("home");
});

// ----------------API-----------------------
// GET
app.get("/api/users", (req, res) => {
  let content = fs.readFileSync(fileJsonUser, "utf8");
  let users = JSON.parse(content);
  res.send(users);
});

app.get("/api/users/:id", (req, res) => {
  let content = fs.readFileSync(fileJsonUser, "utf8");
  let users = JSON.parse(content);
  let id = +req.params["id"];
  let user = null;
  if (id) {
    user = users.filter((user) => user["id"] === id);
    res.send(user);
  }
});

// POST
app.post("/api/users", jsonParser, (req, res) => {
  console.log(req.body);
});

// PROCESS.EV
process.env.foo = "bar";
// console.log('Using script with cross-env: ', process.env.NODE_ENV);
// console.log('Using dotenv: ', process.env.myKey);

app.listen(3000, () =>
  console.log("Server has been started at", new Date().toLocaleTimeString())
);
