import { store } from "../../store"
import "./index.css"
import { Link, useNavigate } from "react-router-dom";
import { generate } from "shortid";
import { addTemplate } from "../../store/features/editor/editorSlice";

export default function Templates(): JSX.Element {
    const payload = store.getState().editorState
    const templates = payload.editor;
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
        navigation(`editor/templates/${slug}`)
    }

    return (
        <div>
            <div className="template">
                <div className="template-cols" onClick={handleNewTemplate}>
                    <div className=" template-cols__new" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file" width="96" height="96" viewBox="0 0 24 24" strokeWidth="0.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                        </svg>
                    </div>
                    <div className="template-cols__divider">
                        <h2>New Template</h2>
                    </div>
                </div>
                {templates.map((template, index) => {
                    return (
                        <div className="template-cols" key={index}>
                            <Link to={`editor/templates/${template.slug}`}>
                                <p>{template.contentText}</p>
                                <div className="template-cols__divider">
                                    <h4>{template.templateName}</h4>
                                    <p>2 Months ago</p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}