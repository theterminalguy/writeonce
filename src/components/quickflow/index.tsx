
import { useEffect } from "react";
import { store } from "../../store";
import "./index.css"
import { uploadCSVConfig } from "../../controllers/files/upload_csv_controller";


export default function Quickflow() {
    const payload: any = store.getState()?.editorState;
    const editor = payload?.editor

    const replacePlaceholder = (data: any, placeholder: any) => {
        data.style.color = "#993300";
        data.style.fontWeight = "bold";
        data.classList.remove("vanilla__placeholder");
        data.innerText = placeholder.default === "" ? "[ - ]" : placeholder.default;
    }

    useEffect(() => {
        const placeholders = payload?.placeholders;
        for (const placeholder of placeholders) {
            const placholderSelected = `.vanilla__placeholder-${placeholder["id"]}`
            const nodes: NodeListOf<HTMLBodyElement> = document.querySelectorAll(placholderSelected)
            const nodeList = Array.from(nodes);
            // TODO: We might need to improve this O^2
            for (const value of nodeList) {
                replacePlaceholder(value, placeholder)
            }
        }
    })
    return (
        <div >
            <div className="vanilla__quickflow__wrapper vanilla__editor-container">
                <h1 className="vanilla__quickflow__preview-title vanilla__editor-title">{editor.templateName || "New Template"}</h1>
                <div className="vanilla__quickflow__preview" dangerouslySetInnerHTML={{ __html: editor.contentHTML }}></div>
            </div>
            <div className="vanilla__quickflow-csv-table-wrapper">
                <table className="vanilla__quickflow-csv-table">
                </table>
            </div>
        </div>
    )
}

