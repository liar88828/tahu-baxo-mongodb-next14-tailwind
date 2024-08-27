import { NextRequest, } from 'next/server'
import { deliveryController } from '@/lib/controller/deliver.controller';

export async function GET ( request: NextRequest, )
{
  return deliveryController.findAll( request )
}

export async function POST ( request: NextRequest )
{
  return deliveryController.createOne( request )

}
