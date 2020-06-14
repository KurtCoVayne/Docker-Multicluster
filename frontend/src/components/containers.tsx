import React from 'react';
import {Helmet} from 'react-helmet';

function MainContainer(props:any){
    return(
        <div>
            <Helmet>
                <title>{props.title}</title>
            </Helmet>
            {props.children}
        </div>
    );
}

export default MainContainer;