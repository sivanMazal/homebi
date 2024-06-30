import React from 'react';
import MyChart from './pie';
import Sample from './graph';

const Statistic = () => {
    return (
        <div className='my-5 py-4'>
            <h2 className='text-center' style={{color:"#245160"}}> 
            דוחות וניתוחים סטטיסטים בפריסה שנתית 
            </h2>
            <div className='mb-2 text-center mx-auto d-block text-center'>
                <hr className='staticts'/>
                </div>
            <MyChart />
            <Sample/>
        </div>
    );
};

export default Statistic;
