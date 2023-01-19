
import React, {useState} from "react";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
// import "./index.css";

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
        background: '#F5F5F5',
        height: window.innerHeight
    }

    const dragging = drag ?
        {background: '#E0E0E0', borderLeft: '1px solid #00CCFF', height: window.innerHeight} :
        {background: '#E0E0E0', borderLeft: '1px solid #696969', height: window.innerHeight};

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
                            {props.children[0]}
                        </div>
                    </Pane>
                    <div style={middle}>
                        {props.children[1]}
                    </div>
                    <div style={dragging}>
                        {props.children[2]}
                    </div>
                </SplitPane>
            </div>
        </>
    );
}
