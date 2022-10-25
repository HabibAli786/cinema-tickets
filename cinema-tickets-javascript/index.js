import TicketService from "./src/pairtest/TicketService.js";

const ticket = {
    ADULT: 15,
    CHILD: 5,
    INFANT: 3
}

// const adultTicketRequest = new TicketTypeRequest(keys[0], ticketTypeRequests.ADULT)

const ticketArrayObject = [{type: 'ADULT', noOfTickets: 0}, {type: 'CHILD', noOfTickets: 0}, {type: 'INFANT', noOfTickets: 0}]

const tickets = [10, 5, 5]

const ticketReq = new TicketService()
ticketReq.purchaseTickets(2, ticketArrayObject)