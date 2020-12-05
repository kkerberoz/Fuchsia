import axios from "axios";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
Vue.use(VueSweetalert2);
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
      view: 0,
    },
    commentList: [],
    searchKey: "",
    reviewList: [],
    searchKeyword: "",
    reviewCount: 0,
    reviewPedingCount: 0,
    userMonthCount: 0,
  },
  mutations: {
    SET_COMMENT_LIST(state, data) {
      state.commentList = data;
    },
    SET_SEARCH_KEY(state, key) {
      state.searchKey = key;
    },
    SET_REVIEW_COUNT(state, num) {
      state.reviewCount = num;
    },
    SET_PENDING_COUNT(state, num) {
      state.reviewPedingCount = num;
    },
    SET_USER_COUNT(state, num) {
      state.userMonthCount = num;
    },
    SET_REVIEW_INFO(state, info) {
      state.reviewInfo = info;
    },
    SET_REVIEW_LIST(state, data) {
      state.reviewList = data;
    },
    SET_SEARCH_KEYWORD(state, keyword) {
      state.searchKeyword = keyword;
    },
  },
  actions: {
    async setCommentList(context, reviewId) {
      const params = {
        reviewId,
      };
      const response = await axios.get("/api/getcomments", {
        params,
      });
      context.commit("SET_COMMENT_LIST", response.data.data.comment);
      //console.log("comment list: ", response.data.data.comment);
      //console.log("GET comment list:", response.status);
    },
    setSearchKey(context, key) {
      context.commit("SET_SEARCH_KEY", key);
    },
    async setReviewCount(context) {
      const response = await axios.get("/api/getreviewscount");
      context.commit("SET_REVIEW_COUNT", response.data.data);
      //console.log(response.data.data," This is count");
      //console.log("GET reviews count:", response.status);
    },
    async setPendingCount(context) {
      const response = await axios.get("/api/getviolentpendingcount");
      context.commit("SET_PENDING_COUNT", response.data.data);
      //console.log("GET pendding count:", response.status);
    },
    async setUserCount(context) {
      const response = await axios.get("/api/getuserscountlastmonth");
      context.commit("SET_USER_COUNT", response.data.data);
      //console.log("GET user count:", response.status);
    },
    async postReview(context, reviewData) {
      const jwt_token = JSON.parse(localStorage.getItem("jwt"));
      const response = await axios.post("/api/postreview", reviewData, {
        headers: { Authorization: jwt_token },
      });
      //console.log("POST review object:", response.status);
      return response.data.data.review._id;
    },
    async getReviewList(context, keyObject) {
      const params = {
        filter: keyObject.filter,
        category: keyObject.category,
        word: "",
        sortBy: "reviewDatetime",
        direction: 1,
        offset: keyObject.page,
      };
      const response = await axios.get("/api/getreview", {
        params,
      });

      context.commit("SET_REVIEW_LIST", response.data.data.review);
      //console.log("GET Review List:", response.status);
      //console.log("data list", response.data.data.review);
    },
    async getSearchReviewList(context, keyObject) {
      // //console.log("#$#",keyObject.category)
      if (keyObject.word === context.getters.getSearchKey) {
        // //console.log("word : ", keyObject.word)
        const params = {
          filter: keyObject.filter,
          word: context.getters.getSearchKey,
          sortBy: "reviewDatetime",
          direction: 1,
          offset: keyObject.page,
          category: keyObject.category,
        };
        //console.log("in the get search");
        const response = await axios.get("/api/getreview", {
          params,
        });

        context.commit("SET_REVIEW_LIST", response.data.data.review);
        //console.log("get Review List:", response.status);
        //console.log("data list", response.data.data.review);
      }
    },
    async getReviewInfo(context, reviewId) {
      // //console.log("id", reviewId)
      const params = { reviewId: reviewId };
      const response = await axios.get("/api/getreviewinfo", {
        params,
      });
      // //console.log("test:", response.data)
      context.commit("SET_REVIEW_INFO", response.data.data);
      //console.log("get Review Info:", response.status);
      //console.log("data info", response.data.data);
    },
  },
  getters: {
    getReviewInfo: (state) => state.reviewInfo,
    getReviewList: (state) => state.reviewList,
    getReviewCount: (state) => state.reviewCount,
    getReviewPendingCount: (state) => state.reviewPedingCount,
    getUserLastMonth: (state) => state.userMonthCount,
    getSearchKey: (state) => state.searchKey,
    getCommentList: (state) => state.commentList,
  },
};
export default review;
