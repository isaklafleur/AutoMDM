const express = require('express');
const router = express.Router();
const EClass = require("../models/eclass");

router.get('/:eclass', (req, res)=>{
  let segments =req.params.eclass.match(/.{1,2}/g);
  let query = {};
  
  let subnodeFound = false;
  if(segments[0]!=="-1")
    query.eclassSegment = segments[0];

  subnodeFound = getQuerySegment(segments[1], subnodeFound, query, "eclassMainGroup");
  subnodeFound = getQuerySegment(segments[2], subnodeFound, query, "eclassGroup");
  subnodeFound = getQuerySegment(segments[3], subnodeFound, query, "eclassCommodityClass");

  EClass.find(query)
    .sort( 
    {eclassSegment: 1, eclassMainGroup: 1, eclassGroup: 1, eclassCommodityClass: 1}
    )
    .exec((err, nodes)=>{
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json({ nodes });
  })
})

function getQuerySegment(segment, subnodeFound, query, segmentName) {
  if(!subnodeFound && segment==="00") {
    subnodeFound = true;
    query[segmentName] = {$ne:"00"};
  } else {
    query[segmentName] = segment ? segment : "00";
  }
  return subnodeFound;
}

module.exports = router;