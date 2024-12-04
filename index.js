const express = require("express");
const app = express();
const port = 80;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post("/webhook", async (req, res) => {
  console.log(req.body);

  const formname = req.body["formname"];
  const sbId = req.body["sb_id"];
  const phone = req.body["Phone"];
  const filial = req.body["filial"];
  const payment = JSON.parse(req.body["payment"]);
  const psum = payment["amount"] || 0;

  switch (formname) {
    case "Cart":
      await fetch(
        `https://chatter.salebot.pro/api/db7f33e51fd6486a7d1271a0d74e920f/callback?${
          sbId ? "client_id=" + sbId : "client_phone=" + phone
        }&filial=${filial}&message=zakaz_oplachen&description=${payment.products?.join("\n")}&psum=${psum}`
      );

      break;
  }

  res.send("ok");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
