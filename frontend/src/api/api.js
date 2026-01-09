import { CONST } from '../utils/constants';
import apiGateway from './axiosClient';

export const login = (credential) => {
    return apiGateway.post(`/auth/login/`, credential);
};

export const logout = (refresh = localStorage.getItem(CONST.REFRESH)) => {
    return apiGateway.post(`/logout/`, { refresh });
};

export const register = (credential) => {
    return apiGateway.post(`/auth/register/`, credential);
};

export const createForm = (payload) => {
    return apiGateway.post(`forms/`, payload);
}

export const getForms = () => { return apiGateway.get("forms/"); }

export const getFormById = (id) => {
    return apiGateway.get(`forms/${id}/`);
}

export const editFormById = (id, name, fields) => {
    return apiGateway.put(`forms/${id}/`, {name, fields});
}
export const createEmployee = (payload) => {
    return apiGateway.post("employees/", payload);
}

export const getEmployees = (params = {}) => {
    return apiGateway.get("employees/", { params });
}

export const deleteEmployee = (id) => {
    return apiGateway.delete(`employees/${id}/`);
}