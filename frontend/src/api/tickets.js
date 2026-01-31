import api from "./axios";

export const getTickets = async (params = {}) => {
  const res = await api.get("/tickets", { params });
  return res.data;
};

export const getTicketById = async (id) => {
  const res = await api.get(`/tickets/${id}`);
  return res.data;
};

export const createTicket = async (data) => {
  const res = await api.post("/tickets", data);
  return res.data;
};

export const updateTicket = async (id, patch) => {
  const res = await api.patch(`/tickets/${id}`, patch);
  return res.data;
};

export const deleteTicket = async (id) => {
  const res = await api.delete(`/tickets/${id}`);
  return res.data;
};