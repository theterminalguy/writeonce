import QuickflowSidePanel from "./editors/vanilla/components/quickflowSidePanel";
import Quickflow from "./quickflow";
import Layout from "./UI/Layout";

export default function QuickflowPage() {

  return (
      <>
        <Layout>
          <Quickflow />
          <QuickflowSidePanel />
        </Layout>
      </>
  )
}

