// import axios from "axios";
// const BASE_API_URL = "http://localhost:5000/api";



const report = {
    state: {
        violenceList: []
    },
    mutations: {
        SET_VIOLENCE_LIST(state, data) {
            state.violenceList = data;
        }
    },
    actions: {
        // async setViolenceList(context) {
        //     const response = await axios.get(`${BASE_API_URL}/getviolence`)
        // }
    },
    getters: {
        getViolenceList: (state) => state.violenceList
    }
}
export default report;