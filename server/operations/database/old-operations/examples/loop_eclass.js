const eClassArray = [13000000, 13010000, 13010100, 13010101, 13010102];

for (var i = 0; i < eClassArray.length; i++) {
    // segment
    console.log(eClassArray[i].toString().substring(0,2));
    
    // main-group
    console.log(eClassArray[i].toString().substring(2,4));

    // group
    console.log(eClassArray[i].toString().substring(4,6));

    // commodity class
    console.log(eClassArray[i].toString().substring(6,8));
}