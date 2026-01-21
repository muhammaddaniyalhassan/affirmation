const http = require("http");
const fs = require("fs");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/affirmation") {
    fs.readFile("affirmation.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ affirmation: "You’re my favorite person fr" }));
        return;
      }

      const json = JSON.parse(data);
      const list = json.affirmations;

      const random =
        list[Math.floor(Math.random() * list.length)];

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ affirmation: random }));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}/affirmation`);
});
