import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTicket } from "../api/tickets";

export function useDeleteTicket(ticketId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTicket(ticketId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.removeQueries({ queryKey: ["ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["comments", ticketId] });
    },
  });
}
