Raccourci alias git

git config alias.acp '! git commit -a -m "commit" && git push'

1. !!!! L'expediteur de la machine est identifier au départ par confirmation de son email et telephone (code) !!!!
   // rec -c 1 -b 16 -r 16000 myvoice.wav gain +10
   SET GOOGLE_APPLICATION_CREDENTIALS="C:\Users\boyer\Desktop\bayes\console.json"

# NLP

### Builtin Entity Extraction

Builtin English French Spanish Portuguese Chinese Japanese Other
Email X X X X X X X
Ip X X X X X X X
Hashtag X X X X X X X
Phone Number X X X X X X X
URL X X X X X X X
Number X X X X X X see 1
Ordinal X X X X X X
Percentage X X X X X X see 2
Dimension X X X X X X see 3
Age X X X X X X
Currency X X X X X X
Date X X X X see 4 see 4 see 4
Duration

# Bag of Words

## Deux normalisations classiques sont la Lemmatisation et la Racinisation

- La lemmatisation désigne un traitement lexical apporté à un texte en vue de son analyse.
- En linguistique, la racinisation ou désuffixation est un procédé de transformation des flexions en leur radical ou racine.

Lemmatisation:
Le lemme petit renvoie à 4 formes fléchies : petit, petite, petits, petites
Le lemme aimer renvoie à un grand nombre de formes fléchies, d'autant plus grand que l'on prend en compte les formes composées a aimé, a été aimé, a été aimée, etc.

Racinisation:
Par exemple, en anglais, la racinisation de « fishing' », « fished » , « fish » et « fisher » donne « fish »

### Adaboosting

## SMS & Email

- Dis à Manu : tu es ...
- Ecris à Manu: tu es ...
- Envois à Manu: blabla
- Adresse à Manu : ...
- Renvois à Manu ...

## SMS

- texto
- SMS
- petit message

## Phone

- Mets-moi en relation avec
- Call
- Appel Manu
- Lance un appel

## Detection SMS ou Phone (pas email)

- Detection de numéro de portable

# Classification Bayesienne

La classification naïve bayésienne est un _type de classification bayésienne probabiliste simple_ basée sur le théorème de Bayes avec une forte indépendance (dite naïve) des hypothèses. Elle met en œuvre un classifieur bayésien naïf, ou classifieur naïf de Bayes, appartenant à la famille des classifieurs linéaires.

Selon la nature de chaque modèle probabiliste, _les classifieurs bayésiens naïfs_ peuvent être entraînés efficacement dans un contexte _d'apprentissage supervisé_.
Dans beaucoup d'applications pratiques, l'estimation des paramètres pour les modèles bayésiens naïfs repose sur le maximum de vraisemblance. Autrement dit, il est possible de travailler _avec le modèle bayésien naïf sans se préoccuper de probabilité bayésienne ou utiliser les méthodes bayésiennes._

Malgré leur _modèle de conception « naïf » et ses hypothèses de base extrêmement simplistes_, les classifieurs bayésiens naïfs ont fait preuve d'une efficacité plus que suffisante dans beaucoup de situations réelles complexes. En 2004, un article a montré qu'il existe des _raisons théoriques derrière cette efficacité inattendue_. Toutefois, une autre étude de 2006 montre que des approches plus récentes (arbres renforcés, forêts aléatoires) _permettent d'obtenir de meilleurs résultats._

_L'avantage du classifieur bayésien naïf est qu'il requiert relativement peu de données d'entraînement pour estimer les paramètres nécessaires à la classification_, à savoir moyennes et variances des différentes variables.
En effet, _l'hypothèse d'indépendance_ des variables permet de se contenter de la variance de chacune d'entre elles pour chaque classe, sans avoir à calculer de matrice de covariance.

- Apprentissage supervisée accompégnée par des labels indiquant leurs classes
- Autre: arbre de décision: noeuds à des tests, arc = resultat de test, feuilles = classes
-

### Classification

XIA-NB is a C++ implementation of Naive Bayes Classifier, which is a well-known generative classification algorithm for applications such as text classification

### Structures de phrase

        1.1.1. Les phrases simples
        1.1.2. Les phrases composées
        1.1.3. Les phrases complexes

    La phrase simple est appelée proposition indépendante. Elle n'est reliée à aucune autre proposition.
    Parmi les phrases simples, on trouve la phrase verbale et la phrase nominale.

    » A. La phrase verbale
    Elle contient un groupe sujet, un verbe conjugué et un ou plusieurs compléments.
    Exemple : Ce soir, nous dînons au restaurant.

    » B. La phrase nominale
    Elle ne comporte aucun verbe conjugué.
    Exemple : Premier plat, première déception !


    La phrase composée est constituée de deux propositions indépendantes, coordonnées ou juxtaposées, et contient donc deux verbes conjugués.

    ## A. Deux propositions coordonnées
    Quand la phrase est composée de deux propositions coordonnées, on utilise une conjonction de coordination pour relier les deux propositions.
    Exemple : Ce plat est appétissant mais je n'ai plus faim.

    ## B. Deux propositions juxtaposées
    Quand la phrase est composée de deux propositions juxtaposées, on utilise un signe de ponctuation entre les propositions.
    Exemple : Nous sommes restés amis, nous nous appelons souvent.

    La phrase complexe contient plusieurs verbes conjugués. Elle est constituée d'une proposition principale et d'une ou plusieurs autres propositions subordonnées que nous étudierons dans ces rubriques :

    - La proposition subordonnée relative
    - La proposition subordonnée conjonctive
