import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { BasePage } from '../src/BasePage';
import { Navbar } from '../src/components/reusableComponents/Navbar/index';

configure({ adapter: new Adapter() });

describe('BasePage Page test', () => {
    it('Should render the Navbar once', () => {
        const treeWithoutProps = shallow(<BasePage />);
        expect(treeWithoutProps.find(Navbar).length).toBe(1);
    });
    it('Should render 2 divs', () => {
        const treeWithoutProps = shallow(<BasePage />);
        expect(treeWithoutProps.find('div').length).toBe(2);
    });
    it('Should render 1 Navbar', () => {
        const treeWithoutProps = shallow(<BasePage />);
        expect(treeWithoutProps.find(Navbar).length).toBe(1);
    });
})