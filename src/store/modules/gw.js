import {
    GET_PROPS
} from "../../config/api";
import axios from "axios";
export default {
    namespace: true,
    state: {

    },
    mutations: {
        setComponentProps() {

        }
    },
    actions: {
        async getComponentProps({commit}, params) {
            let options = {
                url: GET_PROPS,
                params
            }
            let data = await axios(options);

        }
    }
}