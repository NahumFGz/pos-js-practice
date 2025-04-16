import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  //console.log(request.nextUrl) //request trae datos del api route

  const searchParams = request.nextUrl.searchParams
  const transactionDate = searchParams.get('transactionDate')

  const url = `${process.env.API_URL}/transactions?transactionDate=${transactionDate}`
  const req = await fetch(url)
  const response = await req.json()

  return Response.json(response)
}
