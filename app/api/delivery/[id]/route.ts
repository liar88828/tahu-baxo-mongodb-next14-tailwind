import { NextRequest, NextResponse } from 'next/server'

import { deliveryController } from '@/lib/controller/deliver.controller';

export async function GET ( request: NextRequest, )
{
  return deliveryController.findOne( request )
}

export async function DELETE ( request: NextRequest )
{
  return deliveryController.deleteOne( request )
}

export async function PUT ( request: NextRequest )
{
  return deliveryController.updateOne( request )

}
