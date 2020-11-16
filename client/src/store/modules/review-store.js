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
        searchKey: "",
        reviewList: [],
        searchKeyword: "",
        reviewCount: 0
    },
    mutations: {
        SET_SEARCH_KEY(state, key) {
            state.searchKey = key;
        },
        SET_REVIEW_COUNT(state, num) {
            state.reviewCount = num;
        },
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
        setSearchKey(context, key) {
            context.commit("SET_SEARCH_KEY", key);
        },
        async setReviewCount(context) {
            const response = await axios.get(`${BASE_API_URL}/getreviewscount`);
            context.commit("SET_REVIEW_COUNT",response.data.data);
            console.log("GET reviews count:", response.status);
        },
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
            
            context.commit("SET_REVIEW_LIST", response.data.data.review);
            console.log("get Review List:", response.status);
            console.log("data list",response.data.data.review);
        },
        async getSearchReviewList(context, keyObject) {
            if(keyObject.word === context.getters.getSearchKey) {
                // console.log("word : ", keyObject.word)
                const params = {
                    filter: "search",
                    word: context.getters.getSearchKey,
                    sortBy: "reviewDatetime",
                    direction: 1,
                    offset: keyObject.page,
                }
                console.log("in the get search");
                const response = await axios.get(`${BASE_API_URL}/getreview`,{params});
                
                context.commit("SET_REVIEW_LIST", response.data.data.review);
                console.log("get Review List:", response.status);
                console.log("data list",response.data.data.review);
            }
            
        }
    },
    getters: {
        getReviewInfo: (state) => state.reviewInfo,
        getReviewList: (state) => state.reviewList,
        getReviewCount: (state) => state.reviewCount,
        getSearchKey: (state) => state.searchKey
    },
};
export default review;