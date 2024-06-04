const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());



app.use("/js", express.static(`${__dirname}/js`));
app.use("/css", express.static(`${__dirname}/css`));
app.use("/images", express.static(`${__dirname}/images`));



app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/api/feedback", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "team.afk@mail.ru",
        pass: "CdhPznjVbASd0b9hvbXL",
      },
    });

    const { name, email } = req.body;
    console.log("name:", name, "email:", email);

    await transporter.sendMail({
      from: "team.afk@mail.ru",
      to: "team.afk@mail.ru",
      subject: "Заявка с сайта", //Тема письма
      text: "Вам поступила заявка с вашего сайта сайта. Скорее посмотрите!",
      html: `
        <h1>Заявка с сайта.</h1>
        <br>
        <h2>Имя клиента: ${name}</h2>
        <h2>Почта клиента: ${email}</h2>
        <br>
        <p>Напишите ему как можно скорее!</p>
        `,
    });
    return res.status(200).send({
      status: 200,
      message: "Успешная отправка!",
    });
  } catch (e) {
    return res.status(500).send({
      status: 500,
      message: "Ошибка при запросе",
    });
  }
});

app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "expressDownloadFiles", "cv.jpg");
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).send("Sorry. File not found.");
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
