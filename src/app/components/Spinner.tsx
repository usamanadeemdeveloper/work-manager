import Image from 'next/image';
import React from 'react'
import ReactLogo from '../../../public/react-2.svg';
const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Image
                src={ReactLogo}
                alt="Loading..."
                className="h-16 w-16 animate-spin-fast"
            />
        </div>
    );
}

export default Spinner;
