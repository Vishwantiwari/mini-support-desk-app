import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicket } from "../api/tickets";

export function useUpdateTicket(ticketId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patch) => updateTicket(ticketId, patch),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}
