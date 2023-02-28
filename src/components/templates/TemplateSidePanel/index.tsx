import React from 'react'
import { TemplatePlaceholderInfo } from '../../UI/TemplatePlaceholderInfo'
import "./templateSidePanel.css"

export const TemplateSidePanel = () => {
    return (
        <div className='vanilla__template-side-panel default'>
            <div className="vanilla__template-placeholder-info">
                <h3></h3>
                <h5></h5>
            </div>
            <div className="vanilla__template-placeholder-list">
                <h5></h5>
                <ul className="vanilla__template-placeholder-listing">
                </ul>
            </div>
        </div>
    )
}
