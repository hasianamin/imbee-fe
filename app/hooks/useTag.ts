import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "../services/api";

export const useTags = (inname?: string) => {
  return useQuery({
    queryKey: ["tags", inname],
    queryFn: () => fetchTags(inname),
  });
};
