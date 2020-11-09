const review = {
    namespaced: true,
    state: {
        reviewInfo: {},
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

    },
    getters: {
        getReviewInfo: (state) => state.reviewInfo,
        getReviewList: (state) => state.reviewList
    },
};
export default review;