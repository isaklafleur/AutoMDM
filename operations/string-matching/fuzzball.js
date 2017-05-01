var fuzz = require('fuzzball');

/*console.log(fuzz.ratio('screaw', 'screw'));

var options = {scorer: fuzz.token_set_ratio};
var choices = ['Hood, Harry', 'Mr. Minor', 'Mr. Henry Hood'];
console.log(fuzz.extract("mr. harry hood", choices, options));
*/

const options = {scorer: fuzz.token_set_ratio};

const namesOfParts = ['screw', 'engine', 'cylinder', 'screaw', 'motor'];

for (var i = 0; i < namesOfParts.length; i++) {
  console.log(fuzz.extract(namesOfParts[i], namesOfParts, options));
}