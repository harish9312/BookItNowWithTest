import * as React from 'react';
import { BaseModel } from './BaseModel';

interface ITicketModelProps {
    showData: {
        imgSrc: string;
        movieName: string;
        descText: string;
    }[];
    showOnce: {
        '*': boolean;
    }[];
}

export class TicketModel extends BaseModel<ITicketModelProps> {
    constructor(props) {
        super(props);
    }

    static updateTickets(updatedShowData, showName) {
        const ticketInstance = this.get('01');
        if (ticketInstance) {
            ticketInstance.props.ticketData[showName] = updatedShowData;
            this.deleteAll();
            new TicketModel(ticketInstance.props).$save();
        }
    }

    static getTicketsByShowName(showName) {
        const allTickets = this.list();
        return allTickets.length > 0 && allTickets[0].props.ticketData[showName];
    }
    static resource = 'ticket-model';
}
