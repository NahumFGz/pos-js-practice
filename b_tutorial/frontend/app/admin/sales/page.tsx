import TransactionFilter from '@/components/transactions/TransactionFilter'
import Heading from '@/components/ui/Heading'
import { format } from 'date-fns'
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import { getSalesByDate } from '@/src/api'

export default async function SalesPage() {
  const queryClient = new QueryClient()

  const today = new Date()
  const formattedDate = format(today, 'yyyy-MM-dd')

  await queryClient.prefetchQuery({
    queryKey: ['sales', formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  })

  return (
    <>
      <Heading>Ventas</Heading>
      <p className='text-lg'>
        En esta seccioón aparecerán las ventas, utiliza el calendario para
        giltrar las ventas
      </p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
    </>
  )
}
