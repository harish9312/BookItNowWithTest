import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { BookedTicketModel } from '../../Models/BookedTicketsModel';
import './movirPopUp.scss';
import { TicketModel } from '../../Models/TicketModel';

export interface IMoviePopUpProps extends RouteComponentProps<any> {
    showDetails?: any;
    selectedSeats?: any;
    showName?: string;
    descText?: string;
    onClose?: () => void;
}

export interface IMoviePopUpState {
    selectedSeats: {
        seatIndex: number;
        isSelected: boolean;
        isBooked: boolean;
        seatName: string;
    }[];
    showDetails: any;
    closePopUp: boolean;
    showInfo: boolean;
    showName: string;
    errorText: string;
}

export class MoviePopUpImpl extends React.Component<IMoviePopUpProps, IMoviePopUpState> {
    constructor(props: IMoviePopUpProps) {
        super(props);
        this.state = { errorText: '', closePopUp: false, showInfo: false, selectedSeats: props.selectedSeats, showDetails: props.showDetails, showName: null };
    }

    componentWillReceiveProps(nextProps: IMoviePopUpProps) {
        if (this.state.showName !== nextProps.showName) {
            this.setState({
                selectedSeats: nextProps.selectedSeats,
                showDetails: nextProps.showDetails,
                showName: nextProps.showName,
                closePopUp: false
            });
        }
    }

    handleClickOnSeat = (seatInfo, isBooked, seatIndex) => {
        if (isBooked === true) {
            this.setState({
                showInfo: true,
                errorText: 'This seat is already booked.'
            });
            setTimeout(() => this.setState({ showInfo: false }), 5000);
            return;
        }
        const selectedSeats = this.state.selectedSeats;
        if (selectedSeats[seatIndex].isSelected) {
            selectedSeats[seatIndex].isSelected = false;
            this.setState({ selectedSeats, showInfo: false });
            return;
        }
        selectedSeats[seatIndex].isSelected = true;
        this.setState({ selectedSeats, showInfo: false });
    }

    getShowDetails = () => {
        const { selectedSeats, showDetails } = this.state;
        return (showDetails || []).map((seatInfo, index) => {
            const seatName = Object.keys(seatInfo)[0];
            return <div
                key={index}
                className={`seat-info ${selectedSeats[index].isBooked ? 'is-booked' : ''} ${selectedSeats[index].isSelected ? 'is-selected' : ''}`}
                onClick={() => this.handleClickOnSeat(seatInfo, selectedSeats[index].isBooked, index)}>{seatName}</div>;
        });
    }

    handlePopUpClose = () => {
        this.setState({
            selectedSeats: [],
            showName: null,
            closePopUp: true,
        });
    }

    handleCheckOut = () => {
        const selectedTickets = this.state.selectedSeats.filter((v) => v.isSelected);
        const bookedTickets = this.state.selectedSeats.map((v) => {
            if (v.isSelected) {
                v.isBooked = true;
                v.isSelected = false;
            }
            return v;
        });
        if (selectedTickets.length > 0) {
            new BookedTicketModel({ id: this.props.showName, bookedTickets: selectedTickets }).$save();
            TicketModel.updateTickets(bookedTickets, this.props.showName);
            this.props.history.push(`/checkout-tickets/${this.props.showName}`);
            return;
        }
        this.setState({
            showInfo: true,
            errorText: 'Please select seats before checking out.'
        });
        setTimeout(() => this.setState({ showInfo: false }), 5000);
    }

    render() {
        const { closePopUp, showInfo, errorText } = this.state;
        if (closePopUp) {
            return '';
        }
        return <div className="seat-info-container" >
            <div className="seats-container" >
                <div className="show-name" >{this.props.showName}</div>
                <div onClick={this.handlePopUpClose} className="close" >X</div>
                <div className="show-details" >{this.props.descText}</div>
                {showInfo && <div className="error-info" >{errorText}</div>}
                <div className="seats" >{this.getShowDetails()}</div>
                <div className="legends" >
                    <div>A: Platinum(320&#8377;)</div>
                    <div>B: Gold(280&#8377;)</div>
                    <div>C: Silver(240&#8377;)</div>
                </div>
                <div className="screen" >All eyes this way please!</div>
                <div className="checkout-button"><button className="checkout" onClick={this.handleCheckOut} >Checkout</button></div>
            </div>
        </div>;
    }
}

export const MoviePopUp = withRouter(MoviePopUpImpl);
