import TicketService from "pairtest/TicketService.js";

describe('account id', () => {
    test('correct account id submits payment and seat reservation succesfully', () => {
        const ticketArrayObject = [{type: 'ADULT', noOfTickets: 1}, {type: 'CHILD', noOfTickets: 0}, {type: 'INFANT', noOfTickets: 0}]

        const ticketService = new TicketService()
        const ticketRequest = ticketService.purchaseTickets(2, ticketArrayObject)

        expect(ticketRequest).toBe(true)
    })

    test('string account id throws InvalidPurchaseException with correct error message', () => {
        const ticketArrayObject = [{type: 'ADULT', noOfTickets: 1}, {type: 'CHILD', noOfTickets: 0}, {type: 'INFANT', noOfTickets: 0}]
        
        expect(() => {
            const ticketService = new TicketService()
            ticketService.purchaseTickets('2', ticketArrayObject)
        }).toThrow('Account Number needs to be a valid number and greater than 0');
    })

    test('account id less than 1 throws InvalidPurchaseException with correct error message', () => {
        const ticketArrayObject = [{type: 'ADULT', noOfTickets: 1}, {type: 'CHILD', noOfTickets: 0}, {type: 'INFANT', noOfTickets: 0}]
        
        expect(() => {
            const ticketService = new TicketService()
            ticketService.purchaseTickets(0, ticketArrayObject)
        }).toThrow('Account Number needs to be a valid number and greater than 0');
    })
})

describe('setTicketTypes', () => {
    test('create ticket request with incorrect adult type throws error with correct message', () => {
        const ticketArrayObject = [{type: 'ADULt', noOfTickets: 1}, {type: 'CHILD', noOfTickets: 4}, {type: 'INFANT', noOfTickets: 1}]
        
        expect(() => {
            const ticketService = new TicketService()
            ticketService.purchaseTickets(2, ticketArrayObject)
        }).toThrow('type must be ADULT, CHILD, or INFANT');
    })

    test('create ticket request with incorrect adult type throws error with correct message', () => {
        const ticketArrayObject = [{type: 'ADULT', noOfTickets: 1}, {type: 'CHILd', noOfTickets: 4}, {type: 'INFANT', noOfTickets: 1}]
        
        expect(() => {
            const ticketService = new TicketService()
            ticketService.purchaseTickets(2, ticketArrayObject)
        }).toThrow('type must be ADULT, CHILD, or INFANT');
    })

    test('create ticket request with incorrect adult type throws error with correct message', () => {
        const ticketArrayObject = [{type: 'ADULT', noOfTickets: 1}, {type: 'CHILD', noOfTickets: 4}, {type: 'INFANt', noOfTickets: 1}]
        
        expect(() => {
            const ticketService = new TicketService()
            ticketService.purchaseTickets(2, ticketArrayObject)
        }).toThrow('type must be ADULT, CHILD, or INFANT');
    })

    test('create ticket request with noOfTickets as string type throws error with correct message', () => {
        const ticketArrayObject = [{type: 'ADULT', noOfTickets: '1'}, {type: 'CHILD', noOfTickets: 4}, {type: 'INFANt', noOfTickets: 1}]
        
        expect(() => {
            const ticketService = new TicketService()
            ticketService.purchaseTickets(2, ticketArrayObject)
        }).toThrow('noOfTickets must be an integer');
    })
})

describe('noOfTicketsIsValid', () => {
    test('requesting child tickets without a adult ticket throws error with correct message', () => {
        const ticketArrayObject = [{type: 'ADULT', noOfTickets: 0}, {type: 'CHILD', noOfTickets: 4}, {type: 'INFANT', noOfTickets: 0}]
        
        expect(() => {
            const ticketService = new TicketService()
            ticketService.purchaseTickets(2, ticketArrayObject)
        }).toThrow('An adult ticket is needed to purchase a child ticket');
    })

    test('requesting more infant tickets than adult ticket throws error with correct message', () => {
        const ticketArrayObject = [{type: 'ADULT', noOfTickets: 2}, {type: 'CHILD', noOfTickets: 0}, {type: 'INFANT', noOfTickets: 3}]
        
        expect(() => {
            const ticketService = new TicketService()
            ticketService.purchaseTickets(2, ticketArrayObject)
        }).toThrow('There must be an adult ticket for every infant ticket');
    })

    test('requesting more than 20 tickets at a time throws error with correct message', () => {
        const ticketArrayObject = [{type: 'ADULT', noOfTickets: 15}, {type: 'CHILD', noOfTickets: 5}, {type: 'INFANT', noOfTickets: 3}]
        
        expect(() => {
            const ticketService = new TicketService()
            ticketService.purchaseTickets(2, ticketArrayObject)
        }).toThrow('Only a maximum of 20 tickets that can be purchased at a time');
    })

    test('requesting a ticket submits payment and seat reservation succesfully', () => {
        const ticketArrayObject = [{type: 'ADULT', noOfTickets: 1}, {type: 'CHILD', noOfTickets: 0}, {type: 'INFANT', noOfTickets: 0}]

        const ticketService = new TicketService()
        const ticketRequest = ticketService.purchaseTickets(2, ticketArrayObject)

        expect(ticketRequest).toBe(true)
    })

    test('requesting 0 tickets throws error with correct message', () => {
        const ticketArrayObject = [{type: 'ADULT', noOfTickets: 0}, {type: 'CHILD', noOfTickets: 0}, {type: 'INFANT', noOfTickets: 0}]
        
        expect(() => {
            const ticketService = new TicketService()
            ticketService.purchaseTickets(2, ticketArrayObject)
        }).toThrow('No tickets have been requested, you request at least 1 ticket');
    })
})

