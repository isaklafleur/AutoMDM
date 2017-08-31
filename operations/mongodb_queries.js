db
  .getCollection("eclasses")
  .find({ hierarchical_position: { $regex: /13/ } })
  .sort({ hierarchical_position: 1 });
db
  .getCollection("eclasses")
  .find({ its_superclass: "0173-1#01-AFX974#001" })
  .sort({ hierarchical_position: 1 });
db.eclasses.drop();
db
  .getCollection("eclasses")
  .find({})
  .sort({ codeName: 1 });
db.eclasses.find().sort({ eClassSegment: 1 });

//If you use the auto created _id field it has a date embedded in it ... so you can use that to order by ...
db.foo.find().sort({ _id: 1 });

db.foo
  .find()
  .sort({ _id: 1 })
  .limit(50);

// Natural Order
// The order in which the database refers to documents on disk. This is the default sort order.
db.foo
  .find()
  .sort({ $natural: 1 })
  .limit(50);

// MONGOOSE QUERIES

// Now let's look at what happens when no callback is passed:

// find each Segment with a segment code matching 13 (is a string).
var query = eClass.findOne({ eclassSegment: "13" });

// selecting the 4 fields of the whole 8 digits eClass Code (ex: 13 01 02 40 )
query.select("eClassSegment eClassMainGroup eClassGroup eClassCommodityClass");

// execute the query at a later time
query.exec(function(err, completeeclasscode) {
  if (err) return handleError(err);
  console.log(
    "%s %s %s %s",
    eClass.eClassSegment,
    eClass.eClassMainGroup,
    eClass.eClassGroup,
    eClass.CommodityClass
  );
});
