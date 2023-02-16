import React from 'react'
import { AiOutlineMail } from "react-icons/ai"
import { VscBracketDot } from "react-icons/vsc"
import { BsInputCursorText } from "react-icons/bs"
import { SlPhone } from "react-icons/sl"
import { TbNumbers } from "react-icons/tb"
import { IoCalendarNumberOutline } from "react-icons/io5"
import "./templatePlaceholderInfo.css"

interface Props {
    type: string;
    title: string;
    count: number
}

export const TemplatePlaceholderInfo: React.FC<Props> = ({ type, title, count }) => {
    return (
        <div className="vanilla__placeholder-info">
            <span className="left">
                <span className="icon"><Icon type={type} /></span>
                <span className="title">{title}</span>
            </span>
            <span className="right">{count}</span>
        </div>
    )
}

const Icon: React.FC<{ type: string }> = ({ type }) => {
    switch (type) {
        case "email":
            return <AiOutlineMail />
        case "text":
            return <BsInputCursorText />
        case "number":
            return <TbNumbers />
        case "phonenumber":
            return <SlPhone />
        case "date":
            return <IoCalendarNumberOutline />
        default:
            return <VscBracketDot />
    }
    // return <AiOutlineMail />
}
