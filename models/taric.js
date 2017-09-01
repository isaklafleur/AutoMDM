// NOM_ITEM.GOODS_NOM_ITEM_ID||''||NOM_ITEM.PROD_LIN;DAT_START;DAT_END;LANG_COD;HIER_POS;SUBSTR('---------------',1,2*NOM_ITEM_IND.QUANT_IND);DESCR_TEXT
// 0100000000 80;1971-12-31 00:00;;EN;2;;LIVE ANIMALS

const mongoose = require("mongoose");

// Defining Mongoose Schema
const taricSchema = new mongoose.Schema({
  taricCode: String,
  dateStart: String,
  dateEnd: String,
  languageCode: String,
  hierPos: String,
  substring: String,
  description: String
});
// 0 NOM_ITEM.GOODS_NOM_ITEM_ID||''||NOM_ITEM.PROD_LIN (TARIC CODE, TAKE ONLY THE FIRST 10 DIGITS OF THE STRING)
// 1 DAT_START (valid from)
// 2 DAT_END (valid to)
// 3 LANG_COD (language code)
// 4 HIER_POS
// 5 SUBSTR('---------------',1,2*NOM_ITEM_IND.QUANT_IND) (substring)
// 6 DESCR_TEXT (title of the Taric code)

// Create mongoose model
module.exports = mongoose.model("TaricCode", taricSchema);
