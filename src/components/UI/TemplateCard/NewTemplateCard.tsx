import React from 'react'
import { BiFileBlank } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import { generate } from 'shortid'
import { store } from '../../../store'
import { addTemplate } from '../../../store/features/editor/editorSlice'

interface TemplateProps {
    onClick: () => void
}

export const NewTemplateCard = ({ onClick }: TemplateProps) => {
    const templateId = generate()
    const slug = `untitled-template-${templateId}`;
    const navigation = useNavigate();
    
    const handleNewTemplate = () => {
        store.dispatch(addTemplate({
            id: templateId,
            templateName: "Untitled Template",
            contentText: "",
            contentHTML: "",
        }));
        navigation(`/editor/templates/${slug}`)
    }
    return (
        <div className="vanilla__template-card new-template" onClick={onClick}>
            <div className="vanilla__template-card-top">
                <BiFileBlank />
            </div>
            <div className="vanilla__template-card-bottom" onClick={handleNewTemplate}>
                <p>New template</p>
            </div>
        </div>
    )
}
