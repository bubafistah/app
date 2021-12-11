export const rpcBody = (method) => (params) => ({
	jsonrpc: '2.0',
	id: '0',
	method: method,
	params: params
});
const axios = require('axios').default;
export const request =
	(url) =>
	 (method, params = {}) =>
		 axios.post(url, JSON.stringify(rpcBody(method)(params))).then((data) => {
			 console.log(data)
			 if(data['data'].error){
				return data['data']
			 } else if(data['data']) {
				 return data['data'].result
			 }else{
				 return data
			 }
		 });

interface Response {
	id: string;
	jsonrpc: string;
	result: any;
}
