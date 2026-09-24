const http = require("http");

const port = Number(process.env.PORT || 10000);

const server = http.createServer((req, res) => {
  if (req.url === "/health" || req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      status: "ok",
      service: "railway-automation-health",
      message: "Render service is running"
    }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ status: "not_found" }));
});

server.listen(port, "0.0.0.0", () => {
  console.log("Health service listening on port " + port);
});
