import Config from './config';
export const prefix = '';
export const mountNode = 'myApp';
export const assetsPrefix = Config.assetsPrefix;
export const host = Config.host;
export const port = Config.port;
export const commonHost = Config.commonHost;

export const apiUrl = Config.apiUrl;
export const formTypes = {
	urlencoded: 'application/x-www-form-urlencoded',
	json: 'application/json',
	multipart: 'multipart/form-data'
}