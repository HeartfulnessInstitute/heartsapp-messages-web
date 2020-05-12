import * as React from 'react';
import { Link } from 'react-router-dom';

import Dashboard from '../../Layout/Dashboard';

import './style.scss';

const Console = () => {
    return(
        <Dashboard>
            <div className="console-layout-wrapper">
                <Link to="/post" > Post A New Message</Link>
                <Link to="/messages"> View Posted Messages</Link>
            </div>
        </Dashboard>
    )
}

export default Console;
