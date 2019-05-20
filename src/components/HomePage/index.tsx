import * as React from 'react';
import { connect } from 'react-redux';
import { BasePage } from '../../BasePage';
import { TicketModel } from '../../Models/TicketModel';
import { getAllTicketData } from '../../services/baseServices';
import { MoviePopUp } from '../MoviePopUp/index';
import './homePage.scss';

export interface IHomePageProps {
    tickets: TicketModel;
}

export interface IHomePageState {
    activeShowName: string;
    descText: string;
    activeShowDetails: {
        seatName: string;
        isSelected: boolean;
        isBooked: boolean;
    };
}

export class HomePageImpl extends React.Component<IHomePageProps, IHomePageState> {
    constructor(props: IHomePageProps) {
        super(props);
        this.state = { descText: '', activeShowName: null, activeShowDetails: null };
    }

    async componentDidMount() {
        await getAllTicketData();
    }

    handleShowNameClick = (showName, index) => {
        const { tickets: { props: { showData } } } = this.props;
        const showDetails = TicketModel.getTicketsByShowName(showName);
        this.setState({
            activeShowName: showName,
            activeShowDetails: showDetails,
            descText: showData[index].descText
        });
    }

    renderShows = () => {
        const { tickets: { props: { showData } } } = this.props;
        return showData.map((showName, index) => {
            return <div key={index} onClick={() => this.handleShowNameClick(showName.movieName, index)} className="show-name" >
                <img width="300px" height="370px" src={showName.imgSrc} />
                <span className="movie-name" >{showName.movieName}</span>
            </div>;
        });
    }

    render() {
        return <BasePage >
            <div className="home-page-container">
                {this.state.activeShowDetails &&
                    <MoviePopUp
                        selectedSeats={this.state.activeShowDetails}
                        showName={this.state.activeShowName}
                        showDetails={this.state.activeShowDetails}
                        descText={this.state.descText}
                    />
                }
                <div className="heading" >
                    Book Movie Tickets Online
            </div>
                <div className="show-times-container" >
                    {this.props.tickets && this.renderShows()}
                </div>
            </div>
        </BasePage>;
    }

}
export function mapStateToProps() {
    const tickets = TicketModel.get('01');
    return {
        tickets
    };
}

export const HomePage = connect<{}, {}, IHomePageProps>(mapStateToProps)(HomePageImpl);
