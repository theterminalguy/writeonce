import React from 'react'

interface Props {
    className: string,
    children: React.ReactNode
}

export const index: React.FC<Props> = ({ className, children }) => {
    return (
        <button className={className}>{children}</button>
    )
}
