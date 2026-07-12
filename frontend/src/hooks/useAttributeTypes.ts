import { useQuery } from "@tanstack/react-query";
import api from "../config/axios";


export const useAttributeTypes = () => {
  return useQuery({
    queryKey: ["attributeTypes"],
    queryFn: async () => {
      const response = await api.get("/attribute-types"); // endpoint
      return response.data.data;
    },
  });
};