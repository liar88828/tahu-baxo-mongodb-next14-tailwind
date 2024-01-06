import { TCREATEORDERAN, TUPDATEORDERAN } from '../../../lib/validator/zod';

describe( 'ORDERAN spec', () => {

  describe( 'POST ORDERAN', () => {

    it( "bisa melakukan membuat data orderan dengan method POST", () => {
      cy.request(
        'POST',
        'http://localhost:3000/api/orderan',

        {
          "id"          : "test_1",
          "dari"        : "tokopedia ku lagi 23",
          "pengirim"    : "kosong",
          "hpPengirim"  : "123",
          "penerima"    : "kosong",
          "alamatPenerima": "kosong",
          "hpPenerima"  : "12",
          "pesan"       : "2023-12-12T00:00:00.000Z",
          "waktuKirim"  : "2023-12-12T00:00:00.000Z",
          "guna"        : "kosong",
          "lokasi"      : "kosong",
          "namaPengiriman": "kosong",
          "ongkir"      : 0,
          "typePembayaran": "kosong",
          "totalBayar"  : 0,
          "totalPenjualan": 0,
          "status"      : "Kirim",
          "semuaProduct": [
            {
              "harga": 3681802,
              "jenis": "string",
              "jumlah": 10,
              "lokasi": "string",
              "nama" : "string",
              "img"  : "dasda",
              // "orderanId" : "test_1"
            }
          ]
        } as TCREATEORDERAN
      )
        .then( ( response ) => {
          // cy.log( response.body )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success POST' )

        } )
    } )

    it( "tidak bisa membuat data karena data orderan kosong", () => {
      cy.request( {
          method          : 'POST',
          url             : 'http://localhost:3000/api/orderan',
          failOnStatusCode: false,
        body: {},
        }
      )
        .then( ( response ) => {
          // cy.log( response.body )
          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'msg', 'Error POST' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'error' )
          expect( response.body ).to.have.property( 'data' )

        } )
    } )

  } )

  describe( 'Method GET ORDERAN', () => {

    it( "bisa melakukan mengambil data orderan menggunakan method GET ", () => {
      cy.request( 'http://localhost:3000/api/orderan?id=all&option=table' )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "bisa melakukan mengambil data orderan menggunakan method GET dengan id ", () => {
      cy.request( 'http://localhost:3000/api/orderan?id=test_1' )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "tidak bisa mengambil data orderan menggunakan method GET karena id kosong", () => {
      cy.request( {
        method          : 'GET',
        url             : 'http://localhost:3000/api/orderan?id=',
        failOnStatusCode: false,
      } )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'msg', 'Error GET' )
        } )
    } )

  } )

  describe( 'method EDIT ORDERAN', () => {

    it( "bisa melakukan mengedit data orderan menggunakan method PUT", () => {
      cy.request(
        'PUT',
        'http://localhost:3000/api/orderan?id=test_1',
        {
          "id"          : "test_1",
          "dari"        : "tokopedia update",
          "pengirim"    : "kosong",
          "hpPengirim"  : "123",
          "penerima"    : "kosong",
          "alamatPenerima": "kosong",
          "hpPenerima"  : "12",
          "pesan"       : "2023-12-12T00:00:00.000Z",
          "waktuKirim"  : "2023-12-12T00:00:00.000Z",
          "guna"        : "kosong",
          "lokasi"      : "kosong",
          "namaPengiriman": "kosong",
          "ongkir"      : 0,
          "typePembayaran": "kosong",
          "totalBayar"  : 0,
          "totalPenjualan": 0,
          "status"      : "Kirim",
          "semuaProduct": [
            {
              "harga": 3681802,
              "jenis": "string",
              "jumlah": 10,
              "lokasi": "string",
              "nama" : "string",
              "img"  : "dasda",
              // "orderanId" : "test_1"
            }
          ]
        } as TUPDATEORDERAN
      )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success PUT' )
        } )
    } )

    it( "tidak bisa mengedit data orderan karena data kosong", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/orderan?id=test_1',
          failOnStatusCode: false,
          body: {},
        }
      )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'msg', 'Error PUT' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'error' )
          expect( response.body ).to.have.property( 'data' )

        } )
    } )

    it( "tidak bisa mengedit data orderan karena id dan data kosong", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/orderan?id=',
          failOnStatusCode: false,
          body            : { nama: "tahu baxo" },
        }
      )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'msg', 'Error PUT' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'error' )
          expect( response.body ).to.have.property( 'data' )

        } )
    } )
  } )

  describe( 'DELETE ORDERAN', () => {

    it( "bisa melakukan menghapus data orderan menggunakan method DELETE ", () => {
      cy.request(
        {
          method: 'DELETE',
          url   : 'http://localhost:3000/api/orderan?id=test_1',
          body: [ 'test_1' ]
        }
      )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success DELETE' )

        } )
    } )

    it( "tidak bisa melakukan menghapus data orderan karena id kosong", () => {
      cy.request(
        {
          method          : 'DELETE',
          url             : 'http://localhost:3000/api/orderan?id=',
          failOnStatusCode: false,
          body            : {}
        }
      )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'msg', 'Error DELETE' )

        } )
    } )

  } )

} )
