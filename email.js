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
  from: "julien@meetserious.com",
  to: "zuzu38080@gmail.com",
  subject: "Sending Email using Node.js & My Own Smart Speaker",
  text: "That was easy!"
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
