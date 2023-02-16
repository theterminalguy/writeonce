import { useEffect, useState } from "react";
import { store } from "../../store";
import Spreadsheet from "../editors/vanilla/components/spreadsheet";
import FileImport from "../editors/vanilla/components/fileImport";
import "./index.css"
import { PlaceholderState } from "../../store/features/placeholder/placeholderSlice";
import "./index.css";
import { useParams } from "react-router-dom";

interface Props {
	uploadCSVConfig: {
		controller: string;
		handleCSVImportAction: string;
		displayQuickflow: string;
		quickflowWrapper: string;
		quickflowCSVTable: string;
	}
}

export default function Quickflow({ uploadCSVConfig }: Props) {
	const [tab, setTab] = useState(1)
	const { id } = useParams()
	const editor = store.getState()?.editorState?.editor.find((editor) => editor.id === id);
	const payload = store.getState()?.editorState;
	const placeholders: PlaceholderState[] = payload?.placeholders.filter((placeholder) => placeholder.templateId === id);

	const setTabPanel = (index: number) => {
		setTab(index)
	}

	const replacePlaceholder = (data: HTMLElement, placeholder: PlaceholderState) => {
		data.style.color = "#993300";
		data.style.fontWeight = "bold";
		data.classList.remove("vanilla__placeholder");
		data.innerText = placeholder.default === "" ? "[ - ]" : placeholder.default;
	}

	useEffect(() => {
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
		<div className="quickflow__wrapper vanilla__editor-container" style={{ overflow: "scroll !important" }}>
			<h1 className="vanilla__quickflow__preview-title">{editor?.templateName || "New Template"}</h1>
			<div className="quickflow__tab">
				<button className={"quickflow__tablinks " + (tab === 1 ? "active" : "")} onClick={() => setTabPanel(1)}>Content</button>
				<button className={"quickflow__tablinks " + (tab === 2 ? "active" : "")} onClick={() => setTabPanel(2)}>Data</button>
			</div>
			<div style={{ display: tab === 1 ? "block" : "none" }}  className="vanilla__quickflow__preview">
				<div dangerouslySetInnerHTML={{ __html: editor?.contentHTML || "" }}></div>
			</div>
			<div style={{ display: tab === 2 ? "block" : "none", paddingTop: "5px" }}>
				<div style={{ padding: "20px" }}>
					<label>What's the end goal?</label>
					<select>
						<option value={"select"}>select pipe</option>
						<option>Gmail</option>
					</select>
				</div>
				<Spreadsheet placeholders={placeholders} changeTabPanel={(data: number) => setTabPanel(data)} />

				<FileImport />
				<div data-files--upload-csv-target={uploadCSVConfig.quickflowWrapper} className="quickflow__wrapper vanilla__editor-container">
					<div className="quickflow__csv-table-wrapper">
						<table data-files--upload-csv-target={uploadCSVConfig.quickflowCSVTable} className="quickflow__csv-table"></table>
					</div>
				</div>
			</div>
		</div>
	)
}


