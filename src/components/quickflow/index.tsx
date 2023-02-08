
import { CombinedState } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { store } from "../../store";
import { EditorState } from "../../store/features/editor/editorSlice";
import { PlaceholderState, updatePlaceholder } from "../../store/features/placeholder/placeholderSlice";
import Spreadsheet from "../editors/vanilla/components/spreadsheet";
import FileImport from "../editors/vanilla/components/fileImport";
import "./index.css"


export default function Quickflow() {
	const [tab, setTab] = useState(1)
	const payload: CombinedState<{
		placeholders: PlaceholderState[];
		editor: EditorState;
	}> = store.getState()?.editorState;
	const editor = payload?.editor

	const setTabPanel = (index: number) => {
		setTab(index)
	}

	const replacePlaceholder = (data: HTMLSpanElement, placeholder: PlaceholderState) => {
		data.style.color = "#993300";
		data.style.fontWeight = "bold";
		data.classList.remove("vanilla__placeholder");
		data.innerText = placeholder.default === "" ? "[ - ]" : placeholder.default;
	}

	// const handleDataPreview = (e: MouseEvent<HTMLButtonElement> | Event) => {
	// 	// change tab to preview(content)
	// 	setTabPanel(1);
	// 	const target = e.target as HTMLElement;
	// 	const node = target.parentNode as ParentNode;
	// 	const data = node.parentNode as HTMLElement;
	// 	const inputs: NodeListOf<HTMLElement> = data.querySelectorAll("input");
	// 	const inputsArray = Array.from(inputs);
	
	// 	for (const [index, input] of Object.entries(inputsArray)) {
	// 	  const target = input as HTMLElement;
	// 	  const elem = target as HTMLInputElement;  
	// 	  const placeholderId = //placeholderIds[Number(index)];
	
	// 	  store.dispatch(
	// 		updatePlaceholder({ id: placeholderId, default: elem.value })
	// 	  );
	// 	}
	//   }

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
		<div className="vanilla__quickflow__wrapper" style={{ overflow: "scroll !important" }}>
			<h1 className="vanilla__quickflow__preview-title">{editor.templateName || "New Template"}</h1>
			<div className="quickflow__tab">
				<button className={"tablinks " + (tab === 1 ? "active" : "")} onClick={() => setTabPanel(1)}>Content</button>
				<button className={"tablinks " + (tab === 2 ? "active" : "")} onClick={() => setTabPanel(2)}>Data</button>
			</div>
			<div style={{ display: tab === 1 ? "block" : "none" }} className="content-tab">
				<div className="vanilla__quickflow__preview" dangerouslySetInnerHTML={{ __html: editor.contentHTML }}></div>
			</div>
			<div style={{ display: tab === 2 ? "block" : "none", paddingTop: "5px" }} className="data-tab">
				<div style={{ padding: "20px" }}>
					<label>What's the end goal?</label>
					<select>
						<option value={"select"}>select pipe</option>
						<option>Gmail</option>
					</select>
				</div>
				<Spreadsheet placeholders={payload.placeholders} changeTabPanel={(data: number) => setTabPanel(data)} />

				<FileImport />
			</div>
		</div>
	)
}
