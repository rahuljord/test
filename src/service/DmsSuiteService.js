import axios from 'axios';



export default class DmsSuiteService {

    getSuiteId() {
        return axios.get('assets/demo/data/SuiteData.json').then(res => res.data.data);
        // return axios.get('http://hyddevsrv/GlobalServices/api/JordSuites').then(res => res.data);
    }
}
