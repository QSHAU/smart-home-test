import axios from 'axios';
import option from './option';

const api = axios.create({
	baseURL: option.apiURL,
	withCredentials: false,
});

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (err) => {
		const originalRequest = err.config;
        console.log(originalRequest);
		if (err?.response?.status == 401 && err?.config && !err?.config?._isRetry) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.post(`${option.apiURL}auth/refreshToken`, { refreshToken: localStorage.getItem('refreshToken')});
                if(response.data.access_token) localStorage.setItem('token', response.data.access_token);
				return api.request(originalRequest);
			} catch (error) {
				console.log("You aren't authorizated");
			}
		}
		throw err;
	}
);

export default api;