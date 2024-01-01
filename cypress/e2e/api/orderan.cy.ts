import { TCREATEORDERAN } from '@/lib/validation/zod/createZod';
import { TUPDATEORDERAN } from '@/lib/validation/zod/updateZod';

describe( 'ORDERAN spec', () => {

  describe( 'method CREATE ORDERAN', () => {

    it( "POST ORDERAN success", () => {
      cy.request(
        'POST',
        'http://localhost:3000/api/orderan',


        {
          "id": "test_1",
          "dari": "tokopedia ku lagi 23",
          "pengirim": "kosong",
          "hpPengirim": "123",
          "penerima": "kosong",
          "alamatPenerima": "kosong",
          "hpPenerima": "12",
          "pesan": "2023-12-12T00:00:00.000Z",
          "waktuKirim": "2023-12-12T00:00:00.000Z",
          "guna": "kosong",
          "lokasi": "kosong",
          "namaPengiriman": "kosong",
          "ongkir": 0,
          "typePembayaran": "kosong",
          "totalBayar": 0,
          "totalPenjualan": 0,
          "status": "Kirim",
          "semuaProduct": [
            {
              "harga": 3681802,
              "jenis": "string",
              "jumlah": 10,
              "lokasi": "string",
              "nama": "string",
              "img": "dasda",
              "orderanId" : "test_1"
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

    it( "POST ORDERAN fail because data can't be empty", () => {
      cy.request( {
          method          : 'POST',
          url             : 'http://localhost:3000/api/orderan',
          failOnStatusCode: false,
          body            : { nama: "tahu baxo" },
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

    it( "GET ORDERAN success", () => {
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

    it( "GET ORDERAN by id success", () => {
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

    it( "GET Orderan be error because empty id", () => {
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
    it( "UPDATE ORDERAN success", () => {
      cy.request(
        'PUT',
        'http://localhost:3000/api/orderan?id=test_1',
        {
          "id": "test_1",
          "dari": "tokopedia update",
          "pengirim": "kosong",
          "hpPengirim": "123",
          "penerima": "kosong",
          "alamatPenerima": "kosong",
          "hpPenerima": "12",
          "pesan": "2023-12-12T00:00:00.000Z",
          "waktuKirim": "2023-12-12T00:00:00.000Z",
          "guna": "kosong",
          "lokasi": "kosong",
          "namaPengiriman": "kosong",
          "ongkir": 0,
          "typePembayaran": "kosong",
          "totalBayar": 0,
          "totalPenjualan": 0,
          "status": "Kirim",
          "semuaProduct": [
            {
              "harga": 3681802,
              "jenis": "string",
              "jumlah": 10,
              "lokasi": "string",
              "nama": "string",
              "img": "dasda",
              "orderanId" : "test_1"
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

    it( "EDIT ORDERAN fail because data can't be empty", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/orderan?id=test_1',
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

    it( "EDIT ORDERAN fail because data can't be empty id", () => {
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

    it( "DELETE Orderan", () => {
      cy.request(
        {
          method: 'DELETE',
          url   : 'http://localhost:3000/api/orderan?id=test_1',
          body  : ['test_1']
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

    it( "DELETE Orderan error because data can't be empty id", () => {
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
