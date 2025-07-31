import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '~/components/queryProvider/queryClient'
import { whoAmIQueryOption } from '~/lib/graphql/queryOption';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(whoAmIQueryOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}

export default Layout;