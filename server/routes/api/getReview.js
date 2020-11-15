const router = require("express").Router();
const Review = require("../../models/Review");

router.route("/").post((req) => {
    const { filter, word, sortBy, direction, offset } = req.body;

    if(!filter.localeCompare("category")){
        if(!sortBy.localeCompare("reviewDatetime"))
            Review.find({"category": word}).sort({"reviewDatetime": direction}).limit(20).skip(20 * (offset - 1));
        else if(!sortBy.localeCompare("view")){
            Review.find({"category": word}).sort({"view": direction}).limit(20).skip(20 * (offset - 1));
        }
    }
    else {
        if(!sortBy.localeCompare("reviewDatetime"))
            Review.find({"reviewTitle": word}).sort({"reviewDatetime": direction}).limit(20).skip(20 * (offset - 1));
        else if(!sortBy.localeCompare("view")){
            Review.find({"reviewTitle": word}).sort({"view": direction}).limit(20).skip(20 * (offset - 1));
        }
    }
    

});

module.exports = router;