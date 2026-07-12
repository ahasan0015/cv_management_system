import { useQuery } from "@tanstack/react-query";
import api from "../config/axios";


export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data.data; // laravel API date return
    },
    staleTime: 1000 * 60 * 5, // ৫ minute data catch
  });
};