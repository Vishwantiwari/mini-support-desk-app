import { useQuery } from "@tanstack/react-query";
import { getComments } from "../api/comments";

export function useComments(ticketId) {
  return useQuery({
    queryKey: ["comments", ticketId],
    queryFn: () => getComments(ticketId),
  });
}
