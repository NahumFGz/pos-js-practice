'use client'

import 'react-calendar/dist/Calendar.css'
import { useState } from 'react'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getSalesByDate } from '@/src/api'
import TransactionSummary from './TransactionSumary'
import { formatCurrency } from '@/src/utils'
import dynamic from 'next/dynamic'

//! Este componente cargará 100% en el cliente, en caso no se pueda personalizar con locale
const Calendar = dynamic(() => import('react-calendar'), {
  ssr: false,
})

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function TransactionFilter() {
  const [date, setDate] = useState<Value>(new Date())

  const formattedDate = format(date?.toString() || new Date(), 'yyyy-MM-dd')
  const { data, isLoading } = useQuery({
    queryKey: ['sales', formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  })

  const total =
    data?.reduce((total, transaction) => total + +transaction.total, 0) ?? 0

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start'>
      <div className='lg:sticky lg:top-10'>
        <Calendar
          value={date}
          onChange={setDate}
          //locale='es-ES' // <-- Forzar el idioma desde el servidor
        />
      </div>

      <div>
        {isLoading && 'Cargando'}
        {data ? (
          data.length ? (
            data.map((transaction) => (
              <TransactionSummary
                key={transaction.id}
                transaction={transaction}
              />
            ))
          ) : (
            <p className='text-lg text-center'>No hay ventas en esta fecha</p>
          )
        ) : null}

        <p className='my-5 text-lg font-bold text-right'>
          Total del día:{' '}
          <span className='font-normal'>{formatCurrency(total)}</span>
        </p>
      </div>
    </div>
  )
}
