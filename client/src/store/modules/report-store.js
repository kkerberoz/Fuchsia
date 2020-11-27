import axios from "axios";
const BASE_API_URL = "http://localhost:5000/api";



const report = {
    namespaced: true,
    state: {
        violenceList: [],
        reportList: [],
        test: 10
    },
    mutations: {
        SET_VIOLENCE_LIST(state, data) {
            state.violenceList = data;
        },  
        SET_REPORT_LIST(state, data) {
            state.reportList = data;
        }
    },
    actions: {
        async setViolenceList(context) {
            const response = await axios.get(`${BASE_API_URL}/getviolentregconition`);
            context.commit("SET_VIOLENCE_LIST",response.data.data.violent);
            console.log("violenceList: ",response.data.data.violent);
            console.log("GET violenceList: ",response.status);
        },
        async setReportList(context) {
            const response = await axios.get(`${BASE_API_URL}/getreport`);
            context.commit("SET_REPORT_LIST", response.data.data.report);
            console.log("reportList: ",response.data.data.report);
            console.log("GET reportList: ",response.status);
        }
    },
    getters: {
        getViolenceList: (state) => state.violenceList,
        getReportList: (state) => state.reportList,
        getTest: (state) => state.test
    }
}
export default report;