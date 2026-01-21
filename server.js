const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/affirmation") {
    fs.readFile("affirmation.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ affirmation: "You’re my favorite person fr" }));
        return;
      }

      let json;
      try {
        json = JSON.parse(data);
      } catch {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ affirmation: "You’re my favorite person fr" }));
        return;
      }

      const list = Array.isArray(json.affirmations) ? json.affirmations : [];
      const random = list.length
        ? list[Math.floor(Math.random() * list.length)]
        : "You’re my favorite person fr";

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ affirmation: random }));
    });
    return;
  }

  // optional: health check + home
  if (req.url === "/" || req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
