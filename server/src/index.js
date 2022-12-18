const express = require("express");
const port = 5001;

const app = express();

app.get("/api/test", (req, res) => {
  res.json({ data: "test" });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
