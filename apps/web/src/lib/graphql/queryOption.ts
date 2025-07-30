import { queryOptions } from "@tanstack/react-query";
import { execute } from "~/graphql/execute";
import { WHO_AM_I_QUERY } from "./queries";

export const whoAmIQueryOption = queryOptions({
  queryKey: ["whoAmI"],
  queryFn: async () => {
    const response = await execute(WHO_AM_I_QUERY);
    return response.whoAmI;
  },
  retry: false,
  refetchOnWindowFocus: false,
});
