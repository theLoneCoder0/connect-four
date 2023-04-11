import React, { useEffect, useState } from 'react';
import redToken from '../assets/red token.svg';
import blackToken from '../assets/black token.svg';

export const Slot = ({ ch, y, x }) => {

    return (
        <div className='slot' x={x} y={y}>
            {ch && (
                <img src={ch === 'X' ? redToken : blackToken} width='100%' height='100%' />
            )}
        </div>
    );
};