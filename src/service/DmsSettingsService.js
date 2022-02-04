import axios from 'axios';

export default class SettingsService {

    getSettings() {
        return axios.get("assets/demo/data/dsmSettingsService.json").then(res => res.data.data);
    }
}
