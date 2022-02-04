import axios from 'axios';

export default class DmsAppService {

    getApplications() {
        return axios.get("http://hyddevsrv/DMSServices/api/DMSApplication/GetDmsapplications").then(res => res.data);
    }
}
