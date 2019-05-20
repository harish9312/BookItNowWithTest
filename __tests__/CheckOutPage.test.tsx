import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { BasePage } from '../src/BasePage';
import { CheckoutPage, CheckoutPageImpl, mapStateToProps } from '../src/components/CheckoutPage/index';
import { getBookedModelInstance, saveDummyBookedTicketInstance } from './dummyInstances';

configure({ adapter: new Adapter() });

describe('Checkout Page test', () => {
    it('Should render the empty string if there is no tickets booked', () => {
        const treeWithoutProps = shallow(<CheckoutPage />);
        expect(treeWithoutProps.find(BasePage).length).toBe(0);
    });
    it('Should render BasePage and its child properly if there is an instance', () => {
        const treeWithProps = shallow(<CheckoutPageImpl bookedTickets={getBookedModelInstance()} />);
        expect(treeWithProps.find(BasePage).length).toBe(1);
    });
    it('Should return showName and bookedTicket Instance', () => {
        saveDummyBookedTicketInstance('Badla')
        const bookedTicketInstance = getBookedModelInstance('Badla');
        const props = mapStateToProps({}, { match: { params: { showName: 'Badla' } } })
        expect((props).bookedTickets).toEqual(bookedTicketInstance);
    });
    it('Should check if instance is there and render pay button and click on it', () => {
        const treeWithoutProps = shallow(<CheckoutPageImpl history={{ push: () => { } }} bookedTickets={getBookedModelInstance()} />);
        expect(treeWithoutProps.find('button.pay').length).toBe(1);
        treeWithoutProps.find('button.pay').simulate('click');
    });
    it('Should redirect to the Home i.e. call componentDidMount and should not render pay button', () => {
        const treeWithoutProps = shallow(<CheckoutPageImpl history={{ push: () => { } }} bookedTickets={null} />);
        expect(treeWithoutProps.find('button.pay').length).toBe(0);
    });
})