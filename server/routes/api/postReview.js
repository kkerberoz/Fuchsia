const router = express.Router();
const Review = require("../../models/Review");

router.post('/', (req, res) => {
    const {userId, reviewTitle, reviewContent, reviewDateTime, category, status, view, imageLink} = req.body;

    const newReview = Review({
        userId,
        reviewTitle,
        reviewContent,
        reviewDateTime,
        category,
        status,
        view,
        imageLink,
    });

    newReview.save();

});