import * as React from 'react';
import { BaseModel } from './BaseModel';

interface IBookedTicketModelProps {
    id: string;
    bookedTickets: {
        seatName: string;
        isBooked: boolean;
    }[];
}

export class BookedTicketModel extends BaseModel<IBookedTicketModelProps> {
    constructor(props) {
        super(props);
    }

    static getTicketsWithPrice(bookedTickets) {
        const bookedTicketsWithPrice = bookedTickets.map((ticketDetails) => {
            const seatName = Object.keys(ticketDetails)[0];
            switch (seatName.substring(0, 1)) {
                case 'A':
                    ticketDetails.price = 320;
                    return ticketDetails;
                case 'B':
                    ticketDetails.price = 280;
                    return ticketDetails;
                case 'C':
                    ticketDetails.price = 240;
                    return ticketDetails;
            }
        });
        return bookedTicketsWithPrice;
    }

    static resource = 'booked-ticket';
}
