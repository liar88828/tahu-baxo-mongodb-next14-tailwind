import { formTravel } from '../../../assets/model';
import { jpgTextNotFound } from '../../../assets/default';

describe( 'pengujian halaman delivery', () => {
  beforeEach( () => {
    cy.visit( '/delivery/list?page=1&take=10' )
  } )

  it( "bisa melakukan beberapa aksi tombol pada page delivery", () => {
    // create button
    cy.get( '[data-test="popup-create_delivery"]' ).click()
    cy.wait( 500 )

    cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
      if( $el.text().includes( "Create" ) ) {
        cy.wait( 500 )
        cy.get( '[data-test="popup-Close"]' ).focused().click( { multiple: true, force: true } )
      }
    } )
    cy.wait( 500 )

    // update button
    cy.get( '[data-test="popup-update_delivery_gojek"]' ).click( { force: true } )
    cy.wait( 500 )

    cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
      if( $el.text().includes( "Edit" ) ) {
        cy.wait( 500 )
        cy.get( '[data-test="popup-Close"]' ).focused().click( { multiple: true, force: true } )
      }
    } )
    cy.wait( 500 )

    //--delete button
    cy.get( '[data-test="popup-delete_delivery_gojek"]' ).click( { force: true } )
    cy.wait( 500 )

    cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
      if( $el.text().includes( "Edit" ) ) {
        cy.wait( 500 )
        cy.get( '[data-test="popup-Close-button"]' ).focused().click( { multiple: true, force: true } )
      }
    } )
    cy.wait( 500 )
  } )

  it( "bisa membuat data di dalam form delivery", () => {
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( !$el.text().includes( "delivery create" ) ||
        !$el.text().includes( "delivery update" ) ) {

        cy.get( '[data-test="popup-create_delivery"]' ).click()
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Create" ) ||
            !$el.text().includes( "delivery create" ) ||
            !$el.text().includes( "delivery update" )
          ) {
            cy.contains( 'Create' )

            //form
            cy.get( `[data-test="${ formTravel.nama }_POST"]` ).type( "delivery create" )
            cy.get( `[data-test="${ formTravel.lokasi }_POST"]` ).type( "semarang" )
            cy.get( `[data-test="${ formTravel.jenis }_POST"]` ).type( "box" )
            cy.get( `[data-test="${ formTravel.hp }_POST"]` ).type( "01231231" )
            cy.get( `[data-test="${ formTravel.harga }_POST"]` ).type( "5000" )
            cy.get( `[data-test="${ formTravel.keterangan }_POST"]` ).type( "biasa di wilayah semarang" )
            cy.get( `[data-test="${ formTravel.img }_POST"]` ).type( jpgTextNotFound )

            // button
            cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
            cy.get( `[data-test="button-check"]` ).click( { multiple: true, force: true } )
            cy.get( `[data-test="img-prev"]` ).should( "exist" )
            cy.get( `[data-test="button-check"]` ).click( { multiple: true, force: true } )
            cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
            cy.get( `[data-test="button-submit_POST"]` ).click( { multiple: true, force: true } )

            cy.get( '[data-test="popup-Close_create_delivery"]' ).click( { multiple: true, force: true } )
          }
        } )
      }
    } )
  } )

  it( "bisa mengubah data di dalam form delivery", () => {
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( $el.text().includes( "delivery create" ) || !$el.text().includes( "delivery update" ) ) {

        cy.get( '[data-test="popup-update_delivery_delivery create"]' ).click( { force: true, multiple: true } )
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Edit" ) ||
            $el.text().includes( "delivery create" ) ||
            !$el.text().includes( "delivery update" )
          ) {
            cy.get( `[data-test="${ formTravel.nama }_delivery create"]` ).clear().type( "delivery update" )
            cy.get( `[data-test="${ formTravel.lokasi }_delivery create"]` ).clear().type( "semarang" )
            cy.get( `[data-test="${ formTravel.jenis }_delivery create"]` ).clear().type( "box" )
            cy.get( `[data-test="${ formTravel.hp }_delivery create"]` ).clear().type( "01231231" )
            cy.get( `[data-test="${ formTravel.harga }_delivery create"]` ).clear().type( "5000" )
            cy.get( `[data-test="${ formTravel.keterangan }_delivery create"]` )
              .clear()
              .type( "biasa di wilayah semarang" )
            // cy.wait( 500 )

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

  it( 'bisa menghapus data di dalam list delivery', () => {
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( $el.text().includes( "delivery create" ) ) {
        cy.get( '[data-test="popup-delete_delivery_delivery create"]' ).click()
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Delete" ) ) {
            cy.get( '[data-test="delete-delivery create"]' ).should( "exist" ).click()
          }
        } )
      }
      cy.wait( 500 )
    } )
  } )

  it( 'delete after create', () => {
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( $el.text().includes( "delivery update" ) ) {
        cy.get( '[data-test="popup-delete_delivery_delivery update"]' ).click()
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Delete" ) ) {
            cy.get( '[data-test="delete-delivery update"]' ).should( "exist" ).click()
          }
        } )
      }
      cy.wait( 500 )
    } )
  } )

  it.skip( "move links delivery", () => {
    cy.get( '[data-test="link-create"]' ).click()
    cy.url().should( 'include', '/delivery/create' )

    cy.get( '[data-test="link-list"]' ).click()
    cy.url().should( 'include', '/delivery/list?page=1&take=10' )
  } )

  it.skip( "create form", () => {
    cy.get( `[data-test="list-delivery"]` ).then( ( $el ) => {
        cy.wait( 500 )
        if( $el.text().includes( "update delivery" ) ) {
          cy.get( `[data-test="delete-update delivery"]` ).click()
          cy.wait( 500 )
        }
        else if( $el.text().includes( "delivery" ) ) {
          cy.get( `[data-test="delete-delivery baru"]` ).click()
          cy.wait( 500 )
        }
        else {
          // create again
          cy.get( '[data-test="link-create"]' ).click()
          cy.url().should( 'include', '/delivery/create' )
          cy.wait( 500 )

          cy.get( `[data-test="${ formTravel.nama }"]` ).type( "delivery baru" )
          cy.get( `[data-test="${ formTravel.lokasi }"]` ).type( "semarang" )
          cy.get( `[data-test="${ formTravel.jenis }"]` ).type( "box" )
          cy.get( `[data-test="${ formTravel.hp }"]` ).type( "01231231" )
          cy.get( `[data-test="${ formTravel.harga }"]` ).type( "5000" )
          cy.get( `[data-test="${ formTravel.keterangan }"]` ).type( "biasa di wilayah ungaran" )

          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-submit"]` ).click()
          cy.wait( 500 )
          //

          cy.url().should( 'include', '/delivery/list' )
          cy.get( `[data-test="list-delivery baru"]` ).should( "exist" )
          cy.wait( 500 )

          // if exist edit the list
          cy.get( `[data-test="edit-delivery baru"]` ).click()
          cy.url().should( 'include', '/delivery/edit' )

          cy.get( `[data-test="${ formTravel.nama }"]` ).type( "{home}" ).type( "update " )
          cy.get( `[data-test="${ formTravel.lokasi }"]` ).type( " update" )
          cy.get( `[data-test="${ formTravel.jenis }"]` ).type( " update" )
          cy.get( `[data-test="${ formTravel.hp }"]` ).type( "{backspace}" ).type( "9" )
          cy.get( `[data-test="${ formTravel.harga }"]` ).type( "{backspace}".repeat( 4 ) ).type( "5000" )
          cy.get( `[data-test="${ formTravel.keterangan }"]` ).type( "{home}" ).type( "update " )
          //
          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-submit"]` ).click()
          cy.wait( 500 )

          cy.url().should( 'include', '/delivery/list' )
          cy.get( `[data-test="list-update delivery baru"]` ).should( "exist" )
          //
          cy.get( `[data-test="delete-update delivery baru"]` ).click()
          cy.wait( 500 )
          cy.get( `[data-test="list-update delivery baru"]` ).should( "not.exist" )

        }

      }
    )
  } )

} )