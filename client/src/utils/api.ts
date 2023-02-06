import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getBoard = async (id: string, ownerId: string) => {
    const { data } = await api.get(`/todo/${ownerId}/${id}`);
    return data;
}

export const changeTaskType = async (id: string, ownerId: string, taskId: string, type: string) => {
    const { data } = await api.patch(`/todo/${ownerId}/${id}/tasks/${taskId}/${type}`);
    return data;
}

export const changeTaskOrder = async (id: string, ownerId: string, tasks: any, type: string) => {
    const { data } = await api.post(`/todo/${ownerId}/${id}/tasks/order/${type}`, tasks);
    return data;
}
export const createTask = async (id: string, ownerId: string, content: string, type: string) => {
    const { data } = await api.post(`/todo/${ownerId}/${id}/tasks`, { content, type });
    return data;
}
export const deleteTask = async (id: string, ownerId: string, taskId: string) => {
    const { data } = await api.delete(`/todo/${ownerId}/${id}/tasks/${taskId}`);
    return data;
}
export const changeTaskContent = async (id: string, ownerId: string, taskId: string, content: string) => {
    const { data } = await api.post(`/todo/${ownerId}/${id}/tasks/${taskId}`, { content });
    return data;
}
export const changeCardOrder = async (id: string, ownerId: string, order: any) => {
    const { data } = await api.post(`/todo/${ownerId}/${id}/order`, order);
    return data;
}
export default api;