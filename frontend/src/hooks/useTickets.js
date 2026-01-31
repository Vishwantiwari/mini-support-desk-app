import { useQuery } from "@tanstack/react-query";
import { getTicketById } from "../api/tickets";

export function useTickets(id) {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicketById(id),
    enabled: !!id,
  });
}
