import * as React from 'react';
import './navBar.scss';

export interface INavbarProps {
}

export class Navbar extends React.PureComponent<INavbarProps, {}> {
    constructor(props: INavbarProps) {
        super(props);
    }

    render() {
        return <div className="navbar-container" >
            <div className="navbar-top" >
                <div className="logo" >
                    BookItNow
                </div>
                <div className="search-bar" >
                    <input type="text" placeholder="Search for Movies, Events, Plays, Sports and Activities" className="search-box" />
                </div>
                <div className="user-info" >
                    {/* <div><img width="50px" src={require('../../../assets/user.svg')} /></div> */}
                    <div>Logout</div>
                </div>
            </div>
            <div className="navbar-bottom" >
                <div className="nav-item" >
                    Home
                </div>
                <div className="nav-item" >
                    Movies
                </div>
                <div className="nav-item" >
                    Theaters
                </div>
            </div>
        </div>;
    }
}
