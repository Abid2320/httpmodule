const http = require("node:http");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

// Create a local server to receive data from
const PORT = 8000;
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  let extension = path.extname(req.url);

  const readFile = async (path, res, contentType) => {
    try {
      let data = await fsPromises.readFile(
        path,
        contentType === "image/png" || "image/jpg" ? "" : "utf8"
      );
      res.end(data);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "index.html")
      : path.join(__dirname, req.url);

  readFile(filePath, res);
});

server.listen(PORT, (error) => {
  if (error) console.log(`Something went wrong: ${error}`);
  console.log(`Server is running on port: ${PORT}`);
});
