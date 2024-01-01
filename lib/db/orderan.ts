import { TCREATEORDERAN, TUPDATEORDERAN } from '@/lib/validator/zod';
import prisma, { OrderanCreate, SemuaProductCreate } from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';

export class Orderan {

  async createOne( data: TCREATEORDERAN ) {

    return prisma.$transaction( async ( tx ) => {
      const one = await tx.orderan.create( {
        data: this.setOne( data )
      } )

      const many = await tx.semuaProduct.createMany( {
        data: this.setMany( {
          data  : data.semuaProduct,
          method: "POST",
          id    : one.id
        } )
      } )
      return { product: many, orderan: one }
    } )

  }

  async findAll() {
    return prisma.orderan.findMany( {
      orderBy: { created_at: "desc" }, take: 100, include: { semuaProduct: true }
    } )
  }
  async findOne( id: string ) {
    return prisma.orderan.findUnique( {
      where: { id }, include: {
        semuaProduct: {
          select: {
            id       : true,
            nama     : true,
            lokasi   : true,
            jenis    : true,
            harga    : true,
            jumlah   : true,
            img      : true,
            orderanId: true,

          }
        }
      }
    } )
  }
  async findByStatus( status: string ) {
    let option = {
      include: { semuaProduct: true }
    }

    if( status !== "Semua" ) {
      option = Object.assign( option, {
        where  : { status },
        orderBy: { created_at: "desc" },
        take   : 100
      } )
    }

    return prisma.orderan.findMany( option )

  }

  async getDataForOrderan() {
    const travel                             = prisma.delivery.findMany( { select: { nama: true } } )
    const bank                               = prisma.bank.findMany( { select: { nama: true } } )
    const product                            = prisma.product.findMany( {
      select: {
        id    : true,
        nama  : true,
        img   : true,
        jumlah: true,
        jenis : true,
        harga : true,
        lokasi: true,
        // keterangan: true
      }
    } )
    const [ travelRes, bankRes, productRes ] = await prisma.$transaction( [ travel, bank, product ] )
    // console.log(travelRes, )
    return {
      travel : travelRes,
      bank   : bankRes,
      product: productRes,
    }
  }

  async updateOne( data: TUPDATEORDERAN, id: string, ) {

    return prisma.$transaction( async ( tx ) => {

      await tx.semuaProduct.deleteMany( { where: { orderanId: id } } )

      const updateData = await tx.orderan.update( {
        where: { id },
        data : this.setOne( data )
      } );

      const product = await tx.semuaProduct.createMany( {
        data: this.setMany( {
          data  : data.semuaProduct,
          method: "POST",
          id    : id
        } )
      } )
      return { orderan: updateData, product }
    }, {
      // maxWait       : 5000, // default: 2000
      // timeout       : 10000, // default: 5000
      // isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database
                                                                     // configuration

    } )

  }

  async deleteOne( id: string ) {

    return prisma.$transaction( async ( tx ) => {

      const deleteProduct = await tx.semuaProduct.deleteMany( { where: { orderanId: id } } )
      const deleteOrder   = await tx.orderan.delete( { where: { id } } )

      return { deleteProduct, deleteOrder }
    } )
  }
  async destroyMany( array: string [] ) {
    // console.log( array )
    const id            = array.map( d => d )
    const deleteProduct = prisma.semuaProduct.deleteMany( { where: { orderanId: { in: id } } } )

    const deleteOrder = prisma.orderan.deleteMany( {
      where: {
        id: { in: id }, semuaProduct: {
          // every: {
          //   orderanId: { in: id }
          // }
        }
      }
    } )

    return prisma.$transaction( [ deleteProduct, deleteOrder ] )
  }
  private setOne( d: Omit<OrderanCreate, "semuaProduct"> ) {
    // d.waktuKirim = !d.waktuKirim ? new Date() : d.waktuKirim
    // d.pesan      = !d.pesan ? new Date() : d.pesan
    // d.kirim      = !d.kirim ? new Date() : d.kirim

    let data = {
      alamatPenerima: d.alamatPenerima,
      guna          : d.guna,
      dari          : d.dari,
      hpPenerima    : d.hpPenerima,
      hpPengirim    : d.hpPengirim,
      lokasi        : d.lokasi.replaceAll( " ", "" ),
      namaPengiriman: d.namaPengiriman,
      ongkir        : d.ongkir,
      penerima      : d.penerima,
      pengirim      : d.pengirim,
      pesan         : new Date( d.pesan ),
      waktuKirim    : new Date( d.waktuKirim ),
      // waktuKirim    : new Date( d.kirim + "T" + time + ".000Z" ),
      status        : d.status,
      totalBayar    : d.totalBayar,
      totalPenjualan: d.totalPenjualan,
      typePembayaran: d.typePembayaran,
    }

    if( typeof d.id === "string" ) {
      Object.assign( data, { id: d.id } )
    }

    return { ...data }
  }
  private setMany(
    { data, method, id }:
      {
        data: SemuaProductCreate[],
        method: "POST" | 'PUT',
        id: string
      } ) {
    return data.map( ( d: SemuaProductCreate ) => (
        Object.assign( {
          // id        : method === "PUT" ? d.id : d.id + "_" + Date.now(),
          // keterangan: d.keterangan,
          jenis    : d.jenis.replaceAll( " ", "" ),
          lokasi   : d.lokasi.replaceAll( " ", "" ),
          nama     : d.nama,
          img      : d.img,
          jumlah   : d.jumlah,
          harga    : d.harga,
          orderanId: id,
        } )
      )
    );
  }
}

export const orderan = new Orderan()