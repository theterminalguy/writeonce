
import React, {useState} from "react";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import Menu from "../menu"

interface LayoutProps {
    children: Array<React.ReactNode>;
}

export default function Layout(props: LayoutProps) {
    const [sizes, setSizes] = useState([200, 'auto', '25%']);
    const [drag, setDrag] = useState(false)

    const menu = {
        background: '#F8F8F8',
        height: window.innerHeight
    }

    const middle = {
        height: window.innerHeight
    }

    const dragging = drag ?
        {background: '#f1f1f1', borderLeft: '1px solid #00CCFF', height: window.innerHeight} :
        { background: '#f1f1f1', borderLeft: '1px solid #d4d4d4', height: window.innerHeight };

    return (
        <>
            <div style={{ height: window.innerHeight }}>
                <SplitPane
                    split='vertical'
                    sizes={sizes}
                    onChange={setSizes}
                    onDragStart={() => setDrag(true)}
                    onDragEnd={() => setDrag(false)}
                    sashRender={() => <div  className='sash' />}
                >
                    <Pane minSize={200} maxSize={200}>
                        <div style={menu}>
                            <Menu />
                        </div>
                    </Pane>
                    <div style={middle}>
                        {props.children[0]}
                    </div>
                    <Pane minSize={300} maxSize={800}>
                        <div style={dragging}>
                            {props.children[1]}
                        </div>
                    </Pane>
                </SplitPane>
            </div>
        </>
    );
}
