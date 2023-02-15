import React from 'react'
import { BiFileBlank } from "react-icons/bi"

export const NewTemplateCard = () => {
    return (
        <div className="vanilla__template-card new-template">
            <div className="vanilla__template-card-top">
                <BiFileBlank />
            </div>
            <div className="vanilla__template-card-bottom ">
                <p>New template</p>
            </div>
        </div>
    )
}
