import React from 'react'
import { TemplatePlaceholderInfo } from '../../UI/TemplatePlaceholderInfo'
import "./templateSidePanel.css"

export const TemplateSidePanel = () => {
    const dummy = Array(10).fill({
        type: "email",
        title: "Customer Email",
        count: 10,
    })
    return (
        <div className='vanilla__template-side-panel'>
            <div className="vanilla__template-placeholder-info">
                <h3>Letter of introduction</h3>
                <h5>Edited 2 minutes ago</h5>
            </div>
            <div className="vanilla__template-placeholder-list">
                <h5>Placeholder (10)</h5>
                <ul>
                    {dummy.map((data, i) => <li><TemplatePlaceholderInfo {...data} /></li>)}
                </ul>
            </div>
        </div>
    )
}
