import axios from 'axios';

const defaultHeaders = {
    'Content-Type': 'application/json',
}

const API_INSTANCE = axios.create({
    headers: defaultHeaders,
});

export const API = API_INSTANCE;
