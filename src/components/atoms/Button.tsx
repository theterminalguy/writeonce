import React from 'react'
import "../../styles/buttons/button.css"

interface Props {
    className: string,
    children: React.ReactNode
}

export const Button: React.FC<Props> = ({ className, children }) => {
    return (
        <button className={className}>{children}</button>
    )
}
