import { apiPost, apiGet, apiReq, apiPut } from '../utils';
import { formTypes } from '../constants';

export function loginAPI(user) {
	return apiPost('/login', user);
}