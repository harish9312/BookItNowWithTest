import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Navbar } from '../src/components/reusableComponents/Navbar/index';

configure({ adapter: new Adapter() });

describe('Navbar Page test', () => {
    it('Should render all the divs correctly in the Navbar', () => {
        const treeWithoutProps = shallow(<Navbar />);
        expect(treeWithoutProps.find('div').length).toBe(10);
    });
})