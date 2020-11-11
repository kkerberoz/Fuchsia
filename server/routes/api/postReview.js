const express = require("express");
const router = express.Router();
// const ResHelper = require("../../helpers/ResHelper");
// const Review = require("../../models/Review");

router.post("/", (req) => {
    return console.log(req);
    // const {reviewTitle, reviewContent, category, imageLink} = req.body;
    // if(!reviewTitle){
    //     return ResHelper.fail(res, "review title is required!");
    // }
    // if(!reviewContent){
    //     return ResHelper.fail(res, "review content is required!");
    // }
    // if(!category){
    //     return ResHelper.fail(res, "category is required!");
    // }
    // // return console.log(res.body);

    // const newReview = Review({
    //     reviewTitle,
    //     reviewContent,
    //     category,
    //     imageLink,
    // });

    // newReview.save();

});

module.exports = router;