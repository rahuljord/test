import axios from 'axios';



export default class DmsDivisonService {

    getDivsionId() {
        // return axios.get('assets/demo/data/dmsAppDivisionsData.json').then(res => res.data.data);
        return axios.get('http://hyddevsrv/GlobalServices/api/Divisions').then(res => res.data);
    }
}