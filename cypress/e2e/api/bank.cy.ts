import { TCREATEBANK, TUPDATEBANK } from '../../../lib/validator/zod';

describe( 'BANK spec', () => {

  describe( 'CREATE Bank', () => {

    it( "bisa melakukan membuat data orderan dengan method POST", () => {
      cy.request(
        'POST',
        'http://localhost:3000/api/bank', {
          "id"        : "test_1",
          "hp"        : "test1",
          "no"        : "asdasdas",
          "nama"      : "mandiri",
          "lokasi"    : "Semrang",
          "keterangan": "orak jelas",
          "img"       : "https://logowik.com/content/uploads/images/cash2548.jpg",
          "jenis"     : "Kredit"
        } as TCREATEBANK
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
          url             : 'http://localhost:3000/api/bank',
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

  describe( 'FIND Bank', () => {

    it( "bisa melakukan mengambil data orderan menggunakan method GET", () => {
      cy.request( 'http://localhost:3000/api/bank?id=all' )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "bisa melakukan mengambil data orderan menggunakan method GET dengan id", () => {
      cy.request( 'http://localhost:3000/api/bank?id=test_1' )
        .then( ( response ) => {

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
        url             : 'http://localhost:3000/api/bank?id=',
        failOnStatusCode: false,
      } )
        .then( ( response ) => {

          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'msg', 'Error GET' )
        } )
    } )

  } )

  describe( 'EDIT Bank', () => {

    it( "bisa melakukan mengedit data orderan menggunakan method PUT", () => {
      cy.request(
        'PUT',
        'http://localhost:3000/api/bank?id=test_1', {
          "id"        : "test_1",
          "hp"        : "test1",
          "no"        : "asdasdas",
          "nama"      : "mandiri",
          "lokasi"    : "Semrang",
          "keterangan": "orak jelas",
          "img"       : "https://logowik.com/content/uploads/images/cash2548.jpg",
          "jenis"     : "Kredit"
        } as TUPDATEBANK
      )
        .then( ( response ) => {

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
          url             : 'http://localhost:3000/api/bank?id=test_1',
          failOnStatusCode: false,
          body            : { nama: "tahu baxo" },
        }
      )
        .then( ( response ) => {
          // cy.log( response.body )
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
          url             : 'http://localhost:3000/api/bank?id=',
          failOnStatusCode: false,
          body            : { nama: "tahu baxo" },
        }
      )
        .then( ( response ) => {

          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'msg', 'Error PUT' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'error' )
          expect( response.body ).to.have.property( 'data' )

        } )
    } )
  } )

  describe( 'DELETE Bank', () => {

    it( "bisa melakukan menghapus data orderan menggunakan method DELETE", () => {
      cy.request(
        {
          method: 'DELETE',
          url   : 'http://localhost:3000/api/bank?id=test_1',
          body: {},
        }
      )
        .then( ( response ) => {

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
          url             : 'http://localhost:3000/api/bank?id=',
          failOnStatusCode: false,
          body            : {}
          ,

        }
      )
        .then( ( response ) => {

          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'msg', 'Error DELETE' )

        } )
    } )

  } )

} )