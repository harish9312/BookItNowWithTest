import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { MoviePopUpImpl } from '../src/components/MoviePopUp/index';
import {
    getBookedTicketInstance,
    getDummyShowDetails, getNotSelectedTicketInstance,
    getSingleDummyShowDetails,
    getSingleSelectedDummyShowDetails, saveDummyTicketInstance
} from './dummyInstances';

configure({ adapter: new Adapter() });

describe('Movie Pop Up Page test', () => {
    it('Should render Movie Pop Up Page correctly with all the divs', () => {
        const treeWithoutProps = shallow(<MoviePopUpImpl {...null} />);
        expect(treeWithoutProps.find('div').length).toBe(12);
    });

    it('Should render Movie Pop Up Page correctly with all the divs when instance is present', () => {
        const treeWithoutProps = shallow(<MoviePopUpImpl showDetails={getDummyShowDetails()} selectedSeats={getDummyShowDetails()} {...null} />);
        expect(treeWithoutProps.find('div').length).toBe(39);
    });

    it('Should render only 1 extra div when a single instance is present', () => {
        const treeWithoutProps = shallow(<MoviePopUpImpl showDetails={getSingleSelectedDummyShowDetails()} selectedSeats={getSingleSelectedDummyShowDetails()} {...null} />);
        expect(treeWithoutProps.find('div').length).toBe(13);
        treeWithoutProps.find('div.seat-info').simulate('click', { seatInfo: null, isBooked: true, seatIndex: 0 });
    });

    it('Should render checkout button when the instance is present', () => {
        const treeWithoutProps = shallow(<MoviePopUpImpl showDetails={getSingleDummyShowDetails()} selectedSeats={getSingleDummyShowDetails()} {...null} />);
        expect(treeWithoutProps.find('button.checkout').length).toBe(1);
        treeWithoutProps.find('button.checkout').simulate('click');
    });

    it('Should show error message that seat is booked if user clicks on the booked seat', () => {
        const treeWithoutProps = shallow(<MoviePopUpImpl
            history={{ push: () => { } }}
            showDetails={getBookedTicketInstance()}
            selectedSeats={getBookedTicketInstance()}
            {...null}
        />);
        expect(treeWithoutProps.find('div.seat-info').length).toBe(1);
        treeWithoutProps.find('div.seat-info').simulate('click', { seatInfo: null, isBooked: true, seatIndex: 0 });
        expect(treeWithoutProps.find('div.error-info').length).toBe(1);
    });

    it('Should hide error message when any other seat is clicked', () => {
        const treeWithoutProps = shallow(<MoviePopUpImpl
            history={{ push: () => { } }}
            showDetails={getNotSelectedTicketInstance()}
            selectedSeats={getNotSelectedTicketInstance()}
            {...null}
        />);
        expect(treeWithoutProps.find('div.seat-info').length).toBe(1);
        treeWithoutProps.find('div.seat-info').simulate('click', { seatInfo: null, isBooked: true, seatIndex: 0 });
        expect(treeWithoutProps.find('div.error-info').length).toBe(0);
    });

    it('Should close the popup when close button is clicked', () => {
        const treeWithoutProps = shallow(<MoviePopUpImpl onClose={() => { }} showDetails={getSingleDummyShowDetails()} selectedSeats={getSingleDummyShowDetails()} {...null} />);
        expect(treeWithoutProps.find('div.close').length).toBe(1);
        treeWithoutProps.find('div.close').simulate('click');
        expect(treeWithoutProps.find('div').length).toBe(0);
    });

    it('Should save a new instance in BookedTickets Model', () => {
        saveDummyTicketInstance('01')
        const treeWithoutProps = shallow(<MoviePopUpImpl
            history={{ push: () => { } }}
            showName="01"
            onClose={() => { }}
            showDetails={getSingleDummyShowDetails()}
            selectedSeats={getSingleSelectedDummyShowDetails()} {...null} />);
        expect(treeWithoutProps.find('button.checkout').length).toBe(1);
        treeWithoutProps.find('button.checkout').simulate('click');
    });
});