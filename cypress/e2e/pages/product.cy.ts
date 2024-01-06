import { formProduct } from '../../../assets/model';
import { jpgTextNotFound } from '../../../assets/default';

describe( 'template spec', () => {
  beforeEach( () => {
    cy.visit( '/product/list?page=1&take=10' )

    // cy.viewport( 550, 750 )

  } )

  it( "bisa melakukan beberapa aksi tombol pada page produk", () => {

    // button create
    cy.get( '[data-test="popup-create_product"]' ).click()
    cy.wait( 500 )

    cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
      if( $el.text().includes( "Create" ) ) {
        cy.wait( 500 )
        cy.get( '[data-test="popup-Close"]' ).focused().click( { multiple: true, force: true } )
      }
    } )
    cy.wait( 500 )

    // button update
    cy.get( '[data-test="popup-update_product_bakso"]' ).click( { force: true } )
    cy.wait( 500 )

    cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
      if( $el.text().includes( "Edit" ) ) {
        cy.wait( 500 )
        cy.get( '[data-test="popup-Close"]' ).focused().click( { multiple: true, force: true } )
      }
    } )
    cy.wait( 500 )

    //--delete button
    cy.get( '[data-test="popup-delete_product_bakso"]' ).click( { force: true } )
    cy.wait( 500 )

    cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
      if( $el.text().includes( "Edit" ) ) {
        cy.wait( 500 )
        cy.get( '[data-test="popup-Close-button"]' ).focused().click( { multiple: true, force: true } )
      }
    } )
    cy.wait( 500 )
  } )

  it( "bisa membuat data di dalam form produk", () => {
    cy.visit( '/product/list?page=1&take=10' )
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( !$el.text().includes( "product create" ) ||
        !$el.text().includes( "product update" )
      ) {

        cy.get( '[data-test="popup-create_product"]' ).click()
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Create" ) &&
            !$el.text().includes( "product update" ) ||
            !$el.text().includes( "product create" )
          ) {
            cy.contains( 'Create' )
            cy.get( '[data-test="iki div test"]' ).should( "exist" )
            //  form
            cy.get( `[data-test="${ formProduct.nama }_POST"]` ).type( "product create" )
            cy.get( `[data-test="${ formProduct.harga }_POST"]` ).type( "20000" )
            cy.get( `[data-test="${ formProduct.lokasi }_POST"]` ).type( "semarang" )
            cy.get( `[data-test="${ formProduct.jenis }_POST"]` ).type( "orderan" )
            cy.get( `[data-test="${ formProduct.keterangan }_POST"]` ).type( "biasa di wilayah semarang" )
            cy.get( `[data-test="${ formProduct.img }_POST"]` ).clear().type( jpgTextNotFound )
            //  button
            cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
            cy.get( `[data-test="button-check"]` ).click( { multiple: true, force: true } )
            cy.get( `[data-test="img-prev"]` ).should( "exist" )
            cy.get( `[data-test="button-check"]` ).click( { multiple: true, force: true } )
            cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
            cy.get( `[data-test="button-submit_POST"]` ).click( { multiple: true, force: true } )

            cy.get( '[data-test="popup-Close_create_product"]' ).click( { multiple: true, force: true } )
          }
        } )
      }
    } )
  } )

  it( "bisa mengubah data di dalam form produk", () => {
    cy.visit( '/product/list?page=1&take=10' )
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( $el.text().includes( "product create" ) ||
        !$el.text().includes( "product update" )
      ) {

        cy.get( '[data-test="popup-update_product_product create"]' ).click( { force: true, multiple: true } )
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Edit" ) &&
            !$el.text().includes( "product update" ) ||
            $el.text().includes( "product create" )
          ) {
            //  form
            cy.get( `[data-test="${ formProduct.nama }_product create"]` ).clear().type( "product update" )
            cy.get( `[data-test="${ formProduct.harga }_product create"]` ).clear().type( "20000" )
            cy.get( `[data-test="${ formProduct.lokasi }_product create"]` ).clear().type( "semarang" )
            cy.get( `[data-test="${ formProduct.jenis }_product create"]` ).clear().type( "orderan" )
            cy.get( `[data-test="${ formProduct.keterangan }_product create"]` ).clear()
              .type( "biasa di wilayah semarang" )
            cy.get( `[data-test="${ formProduct.img }_product create"]` ).clear().type( jpgTextNotFound )
            //  button
            cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
            cy.get( `[data-test="button-check"]` ).click( { multiple: true, force: true } )
            cy.get( `[data-test="img-prev"]` ).should( "exist" )
            cy.get( `[data-test="button-check"]` ).click( { multiple: true, force: true } )
            cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
            cy.get( `[data-test="button-submit_PUT"]` ).click( { multiple: true, force: true } )

          }
        } )
      }
    } )
  } )

  it( 'bisa menghapus data di dalam list produk', () => {
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( $el.text().includes( "product update" ) ) {
        cy.get( '[data-test="popup-delete_product_product update"]' ).click()
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Delete" ) ) {
            cy.get( '[data-test="delete-product update"]' ).should( "exist" ).click()
          }
        } )
      }
      cy.wait( 500 )
    } )
  } )

  it( 'delete before action', () => {
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( $el.text().includes( "product create" ) ) {
        cy.get( '[data-test="popup-delete_product_product create"]' ).click()
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Delete" ) ) {
            cy.get( '[data-test="delete-product create"]' ).should( "exist" ).click()
          }
        } )
      }
      cy.wait( 500 )
    } )
  } )

  it.skip( "create form", () => {
    cy.get( `[data-test="list-product"]` ).then( ( $el ) => {
        cy.wait( 500 )
      if( $el.text().includes( "product update" ) ) {
          cy.get( `[data-test="delete-update product"]` ).click()
          cy.wait( 500 )
        }
        else if( $el.text().includes( "product" ) ) {
          cy.get( `[data-test="delete-product baru"]` ).click()
          cy.wait( 500 )
        }
        else {
          // create again
          cy.get( '[data-test="link-create"]' ).click()
          cy.url().should( 'include', '/product/create' )
          cy.wait( 500 )

          cy.get( `[data-test="${ formProduct.nama }"]` ).type( "product baru" )
          cy.get( `[data-test="${ formProduct.harga }"]` ).type( "{backspace}" ).type( "20000" )
          cy.get( `[data-test="${ formProduct.lokasi }"]` ).type( "semarang" )
          cy.get( `[data-test="${ formProduct.jenis }"]` ).type( "orderan" )
          cy.get( `[data-test="${ formProduct.keterangan }"]` ).type( "biasa di wilayah ungaran" )

          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-submit"]` ).click()
          cy.wait( 500 )

          cy.url().should( 'include', '/product/list' )
          cy.get( `[data-test="list-product baru"]` ).should( "exist" )
          cy.wait( 500 )

          // if exist edit the list
          cy.get( `[data-test="edit-product baru"]` ).click()
          cy.url().should( 'include', '/product/edit' )
          //
          cy.get( `[data-test="${ formProduct.nama }"]` ).type( "{home}" ).type( "update " )
          cy.get( `[data-test="${ formProduct.jenis }"]` ).type( " update" )
          cy.get( `[data-test="${ formProduct.lokasi }"]` ).type( " update" )
          cy.get( `[data-test="${ formProduct.harga }"]` ).type( "{backspace}".repeat( 4 ) ).type( "5000" )
          cy.get( `[data-test="${ formProduct.keterangan }"]` ).type( "{home}" ).type( "update " )
          // //
          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-submit"]` ).click()
          cy.wait( 500 )
          //
          cy.url().should( 'include', '/product/list' )
          cy.get( `[data-test="list-update product baru"]` ).should( "exist" )
          // //
          cy.get( `[data-test="delete-update product baru"]` ).click()
          cy.wait( 500 )
          cy.get( `[data-test="list-update product baru"]` ).should( "not.exist" )

        }

      }
    )
  } )

} )