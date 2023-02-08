import QuickflowSidePanel from "./editors/vanilla/components/quickflowSidePanel";
import Quickflow from "./quickflow";
import Layout from "./UI/Layout";
import { upload } from "@testing-library/user-event/dist/upload";

export default function QuickflowPage() {

  return (
      <>
      <Layout controller={uploadCSVConfig.controller}>
        <Quickflow uploadCSVConfig={uploadCSVConfig} />
        <QuickflowSidePanel uploadCSVConfig={uploadCSVConfig} />
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

