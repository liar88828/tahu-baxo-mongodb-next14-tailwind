import { formBank } from '../../../assets/model';
import { jpgTextNotFound } from '../../../assets/default';

describe( 'template spec', () => {
  beforeEach( () => {
    cy.visit( '/bank/list?page=1&take=10' )
  } )

  it( "click bank", () => {

// create button
    cy.get( '[data-test="popup-create_bank"]' ).click()
    cy.wait( 500 )

    cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
      if( $el.text().includes( "Create" ) ) {
        cy.wait( 500 )
        cy.get( '[data-test="popup-Close"]' ).focused().click( { multiple: true, force: true } )
      }
    } )
    cy.wait( 500 )

    // update bank
    cy.get( '[data-test="popup-update_bank_potoshop"]' ).click( { force: true } )
    cy.wait( 500 )

    cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
      if( $el.text().includes( "Edit" ) ) {
        cy.wait( 500 )
        cy.get( '[data-test="popup-Close"]' ).focused().click( { multiple: true, force: true } )
      }
    } )
    cy.wait( 500 )

    //--delete button
    cy.get( '[data-test="popup-delete_bank_potoshop"]' ).click( { force: true } )
    cy.wait( 500 )

    cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
      if( $el.text().includes( "Edit" ) ) {
        cy.wait( 500 )
        cy.get( '[data-test="popup-Close-button"]' ).focused().click( { multiple: true, force: true } )
      }
    } )
    cy.wait( 500 )
  } )

  it( "Create action bank", () => {
    cy.visit( '/bank/list?page=1&take=10' )
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( !$el.text().includes( "bank create" ) ) {

        cy.get( '[data-test="popup-create_bank"]' ).click()
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Create" ) ) {
            cy.contains( 'Create' )
            cy.get( '[data-test="iki div test"]' ).should( "exist" )
            // create form
            cy.get( `[data-test="${ formBank.nama }_POST"]` ).type( "bank create" )
            cy.get( `[data-test="${ formBank.lokasi }_POST"]` ).type( "semarang" )
            cy.get( `[data-test="${ formBank.jenis }_POST"]` ).type( "persero" )
            cy.get( `[data-test="${ formBank.hp }_POST"]` ).type( "01231231" )
            cy.get( `[data-test="${ formBank.no }_POST"]` ).type( "012-310-12312" )
            cy.get( `[data-test="${ formBank.keterangan }_POST"]` ).type( "biasa di wilayah semarang" )
            cy.get( `[data-test="${ formBank.img }_POST"]` ).clear().type( jpgTextNotFound )
            //
            // cy.wait( 500 )
            cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
            cy.get( `[data-test="button-check"]` ).click( { multiple: true, force: true } )
            cy.get( `[data-test="img-prev"]` ).should( "exist" )
            cy.get( `[data-test="button-check"]` ).click( { multiple: true, force: true } )
            cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
            cy.get( `[data-test="button-submit_POST"]` ).click( { multiple: true, force: true } )

            cy.get( '[data-test="popup-Close_create_bank"]' ).click( { multiple: true, force: true } )
          }
        } )
      }
    } )
  } )

  it( "Update action bank", () => {
    cy.visit( '/bank/list?page=1&take=10' )
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( $el.text().includes( "bank create" ) || !$el.text().includes( "bank update" ) ) {

        cy.get( '[data-test="popup-update_bank_bank create"]' ).click( { force: true, multiple: true } )
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Edit" ) ) {
            cy.get( `[data-test="${ formBank.nama }_bank create"]` ).clear().type( "bank update" )
            cy.get( `[data-test="${ formBank.lokasi }_bank create"]` ).clear().type( "ungaran" )
            cy.get( `[data-test="${ formBank.jenis }_bank create"]` ).clear().type( "titl" )
            cy.get( `[data-test="${ formBank.hp }_bank create"]` ).clear().type( "0129999" )
            cy.get( `[data-test="${ formBank.no }_bank create"]` ).clear().type( "012-310-0000" )
            cy.get( `[data-test="${ formBank.keterangan }_bank create"]` ).clear().type( "biasa di wilayah ungaran" )
            cy.get( `[data-test="${ formBank.img }_bank create"]` ).clear().type( jpgTextNotFound )
            // cy.wait( 500 )

            cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
            cy.get( `[data-test="button-check"]` ).click( { multiple: true, force: true } )
            cy.get( `[data-test="img-prev"]` ).should( "exist" )
            cy.get( `[data-test="button-check"]` ).click( { multiple: true, force: true } )
            cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
            cy.get( `[data-test="button-submit_PUT"]` ).click( { multiple: true, force: true } )

            // cy.get( '[data-test="popup-Close_bank_PUT"]' ).click( { multiple: true, force: true } )
          }
        } )
      }
    } )
  } )

  it( 'delete after action', () => {
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( $el.text().includes( "bank update" ) ) {
        cy.get( '[data-test="popup-delete_bank_bank update"]' ).click()
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Delete" ) ) {
            cy.get( '[data-test="delete-bank update"]' ).should( "exist" ).click()
          }
        } )
      }
      cy.wait( 500 )
    } )
  } )

  it( 'delete before action', () => {
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {
      if( $el.text().includes( "bank create" ) ) {
        cy.get( '[data-test="popup-delete_bank_bank create"]' ).click()
        cy.get( `[data-test="popup-modal"]` ).then( ( $el ) => {
          if( $el.text().includes( "Delete" ) ) {
            cy.get( '[data-test="delete-bank create"]' ).should( "exist" ).click()
          }
        } )
      }
      cy.wait( 500 )
    } )
  } )

  it.skip( "create form", () => {
    cy.get( `[data-test="list-bank"]` ).then( ( $el ) => {

        if( $el.text().includes( "update mandiri ku ya" ) ) {
          cy.get( `[data-test="delete-update mandiri ku ya"]` ).click()
          cy.wait( 500 )
          cy.get( `[data-test="list-update mandiri ku ya"]` ).should( "not.exist" )
        }

        if( $el.text().includes( "mandiri ku ya" ) ) {
          cy.get( `[data-test="delete-mandiri ku ya"]` ).click()
          cy.wait( 500 )
          cy.get( `[data-test="list-mandiri ku ya"]` ).should( "not.exist" )
        }
        else {
          // create again
          cy.get( '[data-test="link-create"]' ).click()
          cy.url().should( 'include', '/bank/create' )
          cy.get( `[data-test="${ formBank.nama }"]` ).type( "mandiri ku ya" )
          cy.get( `[data-test="${ formBank.lokasi }"]` ).type( "semarang" )
          cy.get( `[data-test="${ formBank.jenis }"]` ).type( "utang" )
          cy.get( `[data-test="${ formBank.hp }"]` ).type( "01231231" )
          cy.get( `[data-test="${ formBank.no }"]` ).type( "0123112312" )
          cy.get( `[data-test="${ formBank.keterangan }"]` ).type( "biasa di wilayah unganran" )
          cy.get( `[data-test="${ formBank.img }"]` ).type( jpgTextNotFound )

          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-check"]` ).click()
          cy.get( `[data-test="img-prev"]` ).should( "exist" )
          cy.get( `[data-test="button-check"]` ).click()
          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-submit"]` ).click()
          cy.wait( 500 )

          cy.url().should( 'include', '/bank/list' )
          cy.get( `[data-test="list-mandiri ku ya"]` ).should( "exist" )

          // if exist edit the list
          cy.get( `[data-test="edit-mandiri ku ya"]` ).click( { multiple: true } )
          cy.url().should( 'include', '/bank/edit' )
          cy.get( `[data-test="${ formBank.nama }"]` ).type( "{home}" ).type( "update ", )
          cy.get( `[data-test="${ formBank.lokasi }"]` ).type( "{backspace}" ).type( " update" )
          cy.get( `[data-test="${ formBank.jenis }"]` ).type( "{backspace}" ).type( " update" )
          cy.get( `[data-test="${ formBank.hp }"]` ).type( "{backspace}" ).type( "9" )
          cy.get( `[data-test="${ formBank.no }"]` ).type( "{backspace}" ).type( "9" )
          cy.get( `[data-test="${ formBank.keterangan }"]` ).type( "{home}" ).type( "update " )
          // cy.get( `[data-test="${ formBank.img }"]` ).type( jpgTextNotFound )

          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-check"]` ).click()
          cy.get( `[data-test="img-prev"]` ).should( "exist" )
          cy.get( `[data-test="button-check"]` ).click()
          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-submit"]` ).click()
          cy.url().should( 'include', '/bank/list' )
          cy.get( `[data-test="list-update mandiri ku ya"]` ).should( "exist" )

          cy.get( `[data-test="delete-update mandiri ku ya"]` ).click( { multiple: true } )
          cy.wait( 500 )
          cy.get( `[data-test="list-update mandiri ku ya"]` ).should( "not.exist" )

        }

      }
    )
  } )

} )