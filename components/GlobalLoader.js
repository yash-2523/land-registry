import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

export default function GlobalLoader() {

    return (
        <div className="d-flex justify-content-center align-items-center" style={{width: "100vw", zIndex: "2000", height: "100vh", position: "fixed", top: "0%", left:"0%", backgroundColor: "rgba(0,0,0, 0.2)"}}>
            <MutatingDots 
                height="100"
                width="100"
                color="cyan"
                secondaryColor= 'cyan'
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )

}