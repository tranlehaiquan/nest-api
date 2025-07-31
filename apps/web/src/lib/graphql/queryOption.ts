import { queryOptions } from "@tanstack/react-query";
import { execute } from "~/graphql/execute";
import { WHO_AM_I_QUERY } from "./queries";

export const whoAmIQueryOption = queryOptions({
  queryKey: ["whoAmI"],
  queryFn: async () => {
    try {
      const response = await execute(WHO_AM_I_QUERY);
      return response[0]?.whoAmI || null;
    } catch (error) {
      return null;
    }
  },
  retry: false,
  refetchOnWindowFocus: false,
});
