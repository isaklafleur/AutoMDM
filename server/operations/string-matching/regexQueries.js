// If you specifically want to match words then try something like this:
/in[a-z]*ing/i

// If you want "in" followed by any characters at all followed by "ing" then:
/in.*ing/i

// What if the prefix and suffix are stored in variables?
// Well then instead of using a regex literal as shown above you'd use new RegExp() and pass a string representing the pattern.

var prefix = "in",
suffix = "ing",
re = new RegExp(prefix + "[a-z]*" + suffix, "i");
if (re.match("Interesting")) {
// we have a match
}

// "interesting" would be a match but "noninterestingstuff" would not
/^in[a-z]*ing$/i
new RegExp("^" + p + "[a-z]*" + s + "$", "i")

//Check if there is a dot(.) in the string
if ("MyString.".indexOf(".") >= 0) {
  console.log("dot is present!");
} else {
  console.log("no dot is present!");
}
