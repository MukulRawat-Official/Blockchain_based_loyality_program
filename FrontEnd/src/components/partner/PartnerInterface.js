import React from 'react';

import Header from './Header';
import Dashboard from './Dashboard';
import Product from './Products';
import History from './History';


function PartnerInterface() {
    return (
        <div>
            <Header />
            <Dashboard title="Dashboard"/>
        </div>
    );
}

export default PartnerInterface;
