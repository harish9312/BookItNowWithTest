import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { BasePage } from '../src/BasePage';
import { HomePageImpl, mapStateToProps } from '../src/components/HomePage/index';
import { MoviePopUp } from '../src/components/MoviePopUp/index';
import { getTicketModelInstance, saveDummyTicketInstance } from './dummyInstances';

configure({ adapter: new Adapter() });

describe('HomePage Page test', () => {
    it('Should render HomePage correctly with one BasePage', () => {
        const treeWithoutProps = shallow(<HomePageImpl tickets={null} />);
        expect(treeWithoutProps.find(BasePage).length).toBe(1);
    });
    it('Should render HomePage correctly with all the divs', () => {
        const treeWithoutProps = shallow(<HomePageImpl tickets={getTicketModelInstance()} />);
        expect(treeWithoutProps.find('div').length).toBe(4);
    });
    it('Should render MoviePopUp if a show is clicked', () => {
        const treeWithoutProps = shallow(<HomePageImpl tickets={getTicketModelInstance()} />);
        expect(treeWithoutProps.find('div.show-name').length).toBe(1);
        treeWithoutProps.find('div.show-name').simulate('click');
        expect(treeWithoutProps.find(MoviePopUp).length).toBe(1);
    });
    it('Should return ticket instance if there is a instance in TicketModel', () => {
        saveDummyTicketInstance('01')
        const tickets = getTicketModelInstance('01');
        const props = mapStateToProps();
        expect((props).tickets).toEqual(tickets);
    });
});