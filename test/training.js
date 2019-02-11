const bayes = require("bayes");
const classifier = bayes();
const fs = require("fs");

/**
 * Training for email
 */
classifier.learn("J'aimerais envoyer un email à Manuel Briand", "email");
classifier.learn("Envois un email à Simon Thenoz", "email");
classifier.learn("Envois stp un bel email à Manu maintenant", "email");
classifier.learn("Envois l'email à Manu maintenant", "email");
classifier.learn("Envoyé un email demain après-midi à Thenoz", "email");
classifier.learn("Envois un email à manu@free.fr", "email");
classifier.learn(
  "Ecris un email à Manuel Briand pour lui dire que c'est bon on a les droits",
  "email"
);
classifier.learn(
  "Ecris un e-mail à Simon et dis lui que c'est reservé",
  "email"
);
classifier.learn(
  "Ecris un e-mail à Manuel pour dire que je serais en retard",
  "email"
);
classifier.learn(
  "Expédie un e-mail à Julia pour lui dire que ce n'est pas grave pour hier",
  "email"
);

classifier.learn(
  "Envoyer un e-mail à Simon avec les documents sécurité et client",
  "email"
);
classifier.learn(
  "Envoi un e-mail à Manu avec le document de la réunion",
  "email"
);

classifier.learn(
  "Envoi un e-mail à Julien avec les documents client et réunion",
  "email"
);

classifier.learn(
  "Envoi un e-mail à Julien avec la pièce jointe client réunion",
  "email"
);

classifier.learn(
  "Envoi un email à Manu avec la pièce jointe sécurité",
  "email"
);

classifier.learn("Envoi un e-mail à Simon avec la PJ installation", "email");

classifier.learn(
  "Envoyer un e-mail à Simon pour dire que je serais en avance demain",
  "email"
);
classifier.learn(
  "Envois un e-mail à Manu pour dire que je ne pourrais pas être là",
  "email"
);
classifier.learn(
  "Rédige un e-mail à Manuel pour lui dire que c'était déjà plus disponible ",
  "email"
);
classifier.learn(
  "Envois un e-mail à Simon pour lui dire que demain c'est mardi gras",
  "email"
);
classifier.learn(
  "Envois un e-mail à Manu pour lui dire que jeudi tout est permis",
  "email"
);
classifier.learn(
  "Rédige un email à Juju pour  dire de préparer la réunion",
  "email"
);
classifier.learn("Go email à Simon", "email");
classifier.learn(
  "Envois un email à Simon pour lui transférer la pièce jointe",
  "email"
);
classifier.learn(
  "Envoyer un mail à Manu pour lui dire que la vie est belle",
  "email"
);
classifier.learn("Ecrir un e-mail à tonton sur la TVA en France", "email");
classifier.learn("Envois un email à Simon sur les CGU", "email");
classifier.learn(
  "Envois un email à Manu pour lui dire que la Blend c'est dans 2 jours",
  "email"
);

/**
 * Training for music
 */
classifier.learn("Ecoutes la musique de Adele", "music");
classifier.learn("Ecoutes la chanson de Adele", "music");
classifier.learn("Ecouter la chanson de Harry Potter", "music");
classifier.learn("Ecouter la musique de Maître Gims", "music");
classifier.learn("Chanter avec la musique de Maître Gims", "music");
classifier.learn("Chante avec la chanson de Maître Gims", "music");
classifier.learn("Chanter Hello", "music");
classifier.learn("Ecouter Hello", "music");
classifier.learn("Ecouter du Maître Gims", "music");
classifier.learn("Ecouter du Maître Gims", "music");
classifier.learn("Mets la chanson de Maître Gims", "music");
classifier.learn("Mets la chanson Hello", "music");
classifier.learn("Met la chanson Hello", "music");
classifier.learn("Met la chanson Hello de Maître Gims", "music");
classifier.learn("Met la musique du film Harry Potter", "music");
classifier.learn("Met la BOF du film Harry Potter", "music");
classifier.learn("Met la BOF du film Harry Potter", "music");
classifier.learn("Ecouter un son de rock", "music");
classifier.learn("Ecouter du son de rap", "music");
classifier.learn("Ecouter la playlist de Simon", "music");
classifier.learn("Ecouter l'album de Jira", "music");
classifier.learn("Ecouter l'extrait de la chanson Encore une fois", "music");
classifier.learn("Ecouter l'album du chanteur Poupée", "music");

classifier.learn("Ecouter du Maître Gims", "music");
classifier.learn("Ecouter les musiques de John Williams", "music");
classifier.learn("Ecouter la musique du film le Roi Lyon", "music");
classifier.learn("Je veux écouter la musique du film le Parrain", "music");
classifier.learn("Je veux écouter la chanson de Maître Gims", "music");

/**
 * Training for tel
 */
classifier.learn(
  "Appelles Jean Valjean et dit lui que demain je reviens",
  "tel"
);
classifier.learn("Appelles Simon Thenoz", "tel");
classifier.learn("Appeller Manu ", "tel");
classifier.learn("Appelle Manu ", "tel");

classifier.learn("Appeller le 0674585648 ", "tel");
classifier.learn("Appeller le 0674585648 ", "tel");
classifier.learn("Appelles au numéro de Manu ", "tel");
classifier.learn("Appellez stp au numéro portable de Simon", "tel");
classifier.learn("Tu peux appeler Manu maintenant?", "tel");
classifier.learn("Appeles Simon", "tel");
classifier.learn("Appeler sur le portable Simon", "tel");
classifier.learn("Appeles sur le portable Simon", "tel");
classifier.learn("J'aimerais appeler Manuel", "tel");
classifier.learn("Appeles Simon sur son portable", "tel");
classifier.learn("Appeler Simon sur son portable", "tel");
classifier.learn("Appeles-moi Simon s'il te plaît", "tel");
classifier.learn("Call Simon maintenant", "tel");
classifier.learn("Appeler sur le portable de Simon", "tel");
classifier.learn("Appeler sur le portable de Manu", "tel");
classifier.learn("Téléphoner à Manu", "tel");
classifier.learn("Téléphoner à Simon", "tel");
classifier.learn("Téléphones à Manu", "tel");
classifier.learn("Téléphone à Simon", "tel");
classifier.learn("Tu peux passer un coup de fil à Manu", "tel");
classifier.learn("Peux-tu passer un coup de fil à Simon ?", "tel");
classifier.learn("Passes un coup de fil à Julien maintenant", "tel");

/**
 * Training for texto - SMS
 */
classifier.learn(
  "Ecris un SMS à Robert pour lui dire que ce n'est pas important si il est bien",
  "sms"
);
classifier.learn(
  "Ecris un SMS à Patrick pour lui dire que j'ai son portable",
  "sms"
);
classifier.learn(
  "Ecris un sexto à Marion pour lui dire que je suis arrivé au restaurant",
  "sms"
);
classifier.learn(
  "Ecris un SMS à Julie pour lui dire que je suis disponible ce soir",
  "sms"
);
classifier.learn("Appelle Manu ", "tel");

classifier.learn(
  "Envoie un texto à Simon pour lui dire que c'est lui le plus moche",
  "sms"
);
classifier.learn(
  "Envois un texto à Manu pour lui dire que c'est lui le plus beau",
  "sms"
);
classifier.learn(
  "Envoyer un texto à Manuel pour lui dire que c'est pas près pour tout de suite",
  "sms"
);
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
  "Ecris un SMS à Simon et dis lui que je serais de la partie",
  "sms"
);
classifier.learn(
  "Ecris un texto à Julien et dis lui que cela sera bon pour demain",
  "sms"
);
classifier.learn("Ecrire un texto à Manu que je serais en retard", "sms");
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
  "Envoie sur le portable de Manu le texto suivant:  Tu es sympa!",
  "sms"
);
classifier.learn(
  "Envoyer sur le portable de Manu le texto suivant:  Tu es sympa!",
  "sms"
);

classifier.learn(
  "Envoyer sur le portable de Manu le SMS suivant:  Tu es drôle, je te veux dans mon équipe!",
  "sms"
);

classifier.learn(
  "Envoyer un petit SMS à Simon:  La traduction c'est cool!",
  "sms"
);
classifier.learn(
  "Envoie un SMS à Julien afin qu'il ne s'inquiète pas:  Tu es naz!",
  "sms"
);

classifier.learn("Envoyer un SMS à Manu:  Tu es naz!", "sms");

classifier.learn("Envoyer à Simon le message suivant:  Tu es cool!", "sms");
classifier.learn(
  "Envois un sms à Simon le message suivant:  Tu es trop cool!",
  "sms"
);
classifier.learn(
  "Envoie un texto pour Manu et dis lui que demain il devra se lever tôt",
  "sms"
);
classifier.learn(
  "Envois un texto pour Manu et dis lui que demain il devra se lever tôt",
  "sms"
);
classifier.learn(
  "Envoie un SMS pour Julien et dis lui que tu es trop cool!",
  "sms"
);
classifier.learn(
  "Envois un SMS pour Manu et dis lui que tu es trop cool!",
  "sms"
);
let jsonObj = classifier.toJson();

let json = JSON.stringify(jsonObj);
fs.writeFile("../dataset.json", json, "utf8", () =>
  console.log("Dataset stored!")
);

module.exports = classifier;
