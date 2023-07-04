const { createServer } = require("htttp");

const server = createServer((request, response) => {
  console.log(request.url, response.method);

  response.writeHead(200);
  response.write("Hello World");
  response.end();
});
// console.log('Hellor World')

server.listen(4000, () => {
  console.log("servidor escuchando");
});
