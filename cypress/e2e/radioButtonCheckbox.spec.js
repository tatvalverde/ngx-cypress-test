const { wrap } = require("module")

describe('Radio button and checkboxes', ()=>{

    it('Radio buttons', ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons =>{
            cy.wrap(radioButtons).eq(0).check({force:true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force:true}) // we use {force:true} when elements hidden or invisible }
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
    })

    it('Checkboxes', ()=>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({force:true}) // will check all unchecked buttons
        cy.get('[type="checkbox"]').uncheck({force:true}) // will unchecked all checked buttons

        cy.get('[type="checkbox"]').eq(0).click({force:true}) // clicks on checkbox


    })
})