db.getCollection('eclasses').find({ hierarchical_position: { $regex: /13/ } }).sort({ hierarchical_position: 1 });
db.getCollection('eclasses').find({ its_superclass: "0173-1#01-AFX974#001" }).sort({ hierarchical_position: 1 });
db.eclasses.drop()