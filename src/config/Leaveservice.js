import axios from 'axios';
import config from './http-common'

const Leaveservice = {
    getMethod(endpoint) {
        return axios.get(config.baseUrl + endpoint).then(response => { return response.data; })
    }

};
export default Leaveservice;