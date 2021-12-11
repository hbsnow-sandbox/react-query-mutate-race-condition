const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(function (req, res, next) {
  if (req.url === "/about") {
    const wait = Math.floor(Math.random() * 50) * 100;
    setTimeout(next, wait);
  } else {
    next();
  }
});
server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
