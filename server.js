const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

function sendJson(res, statusCode, obj) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(obj));
}

function getRandomAffirmation() {
  try {
    const filePath = path.join(__dirname, "affirmation.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    const list = Array.isArray(data.affirmations) ? data.affirmations : [];
    if (list.length === 0) return "You’re my favorite person fr";

    return list[Math.floor(Math.random() * list.length)];
  } catch (e) {
    return "You’re my favorite person fr";
  }
}

const server = http.createServer((req, res) => {
  // Normalize URL (remove query params like ?x=1)
  const url = (req.url || "").split("?")[0];

  // Make the ROOT URL return a random affirmation (like an API)
  if (url === "/") {
    return sendJson(res, 200, { affirmation: getRandomAffirmation() });
  }

  // Main endpoint
  if (url === "/affirmation") {
    return sendJson(res, 200, { affirmation: getRandomAffirmation() });
  }

  // Health check (optional)
  if (url === "/health") {
    return sendJson(res, 200, { ok: true });
  }

  return sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
