import React from 'react'
import { TemplatePlaceholderInfo } from '../../UI/TemplatePlaceholderInfo'
import "./templateSidePanel.css"

export const TemplateSidePanel = () => {
    const dummy = Array(3).fill({
        type: "email",
        title: "Customer Email",
        count: 10,
    })
    return (
        <div className='vanilla__template-side-panel default'>
            <div className="vanilla__template-placeholder-info">
                <h3></h3>
                <h5></h5>
            </div>
            <div className="vanilla__template-placeholder-list">
                <h5></h5>
                <ul className="vanilla__template-placeholder-listing">

                    {dummy.map((data, i) => <li key={i}><TemplatePlaceholderInfo {...data} /></li>)}
                </ul>
                <ul className="vanilla__template-placeholder-listing">
                </ul>
            </div>
        </div>
    )
}
