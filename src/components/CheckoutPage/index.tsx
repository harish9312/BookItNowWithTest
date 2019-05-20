import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BookedTicketModel } from '../../Models/BookedTicketsModel';
import './checkoutPage.scss';
import { BasePage } from '../../BasePage';
import { TicketModel } from '../../Models/TicketModel';

export interface ICheckoutPageProps {
    bookedTickets: BookedTicketModel;
    showName?: string;
    history?: {
        push: (path: string) => void;
    };
}

export class CheckoutPageImpl extends React.PureComponent<ICheckoutPageProps, {}> {
    constructor(props: ICheckoutPageProps) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.bookedTickets) {
            this.props.history.push('/');
        }
    }

    handleTicketBooking = (ticketsWithPrice) => {
        const showData = TicketModel.get('01');
        this.props.history.push('/');
    }

    renderTicketWithPrice = (ticketsWithPrice) => {
        let totalPrice = 0;
        return <React.Fragment >
            <div className="ticket-price" >
                {ticketsWithPrice.map((ticketDetails, index) => {
                    totalPrice = totalPrice + ticketDetails.price;
                    return <div key={index} className="ticket-row">
                        <div className="seat-name" >{Object.keys(ticketDetails)[0]}</div>
                        <div className="price" >{ticketDetails.price}&#8377;</div>
                    </div>;
                })}
            </div>
            <div className="total-price">Sub Total: &nbsp;<span className="price-text" > {totalPrice}&#8377;</span></div>
            <div className="total-price">Service Tax @14%: &nbsp;<span className="price-text" > {((totalPrice / 100) * 14).toFixed(2)}&#8377;</span></div>
            <div className="total-price">Swachh Bharat Cess @0.5% &nbsp;<span className="price-text" > {((totalPrice / 100) * 0.5).toFixed(2)}&#8377;</span></div>
            <div className="total-price">Krishi Kalyan Cess @0.5% &nbsp;<span className="price-text" > {((totalPrice / 100) * 0.5).toFixed(2)}&#8377;</span></div>
            <div className="total-price">Total Price:<span className="small-text" >(Inclusive of all taxes)</span><span className="price-text"> &nbsp;
                {((totalPrice / 14) + ((totalPrice / 100) * 0.5) + ((totalPrice / 100) * 0.5) + totalPrice).toFixed(2)}&#8377;</span></div>
        </React.Fragment >;
    }

    render() {
        if (this.props.bookedTickets) {
            const ticketsWithPrice = BookedTicketModel.getTicketsWithPrice(this.props.bookedTickets.props.bookedTickets);
            return <BasePage>
                <div className="checkout-page-container" >
                    <div className="receipt" >
                        <div className="heading" > Your Ticket Details for the following show: <div className="show-name" >{this.props.showName}</div> </div>
                        <div className="ticket-heading" >
                            <div className="seat-number" >Seat Number:</div>
                            <div className="price" >Price(&#8377;)</div>
                        </div>
                        {this.renderTicketWithPrice(ticketsWithPrice)}
                    </div>
                    <div className="pay-button" >
                        <button className="pay" onClick={() => this.handleTicketBooking(ticketsWithPrice)} >Click to Confirm Ticket</button>
                    </div>
                </div>
            </BasePage>;
        }
        return '';
    }

}

export function mapStateToProps(state, ownProps) {
    const showName = ownProps.match.params.showName;
    const bookedTickets = BookedTicketModel.get(showName);
    return {
        showName,
        bookedTickets
    };
}

export const CheckoutPage = withRouter(connect<{}, {}, ICheckoutPageProps>(mapStateToProps)(CheckoutPageImpl));
