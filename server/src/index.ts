import express from "express";

const port = 5001;

const app = express();

app.get("/api/test", (req, res) => {
  res.json({ data: "just test" });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
