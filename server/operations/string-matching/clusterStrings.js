const mongoose = require("mongoose");
const fuzzball = require("fuzzball");
const CompanyPart = require("../../models/parts");
const PartCluster = require("../../models/PartClusters");

mongoose.connect("mongodb://localhost:27017/autoMDM", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

mongoose.Promise = global.Promise;

mongoose.connection.on("error", err => {
  console.error(`Mongoose connection error: ${err}`);
  process.exit(1);
});

let arrayOfStringWithDots = [];

CompanyPart.find({}, { partName: 1 }, (err, parts) => {
  var obj = {};
  for (var i = 0, len = parts.length; i < len; i++) {
    obj[parts[i]["partName"]] = parts[i];
  }
  parts = new Array();
  for (var key in obj) {
    parts.push(obj[key]);
  }
  // List all partNames that has dot in them
  parts.forEach(part => {
    if (part.partName.indexOf(".") >= 0) {
      // console.log("dot is present!");
      let newString = part.partName.replace(/[0-9]/g, "");
      if (!arrayOfStringWithDots.includes(newString)) {
        arrayOfStringWithDots.push(newString.toUpperCase());
      }
    } else {
      // console.log("no dot is present!");
    }
  });
  console.log(JSON.stringify(arrayOfStringWithDots.sort(), null, 2));
  console.log(arrayOfStringWithDots.length);

  // createCluster(parts);
});

function createCluster(arrayOfParts) {
  let usedStrings = [];
  let clusterArray = [];
  len = arrayOfParts.length;
  for (var i = 0; i < 2000; i++) {
    let cluster = [];
    y = 1;
    if (usedStrings.includes(arrayOfParts[i].partName)) {
      continue;
    }
    console.log(`item: ${i}, partName: ${arrayOfParts[i].partName}`);
    for (var j = y; j < arrayOfParts.length; j++) {
      if (
        fuzzball.token_sort_ratio(
          arrayOfParts[i].partName,
          arrayOfParts[j].partName
        ) > "70"
      ) {
        if (
          arrayOfParts[i].partName.toLowerCase() !==
            arrayOfParts[j].partName.toLowerCase() &&
          !cluster.includes(arrayOfParts[j].partName) &&
          !usedStrings.includes(arrayOfParts[j].partName)
        ) {
          cluster.push(arrayOfParts[j].partName);
          usedStrings.push(arrayOfParts[j].partName);
        }
      }
    }
    if (cluster.length > 0) {
      let obj = {};
      obj.clusterName = arrayOfParts[i].partName;
      obj.partCluster = cluster.sort();
      const query = { clusterName: arrayOfParts[i].partName };
      const update = obj;
      const options = { upsert: true };
      PartCluster.findOneAndUpdate(query, update, options, (error, result) => {
        if (error) {
          console.log("Error when saving cluster: ", error);
        }
      });
    }
  }
}

function removeStopwords(orginalString, stopwordArray) {
  var re = new RegExp("\\b(?:" + stopwordArray.join("|") + ")\\b\\s*", "g");
  return (orginalString || "").replace(re, "").replace(/[ ]{2,}/, " ");
}

const stopwordsEnglish = [
  "'ll",
  "'ve",
  "a",
  "a's",
  "able",
  "about",
  "above",
  "abst",
  "accordance",
  "according",
  "accordingly",
  "across",
  "act",
  "actually",
  "added",
  "adj",
  "affected",
  "affecting",
  "affects",
  "after",
  "afterwards",
  "again",
  "against",
  "ah",
  "ain't",
  "all",
  "allow",
  "allows",
  "almost",
  "alone",
  "along",
  "already",
  "also",
  "although",
  "always",
  "am",
  "among",
  "amongst",
  "amoungst",
  "amount",
  "an",
  "and",
  "announce",
  "another",
  "any",
  "anybody",
  "anyhow",
  "anymore",
  "anyone",
  "anything",
  "anyway",
  "anyways",
  "anywhere",
  "apart",
  "apparently",
  "appear",
  "appreciate",
  "appropriate",
  "approximately",
  "are",
  "aren",
  "aren't",
  "arent",
  "arise",
  "around",
  "as",
  "aside",
  "ask",
  "asking",
  "associated",
  "at",
  "auth",
  "available",
  "away",
  "awfully",
  "b",
  "be",
  "became",
  "because",
  "become",
  "becomes",
  "becoming",
  "been",
  "before",
  "beforehand",
  "begin",
  "beginning",
  "beginnings",
  "begins",
  "behind",
  "being",
  "believe",
  "below",
  "beside",
  "besides",
  "best",
  "better",
  "between",
  "beyond",
  "bill",
  "biol",
  "both",
  "brief",
  "briefly",
  "by",
  "c",
  "c'mon",
  "c's",
  "ca",
  "call",
  "came",
  "can",
  "can't",
  "cannot",
  "cant",
  "cause",
  "causes",
  "certain",
  "certainly",
  "changes",
  "clearly",
  "co",
  "com",
  "come",
  "comes",
  "con",
  "concerning",
  "consequently",
  "consider",
  "considering",
  "contain",
  "containing",
  "contains",
  "corresponding",
  "could",
  "couldn't",
  "couldnt",
  "course",
  "cry",
  "currently",
  "d",
  "date",
  "de",
  "dear",
  "definitely",
  "describe",
  "described",
  "despite",
  "detail",
  "did",
  "didn't",
  "different",
  "do",
  "does",
  "doesn't",
  "doing",
  "don't",
  "done",
  "down",
  "downwards",
  "due",
  "during",
  "e",
  "each",
  "ed",
  "edu",
  "effect",
  "eg",
  "eight",
  "eighty",
  "either",
  "eleven",
  "else",
  "elsewhere",
  "empty",
  "ending",
  "enough",
  "entirely",
  "especially",
  "et",
  "et-al",
  "etc",
  "even",
  "ever",
  "every",
  "everybody",
  "everyone",
  "everything",
  "everywhere",
  "ex",
  "exactly",
  "example",
  "except",
  "f",
  "far",
  "few",
  "ff",
  "fifteen",
  "fifth",
  "fify",
  "fill",
  "find",
  "fire",
  "first",
  "five",
  "fix",
  "followed",
  "following",
  "follows",
  "for",
  "former",
  "formerly",
  "forth",
  "forty",
  "found",
  "four",
  "from",
  "full",
  "further",
  "furthermore",
  "g",
  "gave",
  "get",
  "gets",
  "getting",
  "give",
  "given",
  "gives",
  "giving",
  "go",
  "goes",
  "going",
  "gone",
  "got",
  "gotten",
  "greetings",
  "h",
  "had",
  "hadn't",
  "happens",
  "hardly",
  "has",
  "hasn't",
  "hasnt",
  "have",
  "haven't",
  "having",
  "he",
  "he'd",
  "he'll",
  "he's",
  "hed",
  "hello",
  "help",
  "hence",
  "her",
  "here",
  "here's",
  "hereafter",
  "hereby",
  "herein",
  "heres",
  "hereupon",
  "hers",
  "herse",
  "herself",
  "hes",
  "hi",
  "hid",
  "him",
  "himse",
  "himself",
  "his",
  "hither",
  "home",
  "hopefully",
  "how",
  "how's",
  "howbeit",
  "however",
  "hundred",
  "i",
  "i'd",
  "i'll",
  "i'm",
  "i've",
  "id",
  "ie",
  "if",
  "ignored",
  "im",
  "immediate",
  "immediately",
  "importance",
  "important",
  "in",
  "inasmuch",
  "inc",
  "indeed",
  "index",
  "indicate",
  "indicated",
  "indicates",
  "information",
  "inner",
  "insofar",
  "instead",
  "interest",
  "into",
  "invention",
  "inward",
  "is",
  "isn't",
  "it",
  "it'd",
  "it'll",
  "it's",
  "itd",
  "its",
  "itse",
  "itself",
  "j",
  "just",
  "k",
  "keep",
  "keeps",
  "kept",
  "kg",
  "km",
  "know",
  "known",
  "knows",
  "l",
  "largely",
  "last",
  "lately",
  "later",
  "latter",
  "latterly",
  "least",
  "less",
  "lest",
  "let",
  "let's",
  "lets",
  "like",
  "liked",
  "likely",
  "little",
  "look",
  "looking",
  "looks",
  "ltd",
  "m",
  "made",
  "mainly",
  "make",
  "makes",
  "many",
  "may",
  "maybe",
  "me",
  "mean",
  "means",
  "meantime",
  "meanwhile",
  "merely",
  "mg",
  "might",
  "mill",
  "million",
  "mine",
  "miss",
  "ml",
  "more",
  "moreover",
  "most",
  "mostly",
  "move",
  "mr",
  "mrs",
  "much",
  "mug",
  "must",
  "mustn't",
  "my",
  "myse",
  "myself",
  "n",
  "na",
  "name",
  "namely",
  "nay",
  "nd",
  "near",
  "nearly",
  "necessarily",
  "necessary",
  "need",
  "needs",
  "neither",
  "never",
  "nevertheless",
  "new",
  "next",
  "nine",
  "ninety",
  "no",
  "nobody",
  "non",
  "none",
  "nonetheless",
  "noone",
  "nor",
  "normally",
  "nos",
  "not",
  "noted",
  "nothing",
  "novel",
  "now",
  "nowhere",
  "o",
  "obtain",
  "obtained",
  "obviously",
  "of",
  "off",
  "often",
  "oh",
  "ok",
  "okay",
  "old",
  "omitted",
  "on",
  "once",
  "one",
  "ones",
  "only",
  "onto",
  "or",
  "ord",
  "other",
  "others",
  "otherwise",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "outside",
  "over",
  "owing",
  "own",
  "p",
  "page",
  "pages",
  "part",
  "particular",
  "particularly",
  "past",
  "per",
  "perhaps",
  "placed",
  "please",
  "plus",
  "poorly",
  "possible",
  "possibly",
  "potentially",
  "pp",
  "predominantly",
  "present",
  "presumably",
  "previously",
  "primarily",
  "probably",
  "promptly",
  "proud",
  "provides",
  "put",
  "q",
  "que",
  "quickly",
  "quite",
  "qv",
  "r",
  "ran",
  "rather",
  "rd",
  "re",
  "readily",
  "really",
  "reasonably",
  "recent",
  "recently",
  "ref",
  "refs",
  "regarding",
  "regardless",
  "regards",
  "related",
  "relatively",
  "research",
  "respectively",
  "resulted",
  "resulting",
  "results",
  "right",
  "run",
  "s",
  "said",
  "same",
  "saw",
  "say",
  "saying",
  "says",
  "sec",
  "second",
  "secondly",
  "see",
  "seeing",
  "seem",
  "seemed",
  "seeming",
  "seems",
  "seen",
  "self",
  "selves",
  "sensible",
  "sent",
  "serious",
  "seriously",
  "seven",
  "several",
  "shall",
  "shan't",
  "she",
  "she'd",
  "she'll",
  "she's",
  "shed",
  "shes",
  "should",
  "shouldn't",
  "show",
  "showed",
  "shown",
  "showns",
  "shows",
  "significant",
  "significantly",
  "similar",
  "similarly",
  "since",
  "sincere",
  "six",
  "sixty",
  "slightly",
  "so",
  "some",
  "somebody",
  "somehow",
  "someone",
  "somethan",
  "something",
  "sometime",
  "sometimes",
  "somewhat",
  "somewhere",
  "soon",
  "sorry",
  "specifically",
  "specified",
  "specify",
  "specifying",
  "still",
  "strongly",
  "substantially",
  "successfully",
  "such",
  "sufficiently",
  "suggest",
  "sup",
  "sure",
  "system",
  "t",
  "t's",
  "take",
  "taken",
  "taking",
  "tell",
  "ten",
  "tends",
  "th",
  "than",
  "thank",
  "thanks",
  "thanx",
  "that",
  "that'll",
  "that's",
  "that've",
  "thats",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "thence",
  "there",
  "there'll",
  "there's",
  "there've",
  "thereafter",
  "thereby",
  "thered",
  "therefore",
  "therein",
  "thereof",
  "therere",
  "theres",
  "thereto",
  "thereupon",
  "these",
  "they",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "theyd",
  "theyre",
  "thick",
  "thin",
  "think",
  "third",
  "this",
  "thorough",
  "thoroughly",
  "those",
  "thou",
  "though",
  "thoughh",
  "thousand",
  "three",
  "throug",
  "through",
  "throughout",
  "thru",
  "thus",
  "til",
  "tis",
  "to",
  "together",
  "too",
  "took",
  "toward",
  "towards",
  "tried",
  "tries",
  "truly",
  "try",
  "trying",
  "ts",
  "twas",
  "twelve",
  "twenty",
  "twice",
  "two",
  "u",
  "un",
  "under",
  "unfortunately",
  "unless",
  "unlike",
  "unlikely",
  "until",
  "unto",
  "up",
  "upon",
  "ups",
  "us",
  "use",
  "used",
  "useful",
  "usefully",
  "usefulness",
  "uses",
  "using",
  "usually",
  "uucp",
  "v",
  "value",
  "various",
  "very",
  "via",
  "viz",
  "vol",
  "vols",
  "vs",
  "w",
  "want",
  "wants",
  "was",
  "wasn't",
  "wasnt",
  "way",
  "we",
  "we'd",
  "we'll",
  "we're",
  "we've",
  "wed",
  "welcome",
  "well",
  "went",
  "were",
  "weren't",
  "werent",
  "what",
  "what'll",
  "what's",
  "whatever",
  "whats",
  "when",
  "when's",
  "whence",
  "whenever",
  "where",
  "where's",
  "whereafter",
  "whereas",
  "whereby",
  "wherein",
  "wheres",
  "whereupon",
  "wherever",
  "whether",
  "which",
  "while",
  "whim",
  "whither",
  "who",
  "who'll",
  "who's",
  "whod",
  "whoever",
  "whole",
  "whom",
  "whomever",
  "whos",
  "whose",
  "why",
  "why's",
  "widely",
  "will",
  "willing",
  "wish",
  "with",
  "within",
  "without",
  "won't",
  "wonder",
  "wont",
  "words",
  "world",
  "would",
  "wouldn't",
  "wouldnt",
  "www",
  "x",
  "y",
  "yes",
  "yet",
  "you",
  "you'd",
  "you'll",
  "you're",
  "you've",
  "youd",
  "your",
  "youre",
  "yours",
  "yourself",
  "yourselves",
  "z",
  "zero"
];

/////////////////////////////////////////////
// TESTS //
////////////////////////////////////////////

// check if any stop words exist in the array
/* console.time("stopwordsTest");
let stopwordsFound = [];
parts.forEach(part => {
  if (stopwordsEnglish.includes(part.partName.toLowerCase())) {
    stopwordsFound.push(part.partName);
  }
});
console.log("stopwordsFound", stopwordsFound, stopwordsFound.length);
console.timeEnd("stopwordsTest"); */
