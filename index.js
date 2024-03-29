const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.text());

app.get("/", (req, res) => {
  res.send("CONLLU TO SVG API");
});

app.post("/api/conllu2svg", (req, res) => {
  const conlluInput = req.body;

  const fileName = "input.conllu";
  fs.writeFileSync(fileName, conlluInput);

  exec(`node conllu2svg.js ${fileName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send(`Internal Server Error: ${error.message}`);
      return;
    }
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
