const express = require("express");
const morgan = require("morgan");
const server = express();
const routes = require("../routes/index");

// Middlewares

server.use("/", (request, response, next) => {
  consolelog(request.url, request.method);
  next();
});

server.use(routes);

// server.get("/", (request, response, next) => {
//   response.status(200) / json({ message: "hola" });
// });

// server.use((request, response, next) => {
//   console.log("log1");

//   next();
//   //Solo puede enviar una respuesta

//   //   response.status(200).send("Hello world");
// });

// server.use((request, response, next) => {
//   console.log("log2");
// });

// server.use((request, response, next) => {
//   console.log("log3");
//   //   response.status(200).send("Hello world");
//   response.status(200).send("Hello world");
// });

// server.listen(4000, () => {
//   console.log("server is running on port 4000");
// });
