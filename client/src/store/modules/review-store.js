const BASE_API_URL = "";
import axios from "axios";

const review = {
    namespaced: true,
    state: {
        reviewInfo: {
            user_id: "",
            review_content: "",
            review_datetime: "",
            category: "",
            status: "",
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
        }
    },
    getters: {
        getReviewInfo: (state) => state.reviewInfo,
        getReviewList: (state) => state.reviewList
    },
};
export default review;