import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries : { 
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false
    }
  }
})

export default function QueryProvider({ children }: { children?: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}