const bayes = require("bayes");
const classifier = bayes();
const fs = require("fs");

/**
 * Training for email
 */
classifier.learn("J'aimerais envoyer un email à Chloé Briand", "email");
classifier.learn("Envois un email à François Thenoz", "email");

classifier.learn(
  "envoie un email à Yann avec le document installation",
  "email"
);
classifier.learn(
  "Envoie un email à Yann B avec la pièce jointe sécurité",
  "email"
);
classifier.learn("Envoie un email à Bertrand avec le document client", "email");
classifier.learn(
  "Envoie un email à Manon Aniter avec le document sur la sécurité",
  "email"
);
classifier.learn(
  "Envoie un email à Thérèse avec le document sur la sécurité",
  "email"
);
classifier.learn(
  "Envoie un email à Monique avec le document sur la fibre",
  "email"
);

classifier.learn("Envois stp un bel email à Bertrand maintenant", "email");
classifier.learn("Envois l'email à Bertrand maintenant", "email");
classifier.learn("Envoyé un email demain après-midi à Thenoz", "email");
classifier.learn("Envois un email à Bertrand@free.fr", "email");
classifier.learn(
  "Envoie un email Yann avec le document de la sécurité",
  "email"
);

classifier.learn("Envoie un email François avec la PJ sur la réunion", "email");

classifier.learn(
  "Ecris un email à Chloé Briand pour lui dire que c'est bon on a les droits",
  "email"
);
classifier.learn(
  "Ecris un e-mail à François et dis lui que c'est reservé",
  "email"
);
classifier.learn(
  "Ecris un e-mail à Chloé pour dire que je serais en retard",
  "email"
);
classifier.learn(
  "Expédie un e-mail à Julia pour lui dire que ce n'est pas grave pour hier",
  "email"
);

classifier.learn(
  "Envoyer un e-mail à François avec les documents sécurité et client",
  "email"
);
classifier.learn(
  "Envoi un e-mail à Bertrand avec le document de la réunion",
  "email"
);

classifier.learn(
  "Envoi un e-mail à Yann avec les documents client et réunion",
  "email"
);

classifier.learn(
  "Envoi un e-mail à Yann avec la pièce jointe client réunion",
  "email"
);

classifier.learn(
  "Envoi un email à Bertrand avec la pièce jointe sécurité",
  "email"
);

classifier.learn("Envoi un e-mail à François avec la PJ installation", "email");

classifier.learn(
  "Envoyer un e-mail à François pour dire que je serais en avance demain",
  "email"
);
classifier.learn(
  "Envois un e-mail à Bertrand pour dire que je ne pourrais pas être là",
  "email"
);
classifier.learn(
  "Rédige un e-mail à Chloé pour lui dire que c'était déjà plus disponible ",
  "email"
);
classifier.learn(
  "Envois un e-mail à François pour lui dire que demain c'est mardi gras",
  "email"
);
classifier.learn(
  "Envois un e-mail à Bertrand pour lui dire que jeudi tout est permis",
  "email"
);
classifier.learn(
  "Rédige un email à Juju pour  dire de préparer la réunion",
  "email"
);
classifier.learn("Go email à François", "email");
classifier.learn(
  "Envois un email à François pour lui transférer la pièce jointe",
  "email"
);
classifier.learn(
  "Envoyer un mail à Bertrand pour lui dire que la vie est belle",
  "email"
);
classifier.learn("Ecrir un e-mail à tonton sur la TVA en France", "email");
classifier.learn("Envois un email à François sur les CGU", "email");
classifier.learn(
  "Envois un email à Bertrand pour lui dire que la Blend c'est dans 2 jours",
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
classifier.learn("Ecouter la playlist de François", "music");
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
classifier.learn("Appelles Xavier Bertrand", "tel");
classifier.learn("Appeller Xavier ", "tel");
classifier.learn("Appelle Xavier ", "tel");

classifier.learn("Appeller le 0674585648 ", "tel");
classifier.learn("Appeller le 0674585648 ", "tel");
classifier.learn("Appelles au numéro de Xavier ", "tel");
classifier.learn("Appellez stp au numéro portable de François", "tel");
classifier.learn("Tu peux appeler Bertrand maintenant?", "tel");
classifier.learn("Appeles Xavier", "tel");
classifier.learn("Appeler sur le portable Xavier", "tel");
classifier.learn("Appele sur le portable Xavier", "tel");
classifier.learn("J'aimerais appeler Xavier", "tel");
classifier.learn("Appele Xavier sur son portable", "tel");
classifier.learn("Appeler Xavier sur son portable", "tel");
classifier.learn("Appeles-moi Xavier s'il te plaît", "tel");
classifier.learn("Call Xavier maintenant", "tel");
classifier.learn("Appeler sur le portable de Xavier", "tel");
classifier.learn("Appeler sur le portable de Xavier", "tel");
classifier.learn("Téléphoner à Xavier", "tel");
classifier.learn("Téléphoner à Xavier", "tel");
classifier.learn("Téléphones à Xavier", "tel");
classifier.learn("Téléphone à Xavier", "tel");
classifier.learn("Tu peux passer un coup de fil à Xavier", "tel");
classifier.learn("Peux-tu passer un coup de fil à Xavier ?", "tel");
classifier.learn("Passes un coup de fil à Xavier maintenant", "tel");

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
classifier.learn("Appelle Bertrand ", "tel");

classifier.learn(
  "Envoie un texto à François pour lui dire que c'est lui le plus moche",
  "sms"
);
classifier.learn(
  "Envois un texto à Bertrand pour lui dire que c'est lui le plus beau",
  "sms"
);
classifier.learn(
  "Envoyer un texto à Chloé pour lui dire que c'est pas près pour tout de suite",
  "sms"
);
classifier.learn(
  "Envois un sms à François et dis lui que c'est le plus beau",
  "sms"
);
classifier.learn(
  "Envois un sms à Chloé et dis lui que c'est le plus intelligent",
  "sms"
);
classifier.learn(
  "Envoyer un SMS à Yann et dis lui que celui-ci se bouge!",
  "sms"
);
classifier.learn(
  "Envois un texto à François et dis lui que c'est le plus beau",
  "sms"
);
classifier.learn(
  "Ecris un SMS à François et dis lui que je serais de la partie",
  "sms"
);
classifier.learn(
  "Ecris un texto à Yann et dis lui que cela sera bon pour demain",
  "sms"
);
classifier.learn("Ecrire un texto à Bertrand que je serais en retard", "sms");
classifier.learn(
  "Envois un sms à François et dis lui que c'est le plus beau",
  "sms"
);
classifier.learn(
  "Envois un sms à François et dis lui que c'est le plus beau",
  "sms"
);
classifier.learn(
  "Envois un texto à Bertrand pour lui dire que c'est chaud",
  "sms"
);
classifier.learn(
  "Envois un texto à François pour lui dire que c'est bien",
  "sms"
);
classifier.learn(
  "Envois un SMS à Bertrand stp et dis lui que c'est demain que l'on y va",
  "sms"
);
classifier.learn(
  "Envois un message à Bertrand pour lui dire que c'est cool ici",
  "sms"
);

classifier.learn(
  "Envoyer un message à François pour lui dire que c'est mort ici",
  "sms"
);

classifier.learn(
  "Envoyer un message à Bertrand pour lui dire que c'est bien le JS !",
  "sms"
);

classifier.learn(
  "Envoyer un beau SMS à Bertrand pour lui dire que le JS !",
  "sms"
);
classifier.learn(
  "Envoie sur le portable de Bertrand le texto suivant:  Tu es sympa!",
  "sms"
);
classifier.learn(
  "Envoyer sur le portable de Bertrand le texto suivant:  Tu es sympa!",
  "sms"
);

classifier.learn(
  "Envoyer sur le portable de Bertrand le SMS suivant:  Tu es drôle, je te veux dans mon équipe!",
  "sms"
);

classifier.learn(
  "Envoyer un petit SMS à François:  La traduction c'est cool!",
  "sms"
);
classifier.learn(
  "Envoie un SMS à Yann afin qu'il ne s'inquiète pas:  Tu es naz!",
  "sms"
);

classifier.learn("Envoyer un SMS à Bertrand:  Tu es naz!", "sms");

classifier.learn("Envoyer à François le message suivant:  Tu es cool!", "sms");
classifier.learn(
  "Envois un sms à François le message suivant:  Tu es trop cool!",
  "sms"
);
classifier.learn(
  "Envoie un texto pour Bertrand et dis lui que demain il devra se lever tôt",
  "sms"
);
classifier.learn(
  "Envois un texto pour Bertrand et dis lui que demain il devra se lever tôt",
  "sms"
);
classifier.learn(
  "Envoie un SMS pour Yann et dis lui que tu es trop cool!",
  "sms"
);
classifier.learn(
  "Envois un SMS pour Bertrand et dis lui que tu es trop cool!",
  "sms"
);
let jsonObj = classifier.toJson();

let json = JSON.stringify(jsonObj);
fs.writeFile("../dataset.json", json, "utf8", () =>
  console.log("Dataset stored!")
);

module.exports = classifier;
