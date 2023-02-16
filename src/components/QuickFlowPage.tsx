import QuickflowSidePanel from "./editors/vanilla/components/quickflowSidePanel";
import Quickflow from "./quickflow";
import Layout from "./UI/Layout";
import { useParams } from "react-router-dom";

export default function QuickflowPage() {
  const {id } = useParams<{ id: string }>();
  return (
      <>
      <Layout controller={uploadCSVConfig.controller}>
        <Quickflow uploadCSVConfig={uploadCSVConfig} />
        <QuickflowSidePanel uploadCSVConfig={uploadCSVConfig} templateId={id as string} />
      </Layout>
    </>
  )
}

const uploadCSVConfig = {
  controller: "files--upload-csv",
  handleCSVImportAction: "handleCSVImport",
  displayQuickflow: "displayQuickflow",
  quickflowWrapper: "quickflowWrapper",
  quickflowCSVTable: "quickflowCSVTable"
}

