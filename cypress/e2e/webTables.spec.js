const { wrap } = require("module")

describe('Web Tables tests', ()=>{

    it('Web Tebles', ()=>{
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1 Get the row by text
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '35')
        })

        // 2 Get row by indwx
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow =>{
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Tatiana')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Naumova')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableColomns =>{
            cy.wrap(tableColomns).eq(2).should('contain', "Tatiana")
            cy.wrap(tableColomns).eq(3).should('contain', "Naumova")
        })
    })
})