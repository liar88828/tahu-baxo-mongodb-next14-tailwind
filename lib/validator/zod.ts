import { z } from 'zod'
import {
  BankCreate, BankUpdate, DeliveryCreate, DeliveryUpdate, OrderanCreate, OrderanUpdate, ProductCreate, ProductUpdate,
  SemuaProductCreate, SemuaProductUpdate
} from '@/lib/db/prisma';

export class CreateZod {
  // master
  static BankSchema = z.object( {
    id        : z.string( { required_error: 'ID is required', } ).optional(),
    hp        : z.string( { required_error: 'Hp is required', } ).min( 2 ).max( 30 ),
    img       : z.string( { required_error: 'Img is required', } ).min( 2 ).max( 300 ),
    no        : z.string( { required_error: 'No is required', } ).min( 2 ).max( 30 ),
    nama      : z.string( { required_error: 'nama is required', } ).min( 2 ).max( 30 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 2 ).max( 30 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 2 ).max( 30 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 2 ).max( 300 ),
  } ) satisfies z.Schema<BankCreate>

  static ProductSchema = z.object( {
    id        : z.string( { required_error: 'ID is required', } ).optional(),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    nama      : z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    harga     : z.number( { required_error: 'Harga is required', } ).nonnegative(),
    img       : z.string( { required_error: 'Img is required', } ).min( 1 ).max( 300 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    jumlah    : z.number( { required_error: 'Jumlah is required', } ).int().nonnegative(),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ).max( 200 ),
  } ) satisfies z.Schema<ProductCreate>

  static DeliverySchema = z.object( {
    id        : z.string( { required_error: 'Id is required', } ).optional(),
    nama      : z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    hp        : z.string( { required_error: 'Hp is required', } ).min( 1 ).max( 100 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    img       : z.string( { required_error: 'Img is required', } ).min( 1 ).max( 300 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ),
    harga     : z.number( { required_error: 'Harga is required', } ).int().nonnegative(),
  } )satisfies z.Schema<DeliveryCreate>

  static semuaProdukSchema = z.object( {
    // orderanId: z.string().min( 1 ).optional(),
    id       : z.string( { required_error: 'ID is required', } ).optional(),
    lokasi: z.string( { required_error: 'Lokasi is required', } ),
    nama  : z.string( { required_error: 'Nama is required', } ),
    jenis : z.string( { required_error: 'Jenis is required', } ),
    img   : z.string( { required_error: 'Img is required', } ).min( 0 ).max( 300 ),
    harga : z.number( { required_error: 'Harga is required', } ).nonnegative(),
    jumlah: z.number( { required_error: 'Jumlah is required', } ).nonnegative(),
  } ) satisfies z.Schema<SemuaProductCreate>

  static OrderanSchema = z.object( {
    id            : z.string( { required_error: 'ID is required', } ).optional(),
    dari          : z.string( { required_error: 'dari is required', } ).min( 1 ).max( 100 ),
    namaPengiriman: z.string( { required_error: 'namaPengiriman is required', } ).min( 1 ).max( 100 ),
    pesan         : z.string( { required_error: 'Pesan is required', } ).min( 1 ).max( 100 ),
    waktuKirim    : z.string( { required_error: 'waktuKirim is required', } ).min( 1 ).max( 100 ),
    pengirim      : z.string( { required_error: 'pengirim is required', } ).min( 1 ).max( 100 ),
    hpPengirim    : z.string( { required_error: 'hpPengirim is required', } ).min( 1 ).max( 100 ),
    penerima      : z.string( { required_error: 'penerima is required', } ).min( 1 ).max( 100 ),
    alamatPenerima: z.string( { required_error: 'alamatPenerima is required', } ).min( 1 ).max( 100 ),
    hpPenerima    : z.string( { required_error: 'hpPenerima is required', } ).min( 1 ).max( 100 ),
    guna          : z.string( { required_error: 'guna is required', } ).min( 1 ).max( 400 ),
    lokasi        : z.string( { required_error: 'lokasi is required', } ).min( 1 ).max( 100 ),
    typePembayaran: z.string( { required_error: 'typePembayaran is required', } ).min( 1 ).max( 100 ),
    status        : z.string( { required_error: 'status is required', } ).min( 1 ).max( 100 ),
    //
    ongkir        : z.number( { required_error: ' ongkir is required', } ).int().nonnegative(),
    totalBayar    : z.number( { required_error: ' totalBayar is required', } ).int().nonnegative(),
    totalPenjualan: z.number( { required_error: ' totalPenjualan is required', } ).int().nonnegative(),
    semuaProduct  : z.array( this.semuaProdukSchema )
  } )satisfies z.Schema<Omit<OrderanCreate, 'semuaProduct'>>

}

export class UpdateZod {
  // master
  static BankSchema = z.object( {
    id        : z.string( { required_error: 'ID is required', } ).optional(),
    hp        : z.string( { required_error: 'Hp is required', } ).min( 2 ).max( 30 ),
    img       : z.string( { required_error: 'Img is required', } ).min( 2 ).max( 300 ),
    no        : z.string( { required_error: 'No is required', } ).min( 2 ).max( 30 ),
    nama      : z.string( { required_error: 'nama is required', } ).min( 2 ).max( 30 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 2 ).max( 30 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 2 ).max( 30 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 2 ).max( 300 ),
  } ) satisfies z.Schema<BankUpdate>

  static ProductSchema = z.object( {
    id        : z.string( { required_error: 'ID is required', } ).optional(),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    nama      : z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    harga     : z.number( { required_error: 'Harga is required', } ).nonnegative(),
    img       : z.string( { required_error: 'Img is required', } ).min( 1 ).max( 300 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    jumlah    : z.number( { required_error: 'Jumlah is required', } ).int().nonnegative(),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ).max( 200 ),
  } ) satisfies z.Schema<ProductUpdate>

  static DeliverySchema = z.object( {
    id        : z.string( { required_error: 'Id is required', } ).optional(),
    nama      : z.string( { required_error: 'Nama is required', } ).min( 1 ).max( 100 ),
    hp        : z.string( { required_error: 'Hp is required', } ).min( 1 ).max( 100 ),
    lokasi    : z.string( { required_error: 'Lokasi is required', } ).min( 1 ).max( 100 ),
    jenis     : z.string( { required_error: 'Jenis is required', } ).min( 1 ).max( 100 ),
    img       : z.string( { required_error: 'Img is required', } ).min( 1 ).max( 300 ),
    keterangan: z.string( { required_error: 'Keterangan is required', } ).min( 1 ).optional(),
    harga     : z.number( { required_error: 'Harga is required', } ).int().nonnegative(),
  } )satisfies z.Schema<DeliveryUpdate>

  static semuaProdukSchema = z.object( {
    // orderanId: z.string().min( 1 ).optional(),
    // id       : z.string( { required_error: 'ID is required', } ).optional(),
    lokasi: z.string( { required_error: 'Lokasi is required', } ),
    nama  : z.string( { required_error: 'Nama is required', } ),
    img   : z.string( { required_error: 'Img is required', } ).min( 0 ).max( 300 ),
    jenis : z.string( { required_error: 'Jenis is required', } ),
    harga : z.number( { required_error: 'Harga is required', } ).nonnegative(),
    jumlah: z.number( { required_error: 'Jumlah is required', } ).int().nonnegative(),
  } ) satisfies z.Schema<SemuaProductUpdate>

  static OrderanSchema = z.object( {
    id            : z.string( { required_error: 'ID is required', } ).optional(),
    dari          : z.string( { required_error: 'dari is required', } ).min( 1 ).max( 100 ),
    namaPengiriman: z.string( { required_error: 'namaPengiriman is required', } ).min( 1 ).max( 100 ),
    pesan         : z.string( { required_error: 'Pesan is required', } ).min( 1 ).max( 100 ),
    waktuKirim    : z.string( { required_error: 'waktuKirim is required', } ).min( 1 ).max( 100 ),
    pengirim      : z.string( { required_error: 'pengirim is required', } ).min( 1 ).max( 100 ),
    hpPengirim    : z.string( { required_error: 'hpPengirim is required', } ).min( 1 ).max( 100 ),
    penerima      : z.string( { required_error: 'penerima is required', } ).min( 1 ).max( 100 ),
    alamatPenerima: z.string( { required_error: 'alamatPenerima is required', } ).min( 1 ).max( 100 ),
    hpPenerima    : z.string( { required_error: 'hpPenerima is required', } ).min( 1 ).max( 100 ),
    guna          : z.string( { required_error: 'guna is required', } ).min( 1 ).max( 400 ),
    lokasi        : z.string( { required_error: 'lokasi is required', } ).min( 1 ).max( 100 ),
    typePembayaran: z.string( { required_error: 'typePembayaran is required', } ).min( 1 ).max( 100 ),
    status        : z.string( { required_error: 'status is required', } ).min( 1 ).max( 100 ),
    //
    ongkir        : z.number( { required_error: ' ongkir is required', } ).int().nonnegative(),
    totalBayar    : z.number( { required_error: ' totalBayar is required', } ).int().nonnegative(),
    totalPenjualan: z.number( { required_error: ' totalPenjualan is required', } ).int().nonnegative(),
    semuaProduct  : z.array( this.semuaProdukSchema )
  } )satisfies z.Schema<Omit<OrderanUpdate, 'semuaProduct'>>

}
export const UserSchemaZod = z.object( {
  name    : z.string().min( 1 ).max( 100 ),
  email   : z.string().min( 1 ).max( 100 ).email(),
  password: z.string().min( 1 ).max( 100 ),
} )



export const CreateUserSchemaZod = UserSchemaZod.merge(
  z.object( {
    confirmPassword: z.string().min( 1 ).max( 100 ),
  } ),
).refine( ( data ) => data.confirmPassword === data.password, {
  message: "Passwords don't match",
  path   : [ 'confirmPassword' ],
} )
export type TCreateUserZod = z.infer<typeof CreateUserSchemaZod>


export type TCREATEBANK = z.infer<typeof CreateZod.BankSchema>;
export type TCREATEDELIVER = z.infer<typeof CreateZod.DeliverySchema>;
export type TCREATEORDERAN = z.infer<typeof CreateZod.OrderanSchema>;
export type TCREATEPRODUCT = z.infer<typeof CreateZod.ProductSchema>;
export type TCREATEPRODUCTSEMUA = z.infer<typeof CreateZod.semuaProdukSchema>;


export type TUPDATEBANK = z.infer<typeof UpdateZod.BankSchema>;
export type TUPDATEDELIVER = z.infer<typeof UpdateZod.DeliverySchema>;
export type TUPDATEORDERAN = z.infer<typeof UpdateZod.OrderanSchema>;
export type TUPDATEPRODUCT = z.infer<typeof UpdateZod.ProductSchema>;

type SchemaType = 'BANK' | 'DELIVERY' | 'ORDERAN' | 'PRODUCT';

// Define schemas for creation and update
interface Schemas {
  ORDERAN: {
    CreateSchema: any; // Replace 'any' with the actual type of CreateZod.OrderanSchema
    UpdateSchema: any; // Replace 'any' with the actual type of UpdateZod.OrderanSchema
  };
  BANK: {
    CreateSchema: any; // Replace 'any' with the actual type of CreateZod.BankSchema
    UpdateSchema: any; // Replace 'any' with the actual type of UpdateZod.BankSchema
  };
  DELIVERY: {
    CreateSchema: any; // Replace 'any' with the actual type of CreateZod.DeliverySchema
    UpdateSchema: any; // Replace 'any' with the actual type of UpdateZod.DeliverySchema
  };
  PRODUCT: {
    CreateSchema: any; // Replace 'any' with the actual type of CreateZod.ProductSchema
    UpdateSchema: any; // Replace 'any' with the actual type of UpdateZod.ProductSchema
  };

}

export function getSchema<T extends SchemaType>(
  method: "POST" | "PUT",
  schema: T
): Schemas[T]['CreateSchema'] | Schemas[T]['UpdateSchema'] {
  if( schema === 'ORDERAN' ) {
    return method === 'POST'
           ? CreateZod.OrderanSchema
           : UpdateZod.OrderanSchema;
  }

  if( schema === 'BANK' ) {
    return method === 'POST'
           ? CreateZod.BankSchema
           : UpdateZod.BankSchema;
  }

  if( schema === 'DELIVERY' ) {
    return method === 'POST'
           ? CreateZod.DeliverySchema
           : UpdateZod.DeliverySchema;
  }

  if( schema === 'PRODUCT' ) {
    return method === 'POST'
           ? CreateZod.ProductSchema
           : UpdateZod.ProductSchema;
  }
}

export const schema = z.object( {
  email: z.string( { invalid_type_error: 'Invalid Email', } ).email().max( 80 ),
} )

export const changePasswordSchema = z.object(
  {
    email   : z.string( { invalid_type_error: 'Invalid Email', } ).email().max( 80 ),
    otp     : z.number( { invalid_type_error: 'Invalid Otp', } ).min( 6, 'number must be 6' ),
    password: z.string( { invalid_type_error: 'Invalid password', } ).max( 80 ),
    confPass: z.string( { invalid_type_error: 'Invalid confirmPass', } ).max( 80 ),
  }
).refine( ( arg ) => {
  const valid = arg.password == arg.confPass

  return valid
}, 'Password and Confirm Password must be same' )
