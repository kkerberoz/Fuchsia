const express = require("express");
const router = express.Router();
const ResHelper = require("../../helpers/ResHelper");
const Review = require("../../models/Review");

router.post("/", (req, res) => {
    const {reviewTitle, reviewContent, category, imageLink} = req.body;
    console.log(req);
    if(!reviewTitle){
        return ResHelper.fail(res, "review title is required!");
    }
    if(!reviewContent){
        return ResHelper.fail(res, "review content is required!");
    }
    if(!category){
        return ResHelper.fail(res, "category is required!");
    }

    const newReview = Review({
        reviewTitle,
        reviewContent,
        category,
        imageLink,
    });

    newReview.save();

});

module.exports = router;