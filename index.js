const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
const routes = require("./routes/index");
const config = require("./config/index");
const { initDB } = require("./services/db");

server.use(cors());
server.use(express.json());

server.use((request, response, next) => {
  console.log(request.url, request.method);
  next();
});

// Routes
server.use("/api", routes);

try {
  initDB();
  server.listen(4000, () => {
    console.log("server is running on port 4000");
  });
} catch (error) {
  console.log(error);
}
