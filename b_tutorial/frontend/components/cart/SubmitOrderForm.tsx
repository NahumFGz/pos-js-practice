import { submitOrder } from '@/actions/submit-order-action'
import { useStore } from '@/src/store'
import { useActionState } from 'react'

export default function SubmitOrderForm() {
  const total = useStore((state) => state.total)
  const coupon = useStore((state) => state.coupon.name)
  const contents = useStore((state) => state.contents)
  const order = {
    total,
    coupon,
    contents,
  }

  const submitOrderWithData = submitOrder.bind(null, order)
  const [state, dispatch] = useActionState(submitOrderWithData, {
    errors: [],
    success: '',
  })

  console.log(state)

  return (
    <form action={dispatch}>
      <input
        type='submit'
        className='mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3 cursor-pointer'
        value='confirmar compra'
      />
    </form>
  )
}
