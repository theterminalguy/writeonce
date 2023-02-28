import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import Menu from "../menu";
import "./layout.css";

interface LayoutProps {
  children: Array<React.ReactNode>;
  controller?: string;
}

export default function Layout(props: LayoutProps) {
  const [sizes, setSizes] = useState([300, "auto", 300]);
  const [, setDrag] = useState(false);

  return (
    <>
      <div className="vanilla__layout" data-controller={props.controller}>
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={setSizes}
          onDragStart={() => setDrag(true)}
          onDragEnd={() => setDrag(false)}
          sashRender={() => <div className="sash" />}
        >
          <Pane minSize={300} maxSize={300}>
            <div className="vanilla__splitpane__menu">
              <Menu />
            </div>
          </Pane>
          <div className="vanilla__splitpane__middle">{props.children[0]}</div>
          <Pane minSize={300} maxSize={300}>
            <div className="vanilla__splitpane__dragging">
              {props.children[1]}
            </div>
          </Pane>
        </SplitPane>
      </div>
    </>
  );
}
