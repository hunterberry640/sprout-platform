import axios from 'axios';
import { SERVER_API_URL } from '../../config/constants';
import { setApiService } from '@savantly/sprout-runtime';

export const sproutApiSvc = axios.create({});
setApiService(sproutApiSvc);

const TIMEOUT = 1 * 60 * 1000;
sproutApiSvc.defaults.timeout = TIMEOUT;
sproutApiSvc.defaults.baseURL = SERVER_API_URL;
sproutApiSvc.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  Accept: 'application/json'
};
