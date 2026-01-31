import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../api/tickets";

export function useTicketList(filters = {}) {
  return useQuery({
    queryKey: ["tickets", filters],
    queryFn: () => getTickets(filters),
    initialData: [],
  });
}