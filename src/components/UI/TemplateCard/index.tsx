import "../../../App.css"
import "./templateCard.css"
import { FaEllipsisV } from "react-icons/fa"
import { SlMagicWand } from "react-icons/sl"
import { BiEdit, BiTrash } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

interface Props {
    id: string;
    slug: string;
    content: string;
    time: string;
    title: string;
}

const stimulusConfig = {
    controller: "templates--template-card",
    handleOptionsClick: "handleOptionsClick",
    handleFocusOut: "handleFocusOut",
    handleDelete: "handleDelete",
    handlePlaceholderInfo: "handlePlaceholderInfo",
}

export const TemplateCard: React.FC<Props> = ({ id, slug, content, time, title }) => {
    const navigation = useNavigate();
    return (
        <div data-controller={stimulusConfig.controller} className="vanilla__template-card" data-templates--template-card-target="templatecard" data-action={`click->${stimulusConfig.controller}#${stimulusConfig.handlePlaceholderInfo}`} data-templates--template-card-template-id-value={id}>
            <div className="vanilla__template-card-top"  id={id}>
                <p className="vanilla__template-card-content">{content}</p>
            </div>
            <div className="vanilla__template-card-bottom">
                <p className="vanilla__template-card-info">
                    <span className="vanilla__template-card-title">{title}</span>
                    <span className="vanilla__template-card-time">{time}</span>
                </p>
                <button className="vanilla__template-options-btn" data-action={`click->${stimulusConfig.controller}#${stimulusConfig.handleOptionsClick}`}>
                    <FaEllipsisV />
                </button>
            </div>
            <div data-templates--template-card-target="option" tabIndex={0} className={`vanilla__template-options`} data-action={`focusout->${stimulusConfig.controller}#${stimulusConfig.handleFocusOut}`} >
                <ul>
                    <li onClick={() => navigation(`/editor/templates/${slug}`)}>
                        <BiEdit />
                        <span>Edit</span>
                    </li>
                    <li onClick={() => navigation(`/quickflow/${id}`)}>
                        <SlMagicWand />
                        <span>Use template</span>
                    </li>
                    <li data-action={`click->${stimulusConfig.controller}#${stimulusConfig.handleDelete}`} id={id}>
                        <BiTrash />
                        <span>Delete</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
