import {NextRequest} from 'next/server'
import {bankController} from '@/lib/controller/bank.controller'

export async function GET(request: NextRequest) {
  return bankController.findAll(request)
}

export async function POST(request: NextRequest) {
  return bankController.createOne(request)
}
