const express = require("express");
const router = express.Router();
const ResHelper = require("../../helpers/ResHelper");
const Review = require("../../models/Review");

router.get("/", (req, res) => {
    const {userId, reviewTitle, reviewContent, category, status, view, imageLink} = req.body;

    console.log("ABC");
    if(!userId){
        return ResHelper.fail(res, "user ID is required!");
    }
    if(!reviewTitle){
        return ResHelper.fail(res, "review title is required!");
    }
    if(!reviewContent){
        return ResHelper.fail(res, "review content is required!");
    }
    if(!category){
        return ResHelper.fail(res, "category is required!");
    }
    if(!status){
        return ResHelper.fail(res, "status is required!");
    }
    if(!view){
        return ResHelper.fail(res, "view is required!");
    }

    // const newReview = Review({
    //     userId,
    //     reviewTitle,
    //     reviewContent,
    //     reviewDateTime,
    //     category,
    //     status,
    //     view,
    //     imageLink,
    // });

    // newReview.save();

});

module.exports = router;