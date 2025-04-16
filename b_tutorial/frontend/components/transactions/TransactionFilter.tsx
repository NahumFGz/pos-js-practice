'use client'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useState } from 'react'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getSalesByDate } from '@/src/api'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function TransactionFilter() {
  const [date, setDate] = useState<Value>(new Date())

  const formattedDate = format(date?.toString() || new Date(), 'yyyy-MM-dd')
  const { data, isLoading } = useQuery({
    queryKey: ['sales', formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  })

  console.log('data', data)
  console.log(isLoading)

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10'>
      <div>
        <Calendar
          value={date}
          onChange={setDate}
          locale='es-ES' // <-- Forzar el idioma desde el servidor
        />
      </div>

      <div>2</div>
    </div>
  )
}
