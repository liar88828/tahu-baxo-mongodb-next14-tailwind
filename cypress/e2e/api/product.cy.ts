import { TCREATEPRODUCT } from '../../../lib/validator/zod';

describe( 'PRODUCT spec', () => {

  describe( 'CREATE Product', () => {

    it( "bisa melakukan membuat data produk dengan method POST", () => {
      cy.request(
        'POST',
        'http://localhost:3000/api/product', {
          "id"        : `test_1`,
          "harga"     : 20000,
          "img"       : "tidak ada",
          "jenis"     : "orderan",
          "jumlah"    : 86,
          "keterangan": "Pedas",
          "lokasi"    : "Semarang",
          "nama"      : "tahu baxo"
        } as TCREATEPRODUCT
      )
        .then( ( response ) => {
          // cy.log( response.body )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success POST' )

        } )
    } )

    it( "tidak bisa membuat data karena data produk kosong", () => {
      cy.request( {
          method          : 'POST',
          url             : 'http://localhost:3000/api/product',
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

  describe( 'FIND Product', () => {

    it( "bisa melakukan mengambil data produk menggunakan method GET", () => {
      cy.request( 'http://localhost:3000/api/product?id=all' )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "bisa melakukan mengambil data produk menggunakan method GET dengan id", () => {
      cy.request( 'http://localhost:3000/api/product?id=test_1' )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "tidak bisa mengambil data produk menggunakan method GET karena id kosong", () => {
      cy.request( {
        method          : 'GET',
        url             : 'http://localhost:3000/api/product?id=',
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

  describe( 'EDIT Product', () => {

    it( "bisa melakukan mengedit data produk menggunakan method PUT", () => {
      cy.request(
        'PUT',
        'http://localhost:3000/api/product?id=test_1', {
          "harga"     : 20000,
          "img"       : "tidak ada ",
          "jenis"     : "orderan",
          "jumlah"    : 86,
          "keterangan": "Pedas",
          "lokasi"    : "Semarang",
          "nama"      : "tahu baxo update"
        }
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

    it( "tidak bisa mengedit data produk karena data kosong", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/product?id=test_1',
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

    it( "tidak bisa mengedit data produk karena id dan data kosong", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/product?id=',
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

  describe( 'DELETE PRODUCTS', () => {

    it( "bisa melakukan menghapus data produk menggunakan method DELETE", () => {
      cy.request(
        {
          method: 'DELETE',
          url   : 'http://localhost:3000/api/product?id=test_1',
          body  : {}
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

    it( "tidak bisa melakukan menghapus data produk karena id kosong", () => {
      cy.request(
        {
          method          : 'DELETE',
          url             : 'http://localhost:3000/api/product?id=',
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
