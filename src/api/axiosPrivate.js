import axios from 'axios';

const clientPrivate = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000 * 60,
    withCredentials: true,
});

clientPrivate.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 403) {
            await clientPrivate
                .get('/auth/refresh-token', {
                    withCredentials: true,
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
            console.log(error.config);
            return axios(error.config);
        } else {
            return Promise.reject(error);
        }
    }
);

export default clientPrivate;
