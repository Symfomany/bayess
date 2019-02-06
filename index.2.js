const bayes = require("bayes");
const classifier = bayes();

// teach it positive phrases
classifier.learn("C'est magnifique et joli !", "positive");
classifier.learn("Qu'est ce que c'est beau !", "positive");

classifier.learn("amazing, awesome movie!! Yeah!! Oh boy.", "positive");
classifier.learn(
  "Sweet, this is incredibly, amazing, perfect, great!!",
  "positive"
);

classifier.learn("Je sais pas", "neutre");
classifier.learn("J'en sais rien", "neutre");
classifier.learn("Aucune idée", "neutre");
classifier.learn("Je sais strictrement pas", "neutre");
classifier.learn("Putain mais je sais pas!", "neutre");
classifier.learn("Je n'ai pas idée", "neutre");

// teach it a negative phrase
classifier.learn("terrible, shitty thing. Damn. Sucks!!", "negative");

// now ask it to categorize a document it has never seen before

// classifier.categorize("awesome, cool, amazing!! Yay.");

let cat = classifier.categorize("Hélàs, je sais pas du tout...");
// let catTwo = classifier.categorize("j'en sais strictement rien ... désolé!");
// let catThree = classifier.categorize("Pas d'idée! :)");

// serialize the classifier's state as a JSON string.
var stateJson = classifier.toJson();

// load the classifier back from its JSON representation.
var revivedClassifier = bayes.fromJson(stateJson);

console.log(cat);
