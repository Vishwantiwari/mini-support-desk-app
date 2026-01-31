import api from "./axios";

export const getComments = async (ticketId) => {
  const res = await api.get(`/tickets/${ticketId}/comments`);
  return res.data;
};

export const createComment = async (ticketId, data) => {
  const res = await api.post(`/tickets/${ticketId}/comments`, data);
  return res.data;
};
