import React from 'react'
import "./templateLayout.css"
import { TemplateCard } from "../../UI/TemplateCard"
import { NewTemplateCard } from '../../UI/TemplateCard/NewTemplateCard'
import { generate } from 'shortid'
import { store } from '../../../store'
import { useNavigate } from 'react-router-dom'
import { addTemplate } from '../../../store/features/editor/editorSlice'
import { DefaultTemplateName } from '../../../util/helper';



export const TemplateLayout = () => {
    const payload = store.getState().editorState
    const templates = payload.editor;
    const templateId = generate()
    const slug = `untitled-template-${templateId}`;
    const navigation = useNavigate();

    const handleNewTemplate = () => {
        store.dispatch(addTemplate({
            id: templateId,
            templateName: DefaultTemplateName,
            contentText: "",
            contentHTML: "",
        }));
        navigation(`/editor/${slug}`)
    }

    return (
        <div className="vanilla__template-wrapper">
            <NewTemplateCard onClick={handleNewTemplate} />
            {templates.map((data, i) => {
                if(data.contentText === "") {
                    return null;
                }
                return (
                    <TemplateCard key={i} id={data.id} title={data.templateName} content={data.contentText} time={data.created_at} slug={data.slug} />
                )
            })}
        </div>
    )
}
