import React from 'react';
import "./LoadingIndicator.css"

export default function LoadingIndicator(props) {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>

        // <div className="flex justify-center items-center h-full">
        //     <div className="border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 animate-spin"></div>
        // </div>
    );
}