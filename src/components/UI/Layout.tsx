import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import Menu from "../menu";

interface LayoutProps {
  children: Array<React.ReactNode>;
  controller?: string;
}

export default function Layout(props: LayoutProps) {
  const [sizes, setSizes] = useState([300, "auto", 300]);
  const [, setDrag] = useState(false);

  const menu = {
    // background: "#F8F8F8",
    height: "100%",
  };

  const middle = {
    // height: window.innerHeight,
    height: "100%",
  };

  const dragging = {
    background: "#ffffff",
    height: "100%",
  };

  return (
    <>
      <div data-controller={props.controller} style={{ height: 900 }}>
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={setSizes}
          onDragStart={() => setDrag(true)}
          onDragEnd={() => setDrag(false)}
          sashRender={() => <div className="sash" />}
        >
          <Pane minSize={300} maxSize={300}>
            <div style={menu}>
              <Menu />
            </div>
          </Pane>
          <div style={middle}>{props.children[0]}</div>
          <Pane minSize={300} maxSize={300}>
            <div style={dragging}>{props.children[1]}</div>
          </Pane>
        </SplitPane>
      </div>
    </>
  );
}
