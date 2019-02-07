const bayes = require("bayes");
const classifier = bayes();
const fs = require('fs');

/**
 * Training for email
 */
classifier.learn("J'aimerais envoyer un email à Manuel Briand", "email");
classifier.learn("Envois un email à Simon Thenoz", "email");
classifier.learn("Envois stp un bel email à Manu maintenant", "email");
classifier.learn("Envois l'email à Manu maintenant", "email");
classifier.learn("Envoyé un email demain après-midi à Thenoz", "email");
classifier.learn("Envois un email à manu@free.fr", "email");
classifier.learn("Go email à Simon", "email");

/**
 * Training for tel
 */
classifier.learn("Appelles Simon Thenoz", "tel");
classifier.learn("Appeller Manu ", "tel");
classifier.learn("Appeller le 0674585648 ", "tel");
classifier.learn("Appeller le 0674585648 ", "tel");
classifier.learn("Appelles au numéro de Manu ", "tel");
classifier.learn("Appellez stp au numéro portable de Simon", "tel");
classifier.learn("Tu peux appeler Manu maintenant?", "tel");
classifier.learn("Appeles Simon", "tel");
classifier.learn("Appeler sur le portable Simon", "tel");
classifier.learn("Appeles sur le portable Simon", "tel");

/**
 * Training for textp
 */

classifier.learn(
  "Envois un sms à Simon et dis lui que c'est le plus beau",
  "sms"
);
classifier.learn(
  "Envois un sms à Manuel et dis lui que c'est le plus intelligent",
  "sms"
);
classifier.learn(
  "Envoyer un SMS à Julien et dis lui que celui-ci se bouge!",
  "sms"
);
classifier.learn(
  "Envois un texto à Simon et dis lui que c'est le plus beau",
  "sms"
);
classifier.learn(
  "Envois un sms à Simon et dis lui que c'est le plus beau",
  "sms"
);
classifier.learn(
  "Envois un sms à Simon et dis lui que c'est le plus beau",
  "sms"
);
classifier.learn("Envois un texto à Manu pour lui dire que c'est chaud", "sms");
classifier.learn("Envois un texto à Simon pour lui dire que c'est bien", "sms");
classifier.learn(
  "Envois un SMS à Manu stp et dis lui que c'est demain que l'on y va",
  "sms"
);
classifier.learn(
  "Envois un message à Manu pour lui dire que c'est cool ici",
  "sms"
);

classifier.learn(
  "Envoyer un message à Simon pour lui dire que c'est mort ici",
  "sms"
);

classifier.learn(
  "Envoyer un message à Manu pour lui dire que c'est bien le JS !",
  "sms"
);

classifier.learn("Envoyer un beau SMS à Manu pour lui dire que le JS !", "sms");
classifier.learn(
  "Envoyer sur le portable de Manu le texto suivant:  Tu es sympa!",
  "sms"
);
classifier.learn("Envoyer à Simon le message suivant:  Tu es cool!", "sms");
classifier.learn(
  "Envois un sms à Simon le message suivant:  Tu es trop cool!",
  "sms"
);
let jsonObj = classifier.toJson();

let json = JSON.stringify(jsonObj);
fs.writeFile('./test/dataset.json', json, 'utf8', () => console.log("Dataset stored!"));

module.exports = classifier;
