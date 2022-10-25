import TicketTypeRequest from "pairtest/lib/TicketTypeRequest.js";

describe('create instance of TicketTypeRequest', () => {
    test('correct parameters succesfully', () => {
        
        const ticketTypeRequests = new TicketTypeRequest('ADULT', 3)
        expect(ticketTypeRequests).toBeTruthy()
    })

    test('string account number parameter throws error with correct message', () => {
        expect(() => {
            new TicketTypeRequest('ADULT', '0')
        }).toThrow('noOfTickets must be an integer');
    })

    test('incorrect type parameter throws error with correct message', () => {
        expect(() => {
            new TicketTypeRequest('ADULt', '0')
        }).toThrow('type must be ADULT, CHILD, or INFANT');
    })
})

describe('getNoOfTickets', () => {
    test('returns correct number of tickets', () => {
        const ticketTypeRequests = new TicketTypeRequest('ADULT', 3)
        expect(ticketTypeRequests.getNoOfTickets()).toBe(3)
    })

    test('returns correct type', () => {
        const ticketTypeRequests = new TicketTypeRequest('ADULT', 3)
        expect(ticketTypeRequests.getTicketType()).toBe('ADULT')
    })
})