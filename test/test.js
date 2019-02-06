const assert = require("assert");

let classifier = require("./training.js");

before(function() {});

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
  });
});
