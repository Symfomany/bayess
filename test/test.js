const assert = require("assert");

let classifier = require("./training.js");

before(function () { });

/**
 * SUJET + VERBE d'ÉTAT + ADVERBE + ADJECTIF
 * SUJET + VERBE  + COMPLEMENT d'OBJET
 * 
 * [sujet] que... corps du SMS ou de l'email
 * 
 */

capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

extractTxt = (str) => {
  let regex = /(que|que l'|qui|qu'on|qu').*$/ig
  let matchObj = str.match(regex);

  if (matchObj && matchObj.length > 0) {
    matchObj[0] = matchObj[0].replace(/(que|que l'|qui|qu')/, "");
  }

  return (matchObj && matchObj.length > 0) ? capitalizeFirstLetter(matchObj[0]).trim() : null;


}

describe("Test on Bayesienne Training", () => {
  describe("Just test some intent", () => {
    it("Intent Tel", () => {
      let cat = classifier.categorize("J'aimerais que tu appeles Manuel!");
      assert.equal("tel", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize("J'aimerais envoyer un email à Manuel!");
      assert.equal("email", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Tu peux téléphoner à Manuel ?");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Tu peux tel à Simon ?");
      assert.equal("tel", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize("Juste envois un email ?");
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize("Tel au num de manuel maintenant ?");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Téléphones stp à Simon ?");
      assert.equal("tel", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize("Envois un petit texto à Simon");
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize("Envois un texto à Manu");
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize("Envois un sms à Manu");
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un joli texto à Manu pour lui dire qu'on y sera demain matin"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un message à Simon pour lui dire qu'on y sera là demain."
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un SMS à Simon"
      );
      assert.equal("sms", cat);
    });

    it("COD, COI, Complément", () => {
      let res = extractTxt("Envois un message à Simon pour lui dire qu'on y sera là demain.")
      assert.equal("On y sera là demain.", res);
    });

    it("COD, COI, Complément", () => {
      let res = extractTxt("Envois un SMS à Manu que l'on sera 2 finalement.")
      assert.equal("l'on sera 2 finalement.", res);
    });

    it("COD, COI, Complément", () => {
      let res = extractTxt("Envois un message à Simon qu'il n'y a plus de place en amphi")
      assert.equal("Il n'y a plus de place en amphi", res);
    });

    it("COD, COI, Complément", () => {
      let res = extractTxt("Envois un message à Juju qu'on est 5 finalement")
      assert.equal("On est 5 finalement", res);
    });

    it("COD, COI, Complément", () => {
      let res = extractTxt("Tu peux dire à Manu qu'il serait temps de s'y mettre!")
      assert.equal("Il serait temps de s'y mettre!", res);
    });

    it("COD, COI, Complément", () => {
      let res = extractTxt("Tu peux dire à Manu qu'il serait temps de s'y mettre!")
      assert.equal("Il serait temps de s'y mettre!", res);
    });

  });
});
