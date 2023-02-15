import { useState } from 'react'
import "../../../App.css"
import "./templateCard.css"
import { FaEllipsisV } from "react-icons/fa"
import { SlMagicWand } from "react-icons/sl"
import { BiEdit, BiTrash } from "react-icons/bi"

interface Props {
    content: string;
    time: string;
    title: string;
}

const stimulusConfig = {
    controller: "templates--template-card"
}

export const TemplateCard: React.FC<Props> = ({ content, time, title }) => {
    const [open, setOpen] = useState(false)
    return (
        <div data-controller={stimulusConfig.controller} className="vanilla__template-card">
            <div className="vanilla__template-card-top">
                <p className="vanilla__template-card-content">{content}</p>
            </div>
            <div className="vanilla__template-card-bottom">
                <p className="vanilla__template-card-info">
                    <span className="vanilla__template-card-title">{title}</span>
                    <span className="vanilla__template-card-time">{time}</span>
                </p>
                <button className="vanilla__template-options-btn" onClick={() => setOpen(!open)}>
                    <FaEllipsisV />
                </button>
            </div>
            <div tabIndex={0} className={`vanilla__template-options ${open ? "active" : ""}`}>
                <ul>
                    <li>
                        <BiEdit />
                        <span>Edit</span>
                    </li>
                    <li>
                        <SlMagicWand />
                        <span>Use template</span>
                    </li>
                    <li>
                        <BiTrash />
                        <span>Delete</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
