const fs = require("fs");
const csv = require("fast-csv");

const arrayofNouns = [{ kalle: 2 }, { assembly: 3 }, { putte: 2 }];

const arrayofNouns2 = {
  COVER: 7050,
  BRACKET: 7934,
  "RING SNAP": 93,
  RETAINER: 1204,
  SPRING: 2981,
  HOUSINGSING: 2271,
  PART: 3376,
  RING: 13897,
  GEAR: 1749,
  HEAD: 1128,
  WIPER: 518,
  SEAL: 5435,
  SYS: 48,
  "RING VITON": 54,
  SHIM: 2525,
  CAGE: 69,
  ROD: 2795,
  ELEMENT: 1404,
  PLATE: 18883,
  DIAPHRAGM: 181,
  UPPER: 70,
  VALVE: 12545,
  LOCK: 819,
  "FLANG SPLIT": 1,
  LOCKWASHER: 212,
  CAPSCREW: 3054,
  HOSE: 11457,
  ASSEMBLYEMBLY: 30360,
  WASHER: 6732,
  BEARING: 5242,
  ASSEMBLYY: 7846,
  BOARD: 234,
  NUT: 4750,
  SCREW: 8996,
  BUSHING: 6004,
  STUD: 805,
  BOLT: 4309,
  CYLINDERRDERINDER: 2894,
  CLAMP: 3411,
  PLUG: 4144,
  BOOSTER: 4,
  CAP: 2222,
  BOOT: 208,
  SWITCH: 3470,
  PISTON: 1776,
  ROTOR: 220,
  DIODE: 92,
  COIL: 603,
  LUG: 507,
  SHEAVE: 176,
  TRUNNION: 44,
  ADAPTER: 3093,
  FILTER: 2366,
  LUBRICATOR: 92,
  FAN: 753,
  SLEEVE: 2194,
  PUMP: 3123,
  VITON: 108,
  BLOCK: 3128,
  PIN: 8874,
  "HUB FAN": 1,
  MOUNT: 3631,
  KIT: 20893,
  SPOOL: 323,
  SPACER: 3763,
  INSULATOR: 142,
  "CONE ROLLER": 1,
  BRG: 50,
  HUB: 674,
  "CAGE RETAIN": 1,
  "KIT BRG": 2,
  DIFFERENTIALGEAR: 43,
  DIFFERENTIALKIT: 89,
  BRAKE: 363,
  SWIVEL: 406,
  STARTER: 324,
  "BEARING RLR": 2,
  REGULATOR: 462,
  LIGHT: 599,
  STRAINER: 181,
  "KIT SNAPRING": 3,
  DRUM: 324,
  CUP: 561,
  BREATHER: 205,
  CORDGRIP: 53,
  DRIVELINE: 816,
  YOKE: 686,
  TUBE: 6935,
  FITTING: 3789,
  GASKET: 3638,
  ACTUATOR: 267,
  CABLE: 11355,
  "HEAD CYLINDER": 3,
  "CHAIN RIVET": 1,
  CHAIN: 1354,
  DIPSTICK: 52,
  END: 268,
  GLASSEMBLY: 631,
  KNOB: 242,
  BALL: 406,
  CLEANER: 229,
  REDUCER: 417,
  DRIVER: 262,
  SHAFT: 5587,
  SEAT: 521,
  CONNECTOR: 2318,
  BODY: 951,
  CLIPPINGS: 3,
  RIVET: 144,
  ADAPTOR: 261,
  CUSHION: 159,
  "PLATE NAME": 1,
  HANDLE: 876,
  "HUB HANDLE": 1,
  DETENT: 17,
  PLUNGER: 151,
  HORN: 109,
  CARRIER: 461,
  "KIT PINION": 1,
  LOCKNUT: 164,
  DEFLECTOR: 45,
  DEFLECT: 48,
};

const arrayofObjs = [];

for (const prop in arrayofNouns2) {
  if (arrayofNouns2.hasOwnProperty(prop)) {
    arrayofObjs.push({ Name: prop, Count: arrayofNouns2[prop] });
  }
}

console.log(arrayofObjs);

csv.writeToString(arrayofObjs, { headers: true }, (err, result) => {
  console.log(result);
});

/* 
const csvStream = csv.createWriteStream({ headers: true });
const writableStream = fs.createWriteStream("my.csv");

writableStream.on("finish", () => {
  console.log("DONE!");
});

csvStream.pipe(writableStream);
csvStream.write({ Name: "CHAIN", Count: 1354 });
csvStream.write({ Name: "DIPSTICK", Count: 52 });
csvStream.end();

 function writeFilesToDisk(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, error => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

writeFilesToDisk("test.csv", arrayofNouns)
  .then(result => console.log(result))
  .catch(error => console.log(error));

*/

/*
const lexicon = {
  bearing: "Noun",
};

const synonyms = [
  { master: "radial shaft seal", synonym: "lip seal" },
  { master: "motor", synonym: "engine" },
];

const specialWords = ["o-ring", "v ring", "v-ring"];

 let strings = [
  "ACTUATOR-BRK",
  "FLANG-SPLIT",
  "O-RING",
  "BOLT,M6X25MM HF",
  "BOLT,M6-1.0",
  "SCREW.CAP 444 44.4 ff.",
  "SCREW.CAP 444",
  "SCREW;CAP",
  "BOLT,M6-1.0",
  "screw and washer assembly (sems)",
  "screw",
  "angular contact (rolling) bearing",
  "Thrust bearings",
  "Thrust bear.",
  "Tensioner bearing",
  "screw,cap ff",
  "END bearing, ddfdfdf",
  "Tapped base bearing",
  "Load bearing element 1",
  "end bracket, testing",
  "Hanger bearings",
  "Flanged bearings",
  "screw,cap",
  "Angular contact bearing",
  "double-row (rolling) bearing",
  "screw,cap",
  "end bracket, bearing bracket (US)",
  "external-aligning (rolling) bearing",
  "filling slot (ball) bearing",
  "screw,cap",
  "#2 Heating fuel oil",
  "#4 or #6 Residual heavy fuel oils",
  "Aluminum SAE 6000 series hot rolled coil",
  "Aluminum, Reroll, Capacitor Foil Alloy 1145",
  "Aluminum, Sheet, Coiled Coated, Except Conductor & Decorative For Stamping",
  "700-R NEMA sealed industrial control relay",
  "802R NEMA 13 sealed contact",
  "802XR NEMA 7/9 hazardous location sealed contact",
  "Diaphragm seals",
  "Die cut seal kit",
  "MOTOR          STARTER",
  "V ring seal",
  "lip seal",
  "rotary shaft lip-type seal",
  "rubber-covered rotary shaft lip-type seal",
  "seal, O-ring",
  "seal kit",
  "motor with standardized mounting dimensions",
  "Connector to screw",
  "Earthing lug for cable screw gland",
  "Orthodontic expansion screws",
  "Self drilling tapping screw",
  "screw assembly",
  "BOLT,M6-1.0",
  "BOLT,HEX METRIC M6",
  "BOLT M6X25MM",
  "BOLT,M6X25MM HF",
  "NUT HEX FLG M6 1.0",
  "NUT HEX LOCK M6X1.0.00",
  "NUT,JAM,M6-1",
  "SCREW;CAP",
  "MOUNT,CALIBER,50,M6",
  "COVER",
  "BRACKET",
  "BRACKET",
  "RING-SNAP"
];

const abbreviations = [
  { abbreviation: "ASSY", expansion: "ASSEMBLY" },
  { abbreviation: "ASSY.", expansion: "ASSEMBLY" },
  { abbreviation: "ASY", expansion: "ASSEMBLY" },
  { abbreviation: "ASSY.", expansion: "ASSEMBLY" },
  { abbreviation: "BEAR.", expansion: "BEARING" },
  { abbreviation: "BRK", expansion: "BREAK" },
  { abbreviation: "TERMNL", expansion: "TERMINAL" },
  { abbreviation: "BRG", expansion: "BEARING" },
  { abbreviation: "ATTACH.", expansion: "ATTACHMENT" },
  { abbreviation: "BRKT", expansion: "BRAKET" },
  { abbreviation: "CORDGRIP", expansion: "CORD GRIP" },
  { abbreviation: "COMPL.", expansion: "COMPLETE" },
  { abbreviation: "CAPSCREW", expansion: "CAP SCREW" },
  { abbreviation: "CPLG", expansion: "COUPLING" },
  { abbreviation: "CYL", expansion: "CYLINDER" },
  { abbreviation: "CYL.", expansion: "CYLINDER" },
  { abbreviation: "CYLIND", expansion: "CYLINDER" },
  { abbreviation: "CYLIND.", expansion: "CYLINDER" },
  { abbreviation: "CYLINDE", expansion: "CYLINDER" },
  { abbreviation: "FILT.", expansion: "FILTER" },
  { abbreviation: "FRICT.", expansion: "FRICTION" },
  { abbreviation: "HD", expansion: "HEAD" },
  { abbreviation: "HD.", expansion: "HEAD" },
  { abbreviation: "CART.", expansion: "CARTRIDGE" },
  { abbreviation: "CARTR.", expansion: "CARTRIDGE" },
  { abbreviation: "HYD.", expansion: "HYDRAULIC" },
  { abbreviation: "HYDR.", expansion: "HYDRAULIC" },
  { abbreviation: "REDUC.", expansion: "REDUCER" },
  { abbreviation: "REGUL.", expansion: "REGULATOR" },
  { abbreviation: "FLG", expansion: "FLANGE" }
];
*/
