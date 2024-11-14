import React from 'react'

function Btn({
    children,
    type ='button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button className={`px-4 , py-2 rounded-lg ${type},${bgColor},${textColor},${className}`}{...props}>
            {children}
        </button>
    )
}

export default Btn
