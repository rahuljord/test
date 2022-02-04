import axios from 'axios';

export default class DmsApplicationFormService {

    getDmsApplication() {
        return axios.get('assets/demo/data/dmsApplicationdata.json').then(res => res.data.data);
    }
}

// export default DmsFormList;
