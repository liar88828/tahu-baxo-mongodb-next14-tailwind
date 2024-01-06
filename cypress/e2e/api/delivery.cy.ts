import { TCREATEDELIVER, TUPDATEDELIVER } from '../../../lib/validator/zod';

describe( 'DELIVERY spec', () => {

  describe( 'CREATE DELIVERY', () => {

    it( "bisa melakukan membuat data delivery dengan method POST", () => {
      cy.request(
        'POST',
        'http://localhost:3000/api/delivery', {
          "id"        : "test_1",
          "nama"      : "kosong",
          "hp"        : "kosong",
          "lokasi"    : "kosong",
          "jenis"     : "kosong",
          "harga"     : 0,
          "img"       : "kosong",
          "keterangan": "kosong"
        } as TCREATEDELIVER
      )
        .then( ( response ) => {
          // cy.log( response.body )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success POST' )

        } )
    } )

    it( "tidak bisa membuat data  delivery karena data kosong", () => {
      cy.request( {
          method          : 'POST',
          url             : 'http://localhost:3000/api/delivery',
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

  describe( 'FIND DELIVERY', () => {

    it( "bisa melakukan mengambil data delivery menggunakan method GET ", () => {
      cy.request( 'http://localhost:3000/api/delivery?id=all' )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "bisa melakukan mengambil data delivery menggunakan method GET dengan id", () => {
      cy.request( 'http://localhost:3000/api/delivery?id=test_1' )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "tidak bisa mengambil data delivery menggunakan method GET karena id kosong", () => {
      cy.request( {
        method          : 'GET',
        url             : 'http://localhost:3000/api/delivery?id=',
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

  describe( 'EDIT DELIVERY', () => {

    it( "bisa melakukan mengedit data delivery menggunakan method PUT", () => {
      cy.request(
        'PUT',
        'http://localhost:3000/api/delivery?id=test_1', {
          "id"        : "test_1",
          "nama"      : "kosong",
          "hp"        : "kosong",
          "lokasi"    : "kosong",
          "jenis"     : "kosong",
          "harga"     : 0,
          "img"       : "kosong",
          "keterangan": "kosong"
        } as TUPDATEDELIVER
      )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success PUT' )
        } )
    } )

    it( "tidak bisa mengedit data delivery karena data kosong", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/delivery?id=test_1',
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

    it( "tidak bisa mengedit data delivery karena id dan data kosong", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/delivery?id=',
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

  describe( 'DELETE DELIVERY', () => {

    it( "bisa melakukan menghapus data delivery menggunakan method DELETE", () => {
      cy.request(
        {
          method: 'DELETE',
          url   : 'http://localhost:3000/api/delivery?id=test_1',
          body  : {}
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

    it( "tidak bisa melakukan menghapus data delivery karena id kosong", () => {
      cy.request(
        {
          method          : 'DELETE',
          url             : 'http://localhost:3000/api/delivery?id=',
          failOnStatusCode: false,
          body            : {}
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
