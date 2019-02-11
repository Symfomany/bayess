const contacts = require("./contacts.json");
const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "j.boyer69003@gmail.com",
    pass: "djscrave93"
  }
});

const mailOptions = {
  from: "j.boyer69003@gmail.com",
  to: "zuzu38080@gmail.com",
  subject: "Message envoyé depuis mon enceinte intelligente 🏆",
  text:
    "Cet e-mail a été envoyé automatiquement depuis mon enceinte intelligente",
  html:
    "<p>Bonjour</p><p>Cet <b>e-mail</b> a été envoyé automatiquement depuis mon <i>enceinte intelligente 🥇</i></p><p>Bonne reception!</p>"
};
mailOptions.attachments = [
  {
    path: "./resources/pj/client.pdf"
  }
];
transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }

  conv.ask("Ok pour l'envois email");
});
