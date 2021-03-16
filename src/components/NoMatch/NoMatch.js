import React from 'react';

const NoMatch = () => {
    const style = {
        textAlign: 'center'
    }
    return (
        <div style={style}>
            <h1>No Match Found</h1>
            <h4 style={{color: 'red'}}>404 Error!!!...</h4>
        </div>
    );
}

export default NoMatch;
