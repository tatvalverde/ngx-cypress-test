/// <reference types="cypress" />

const { wrap } = require("module")

describe('Date picker tests', ()=>{

    it('Date picker', ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        let date = new Date()
        date.setDate(date.getDate() + 10)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
        let futureYear = date.getFullYear()
        let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input =>{
            cy.wrap(input).click()

            function selectDayFromCurrent(){
                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                    if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                        cy.get('[data-name="chevron-right"]').click()
                        selectDayFromCurrent()
                    } else {
                        cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                    }
                })
            }
            selectDayFromCurrent()
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })

    })

})