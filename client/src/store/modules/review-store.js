const BASE_API_URL = "http://localhost:5000/api";
import axios from "axios";

const review = {
    namespaced: true,
    state: {
        reviewInfo: {
            userId: "",
            reviewTitle: "",
            reviewContent: "",
            reviewDatetime: "",
            reviewDescription: "",
            category: "",
            status: "",
            imageLink: "",
            view: 0
        },
        comments: [],
        reviewList: [],
        searchKeyword: ""
    },
    mutations: {
        SET_REVIEW_INFO(state, info) {
            state.reviewInfo = info;
        },
        SET_REVIEW_LIST(state, data) {
            state.reviewList = data;
        },
        SET_SEARCH_KEYWORD(state, keyword) {
            state.searchKeyword = keyword;
        }
    },
    actions: {
        async setReviewInfo(context) {
            const response = await axios.get(`${BASE_API_URL}`);
            context.commit("SET_REVIEW_INFO", response.data);
        },
        async postReview(context, reviewData) {
            const jwt_token = JSON.parse(localStorage.getItem("jwt"));
            const response = await axios.post(`${BASE_API_URL}/postreview`, reviewData, {headers: {Authorization: jwt_token}});
            console.log("POST review object:", response.status);
        },
        async getReviewList(context, page) {
            const params = {
                filter: "",
                word: "",
                sortBy: "",
                direction: 1,
                offset: page,
            }
            const response = await axios.get(`${BASE_API_URL}/getreview`,{params});
            console.log("HERE",response.data.data.review);
            context.commit("SET_REVIEW_LIST", response.data.data.review);
            console.log("get Review List:", response.status);
        }
    },
    getters: {
        getReviewInfo: (state) => state.reviewInfo,
        getReviewList: (state) => state.reviewList
    },
};
export default review;