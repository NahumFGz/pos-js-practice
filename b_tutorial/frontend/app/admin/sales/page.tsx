import TransactionFilter from '@/components/transactions/TransactionFilter'
import Heading from '@/components/ui/Heading'

export default function SalesPage() {
  return (
    <>
      <Heading>Ventas</Heading>
      <p className='text-lg'>
        En esta seccioón aparecerán las ventas, utiliza el calendario para
        giltrar las ventas
      </p>

      <TransactionFilter />
    </>
  )
}
