/**
 * NLP: Natural Language Processing
 */

const bayes = require("bayes");
const classifier = bayes();

// teach it positive phrases
classifier.learn("J'aimerais envoyer un email à Manuel Briand", "email");
classifier.learn("Envois un email à Simon Thenoz", "email");
classifier.learn("Envois stp un bel email à Manu maintenant", "email");
classifier.learn("Envois l'email à Manu maintenant", "email");
classifier.learn("Envoyé un email demain après-midi à Thenoz", "email");
classifier.learn("Envois un email à manu@free.fr", "email");

classifier.learn("Appelles Simon Thenoz", "tel");
classifier.learn("Appeller Manu ", "tel");
classifier.learn("Appeller le 0674585648 ", "tel");
classifier.learn("Appeller le 0674585648 ", "tel");
classifier.learn("Appelles au numéro de Manu ", "tel");
classifier.learn("Appellez stp au numéro portable de Simon", "tel");

let cat = classifier.categorize("J'aimerais que tu appeles Manuel!");

var stateJson = classifier.toJson();
var revivedClassifier = bayes.fromJson(stateJson);
console.log(cat === "tel");

console.log(cat);
