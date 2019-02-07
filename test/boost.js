const AdaBoost = require('AdaBoost')

// si le resultat dé"pends de la somme de plusieurs variables aleatoires
var trainingData = [
    ["Coughing", "Male", "Adult", "Discharged"],
    ["Coughing", "Female", "Teen", "Discharged"],
    ["Headache", "Male", "Child", "Discharged"],
    ["Headache", "Male", "Teen", "Discharged"],
    ["Hiccups", "Female", "Adult", "Discharged"],
    ["Sneezing", "Male", "Teen", "Discharged"],
    ["Sneezing", "Female", "Child", "Admitted"],
    ["Sneezing", "Male", "Child", "Admitted"],
    ["Hiccups", "Female", "Teen", "Admitted"],
    ["Coughing", "Female", "Adult", "Admitted"]
];

var adaBoost = new AdaBoost(trainingData, "Discharged");

console.log(adaBoost.trainedLearners);