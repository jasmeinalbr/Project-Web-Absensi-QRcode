export const API_BASE_URL = 'http://localhost:5000/api';
export const WS_BASE_URL = 'ws://localhost:5000/ws';
let token = '';

export const getToken = () => token
export const setToken = (dataToken: string) => token = dataToken