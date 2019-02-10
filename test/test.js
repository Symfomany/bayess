const assert = require("assert");
const bayes = require("bayes");

const dataset = require("../dataset.json");
const contacts = require("./contacts.json");
// const algoliasearch = require("algoliasearch");
// var client = algoliasearch("CUVOFGREY1", "9c966706dd576d92e188c1de2a82bbdf");
// var index = client.initIndex("contacts");

console.log("*****************************************");
// const boost = require("./boost.js");

const classifier = bayes.fromJson(dataset);

before(function() {});

/**
 * SUJET + VERBE d'ÉTAT + ADVERBE + ADJECTIF
 * SUJET + VERBE  + COMPLEMENT d'OBJET
 * [sujet] que... corps du SMS ou de l'email
 *
 */

capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

let extractName = phrase => {
  let regex = new RegExp(`${phrase}`, "ig");

  let resultat = null;
  contacts.forEach(name => {
    if (regex.test(name) == true) {
      resultat = name;
    }
  });

  return resultat;
};

let extractMusic = phrase => {
  let regexTrack = new RegExp(`/(?:la musique|la chanson|L'extrait de)/`, "ig");
  let regexTrackComplete = new RegExp(
    `/(?:la musique|la chanson|L'extrait de).*/`,
    "ig"
  );

  let regexAlbum = new RegExp(
    `/(?:L'album|la bof|une chanson de|la playlist|du cd).*/`,
    "ig"
  );

  let regexChanteurCompositeur = new RegExp(
    "(?:Le chanteur|la chanteuse|la musique de|une chanson de|une musique de|les musiques de|la playlist de|les chansons de|un son de)",
    "ig"
  );
  let regexChanteurCompositeurComplete = new RegExp(
    `${regexChanteurCompositeur}.*`,
    "gi"
  );

  const resOne = phrase.match(regexChanteurCompositeurComplete);
  const resTwo = phrase.match(regexTrackComplete);

  if (resTwo && resTwo.length > 0) {
    return resTwo[0].replace(regexTrack, "").trim();
  }

  if (resOne && resOne.length > 0) {
    return resOne[0].replace(regexChanteurCompositeur, "").trim();
  }
  return null;
};

extractTxt = str => {
  // Dis à ... sans le que ...
  let regex = /(que|que l'|qui|qu'on|qu').*$/gi;
  let matchObj = str.match(regex);

  if (!matchObj) {
    let regex = /(Dis|Ecris|Envois|Renvois|Ecrire|Dire|Adresse) (à|a|au).*$/i;
    let matchObjTwo = str.match(regex);
    if (matchObjTwo) {
      matchObj = [];
      matchObj[0] = matchObjTwo[0].replace(
        /(Dis à|Ecris à|Envois à|Renvois à)/,
        ""
      );
    }
  }

  if (matchObj) {
    matchObj[0] = matchObj[0].replace(/(que|que l'|qui|qu')/, "");
  }

  return matchObj ? capitalizeFirstLetter(matchObj[0]).trim() : null;
};

describe("Test on Bayesienne Training", () => {
  describe("Test intents", () => {
    it("Intent Tel", () => {
      let cat = classifier.categorize("J'aimerais que tu appeles Manuel!");
      assert.equal("tel", cat);
    });
    it("Intent Tel", () => {
      let cat = classifier.categorize("J'aimerais appeler Alfred Dulair ");
      assert.equal("tel", cat);
    });
    it("Intent Tel", () => {
      let cat = classifier.categorize(
        "J'aimerais que tu appeles Alfred Dulair "
      );
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("On peut appeler Simon maintenant ?");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Peux-tu appeler Alphone Daudet ?");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Peux-tu appeler Manuel Briand ?");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Peux-tu telephoner à Manuel ?");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Téléphones à mon directeur ");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Téléphones à Maude tout de suite");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Tel Thibault");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Tu peux téléphoner à Simon maintenant");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Tu peux call Simon");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Tel au num de Manuel tout de suite");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Telephone au numéro de Simon");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Tu peux tel Manuel");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Tu téléphones au 0474567788");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Peux-tu téléphoner au 0174267778");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Tu peux téléphoner à Manuel ?");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Tu peux tel à Simon ?");
      assert.equal("tel", cat);
    });

    it("Intent Tel", () => {
      let cat = classifier.categorize("Téléphones stp à Simon");
      assert.equal("tel", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize("J'aimerais envoyer un email à Manuel!");
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Envois un e-mail à Simon pour lui dire que le devis est trop élevé"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize("Envois un email à Michel");
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Envois un e-mail à mon père pour dire que je mange à la maison"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Envoyer un e-mail pour Robert afin de luir dire que c'est déjà fait"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Envois un e-mail important à Kevin sur la MagixBox de 2018"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize("Juste envois un email ?");
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Envoyer un email sur la boîte e-mail Zoé"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Ecris un e-mail à Simon pour lui dire que c'est Lundi le rendez-vous"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Ecris un e-mail à mon frère pour lui dire que j'ai réservé pour le concert de musique"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Ecris un email à Simon pour lui dire que c'est Mardi que Penelope sera dans nos locaux"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Ecris un email à Simon pour lui dire que c'est Mardi que Penelope sera dans nos locaux"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Ecrire un e-mail à Maryline et dit lui que la salle de réunion n'était pas rangée"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Ecrire un email à Béatrice pour lui dire que notre rendez-vous client de cet aprem-midi est annulé"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Envois un email à Manu pour lui dire que c'est reporté la réunion"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Envois un email à Simon pour lui dire que c'était pas la peine de venir lundi"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Ecris un email à Julien pour lui dire que la projet a été annulé"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Ecris un e-mail à Simon pour lui dire qu'il fera moche à la météo demain"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Envois un email de newsletter à Pauline"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Ecris un e-mail à Simon pour lui dire que son stagiaire arrive à 9h"
      );
      assert.equal("email", cat);
    });

    it("Intent Email", () => {
      let cat = classifier.categorize(
        "Ecris un e-mail à Simon pour lui dire que le client a validé le devis"
      );
      assert.equal("email", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize("Ecris un SMS à Manu pour qu'il soit là");
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un texto à Mamn pour dire que je suis arrivé au métro"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Ecris un SMS à Papa pour dire que je viens ce soir dîner"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Ecris un SMS à Nicolas pour lui dire que ce n'était pas un cadeau"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un message à Simon et dis lui que ce n'est pas pertinent"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un texto à Simon et dis lui je t'aime"
      );
      assert.equal("sms", cat);
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
        "Envois un message pour demain à Manu et dit lui que c'est mort..."
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un texto à Manu pour lui dire qu'on y sera demain matin"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize("Envois un SMS à Simon de toute urgence");
      assert.equal("sms", cat);
    });
    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un joli SMS à Simon et dis lui que je serais demain matin"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un texto à Olivier pour lui dire qu'un client attends dans le couloir"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un petit SMS à Manu pour lui dire que c'est bon"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un petit SMS à Simon pour lui dire que je serais absent demain"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un SMS à Pierre pour lui dire que le Saint Maclou est fermé"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un SMS à Paul pour lui dire que quelqu'un est dans agence"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un SMS à Yannick pour lui dire que quelqu'un est dans agence"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envoyer un SMS à Manu pour lui dire que nous serons bien présent lundi"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un petit SMS à Edouard dis lui que le juge l'attends"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un joli SMS à Manu et dis lui que je serais demain matin"
      );
      assert.equal("sms", cat);
    });

    it("Intent SMS", () => {
      let cat = classifier.categorize(
        "Envois un SMS en urgence à Anais pour lui dire de s'arrêter"
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
      let cat = classifier.categorize("Envois un SMS à Simon");
      assert.equal("sms", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecoutes la chanson de Shakira");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter la dernière de Damso");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter la dernière musique de Eminem");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter l'album de Christophe Maé");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter la chanson de Jul");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter Make me Feel My Love");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter la chanson Tri Materlord");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter Someone Like You");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter la musique The Hobbit");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter le compositeur Julien Boyer");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter du John Williams");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter la chanson d'y hier");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter la musique du film Star Wars");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter un son de jazz");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter un son de jazz");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter le son de Pierre Berger");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter la chanson Lord of the Rings");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter le film Lord of the Rings");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter du Booba");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter du Booba");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter la musique du film Titanic");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize(
        "Ecouter la musique de film la poupée russe"
      );
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize("Ecouter la BOF du film Titanic");
      assert.equal("music", cat);
    });

    it("Music", () => {
      let cat = classifier.categorize(
        "Ecouter la chanson de Le Seigneur des Anneaux"
      );
      assert.equal("music", cat);
    });
  });

  describe("Test compléments", () => {
    it("COD, COI, Complément", () => {
      let res = extractTxt(
        "Envois un message à Simon pour lui dire qu'on y sera là demain."
      );
      assert.equal("On y sera là demain.", res);
    });

    it("COD, COI, Complément", () => {
      let res = extractTxt("Envois un SMS à Manu que l'on sera 2 finalement.");
      assert.equal("l'on sera 2 finalement.", res);
    });

    it("COD, COI, Complément", () => {
      let res = extractTxt(
        "Envois un message à Simon qu'il n'y a plus de place en amphi"
      );
      assert.equal("Il n'y a plus de place en amphi", res);
    });

    it("COD, COI, Complément", () => {
      let res = extractTxt("Envois un message à Juju qu'on est 5 finalement");
      assert.equal("On est 5 finalement", res);
    });

    it("COD, COI, Complément", () => {
      let res = extractTxt(
        "Tu peux dire à Manu qu'il serait temps de s'y mettre!"
      );
      assert.equal("Il serait temps de s'y mettre!", res);
    });

    it("COD, COI, Complément", () => {
      let res = extractTxt(
        "Tu peux dire à Manu qu'il serait temps de s'y mettre!"
      );
      assert.equal("Il serait temps de s'y mettre!", res);
    });

    it(" Complément Direct", () => {
      let res = extractTxt("Dis à Manu tu es le plus gentil!");
      assert.equal("Manu tu es le plus gentil!", res);
    });

    it(" Complément Direct", () => {
      let res = extractTxt("Ecris à Simon je serais absent demain matin");
      assert.equal("Simon je serais absent demain matin", res);
    });

    it(" Complément Direct", () => {
      let res = extractTxt("Envois à Juju je serais absent demain matin");
      assert.equal("Juju je serais absent demain matin", res);
    });

    it(" Complément Direct", () => {
      let res = extractTxt("Ecris à Michel la rose la mis là");
      assert.equal("Michel la rose la mis là", res);
    });

    it(" Complément Direct", () => {
      let res = extractTxt(
        "Envois un SMS à Pierre pour lui dire que le Saint Maclou est fermé"
      );
      assert.equal("le Saint Maclou est fermé", res);
    });

    it("Intent SMS", () => {
      let res = extractTxt(
        "Envois un joli SMS à Manu et dis lui que je serais demain matin"
      );
      assert.equal("je serais demain matin", res);
    });

    it("Intent SMS", () => {
      let res = extractTxt(
        "Ecris un SMS à Manu pour lui dire qu'il faut qu'il soit là"
      );
      assert.equal("Il faut qu'il soit là", res);
    });
  });

  describe("Test Search Contacts", () => {
    it("It a phone number", () => {
      const ph = "Appelles Manuel";
      let cat = classifier.categorize(ph);
      assert.equal("tel", cat);

      const resultat = extractName(ph);
      if (resultat) {
        assert.equal(resultat.name, "Manuel Briand");
      }
    });

    it("Send a SMS texto", () => {
      const ph =
        "Envois un texto à Simon Thenoz pour lui dire que demain on l'attends à la gare.";
      let cat = classifier.categorize(ph);
      assert.equal("sms", cat);

      const resultat = extractName(ph);
      if (resultat) {
        assert.equal(resultat.name, "Simon Thenoz");
      }
    });

    it("Send Email", () => {
      const ph =
        "Envois un e-mail à Julien B. pour lui dire d'arrêter de perdre son temps au café";
      let cat = classifier.categorize(ph);
      assert.equal("email", cat);

      const resultat = extractName(ph);
      if (resultat) {
        assert.equal(resultat.name, "Julien Boyer");
      }
    });

    it("Listen Music", () => {
      const ph = "écouter les Copains d'Abord de George Brassens";
      let cat = classifier.categorize(ph);
      assert.equal("music", cat);

      const resultat = extractName(ph);
      if (resultat) {
        assert.equal(resultat, null);
      }
    });
  });

  describe("Test Extract some compositeur", () => {
    it("Listen Music Compositeur", () => {
      const ph = "écouter une musique de George Brassens";

      const resultat = extractMusic(ph);
      if (resultat) {
        assert.equal(resultat, "George Brassens");
      }
    });

    it("Listen Music Chanteur", () => {
      const ph = "écouter la chanson de Puth Dady";

      const resultat = extractMusic(ph);
      if (resultat) {
        assert.equal(resultat, "Adèle");
      }
    });

    it("Listen Music Chanteuse", () => {
      const ph = "écouter une chanson de Adèle";

      const resultat = extractMusic(ph);
      if (resultat) {
        assert.equal(resultat, "Adèle");
      }
    });

    it("Listen Track", () => {
      const ph = "écouter la chanson que je t'aime";

      const resultat = extractMusic(ph);
      if (resultat) {
        assert.equal(resultat, "que je t'aime");
      }
    });

    it("Listen Track", () => {
      const ph = "écouter la musique Un Grand Amour";

      const resultat = extractMusic(ph);
      if (resultat) {
        assert.equal(resultat, "Un Grand Amour");
      }
    });
    it("Listen Track", () => {
      const ph = "écouter la chanson de Mickael Jackson";

      const resultat = extractMusic(ph);
      if (resultat) {
        assert.equal(resultat, "Mickael Jackson");
      }
    });
  });
});
