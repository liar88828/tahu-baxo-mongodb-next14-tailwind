import { formTravel } from '../../../assets/model';

describe( 'template spec', () => {
  beforeEach( () => {
    cy.visit( '/delivery/list?page=1&take=10' )
  } )

  it( "click delivery", () => {
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