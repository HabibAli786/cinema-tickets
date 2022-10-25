import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js'
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js'

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  #ticketPrices = {
    'ADULT': 20,
    'CHILD': 10,
    'INFANT': 0
  } 

  #ticketTypeRequests = []  
  #totalAmountToPay = 0
  #totalSeats = 0
  
  purchaseTickets(accountId, ticketRequests) {
    if(this.#isAccountIdValid(accountId) && this.#setTicketTypes(ticketRequests)) {
        this.#noOfTicketsIsValid()
        this.#calPaymentSeatsAmount()

        new TicketPaymentService().makePayment(accountId, this.#totalAmountToPay)
        new SeatReservationService().reserveSeat(accountId, this.#totalSeats)

        return true
    }
  }

  #isAccountIdValid(accountId) {
    if(typeof(accountId) === 'number' && accountId > 0) {
      return true
    } else {
      throw new InvalidPurchaseException("Account Number needs to be a valid number and greater than 0")
    }
  }

  #noOfTicketsIsValid() {
    let totalTickets = 0

    let adultTickets = 0
    let childTickets = 0
    let infantTickets = 0

    this.#ticketTypeRequests.forEach(ticket => {
      if(ticket.getTicketType() === 'ADULT') {
        adultTickets += ticket.getNoOfTickets()
      }
      if(ticket.getTicketType() === 'CHILD') {
        childTickets += ticket.getNoOfTickets()
      }
      if(ticket.getTicketType() === 'INFANT') {
        infantTickets += ticket.getNoOfTickets()
      }
      totalTickets += ticket.getNoOfTickets()
    })
    
    if(adultTickets <= 0 && childTickets > 0) {
      throw new InvalidPurchaseException("An adult ticket is needed to purchase a child ticket")
    }

    if(infantTickets > adultTickets) {
      throw new InvalidPurchaseException("There must be an adult ticket for every infant ticket")
    }

    if(totalTickets > 20) {
      throw new InvalidPurchaseException("Only a maximum of 20 tickets that can be purchased at a time")
    }

    if(totalTickets <= 0) {
      throw new InvalidPurchaseException("No tickets have been requested, you request at least 1 ticket")
    }

    return true
  }

  #calPaymentSeatsAmount() {
    this.#ticketTypeRequests.forEach(ticket => {
      if(ticket.getTicketType() !== 'INFANT') {
        this.#totalSeats += ticket.getNoOfTickets()
        this.#totalAmountToPay += ticket.getNoOfTickets() * this.#ticketPrices[ticket.getTicketType()]
      }
    })

    return true
  }

  #setTicketTypes(ticketRequests) {
    ticketRequests.forEach(ticket => {
      this.#ticketTypeRequests.push(new TicketTypeRequest(ticket.type, ticket.noOfTickets))
    });

    return true
  }
}