import { initialState } from "../../../store/features/editor/editorSlice";
import PlaceholderSidePanel from "./components/PlaceholderSidePanel";
import Editor from "./components/editor";
import SidePanel from "./components/sidepanel";
import QuickflowSidePanel from "./components/QuickflowSidePanel";
import { useSelector } from "react-redux";
import { FlowPayload } from "../../../store/features/quickflow/quickflowSlice";

export default function VanillaEditor() {
  const comp: FlowPayload = useSelector((state: any) => state.flowState);
  const componentsMap = { QuickflowSidePanel, PlaceholderSidePanel };
  const componentName = comp.componentName || "PlaceholderSidePanel"
  const DynamicComponent: any = componentsMap[componentName as keyof typeof componentsMap]
  return (
    <div className="wrapper">
      <Editor title={initialState.templateName} />
      <SidePanel component={<DynamicComponent />} />
    </div>
  );
}
