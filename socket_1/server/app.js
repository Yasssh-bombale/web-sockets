import express from "express";
const port = 8000;

const app = express();

app.get("/", (req, res) => {
  res.send("homePage");
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
