const rpcBody = (method) => (params) => ({
	jsonrpc: '2.0',
	id: '0',
	method: method,
	params: params
});
const axios = require('axios').default;
export const request =
	(url) =>
	(method, params = {}) =>
		axios.post(url, JSON.stringify(rpcBody(method)(params)));

interface Response {
	id: string;
	jsonrpc: string;
	result: any;
}
