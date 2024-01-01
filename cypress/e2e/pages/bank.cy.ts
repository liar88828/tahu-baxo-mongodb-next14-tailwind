import { formBank } from '../../../assets/model';
import { jpgTextNotFound } from '../../../assets/default';

describe( 'template spec', () => {
  beforeEach( () => {
    cy.visit( '/bank/list?page=1&take=1' )

  } )

  it( "move links", () => {

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

    // cy.get( '[data-test="popup-Create"]' ).click()

    // cy.url().should( 'include', '/bank/create' )

    // cy.get( '[data-test="link-list"]' ).click()
    // cy.url().should( 'include', '/bank/list?page=1&take=10' )
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