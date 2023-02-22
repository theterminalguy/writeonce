
import React, {useRef} from "react";
import {sourcePipe} from "../../../PipeModel";
import "./index.css";

interface PipeDetailsProps {
    pipe: {
        imageUrl: string,
        title: string,
        summary: JSX.Element,
    }
}

export default function PipeDetails(props: PipeDetailsProps) {
    const installRef = useRef<HTMLButtonElement>(null);
    async function handleInstall() {
        installRef.current ? installRef.current.innerText = "Installing..." : "";
        const result = await sourcePipe(props.pipe.title)
        if (result.status) {
            installRef.current ? installRef.current.innerText = "Installed" : "";
        }else{
            installRef.current ? installRef.current.innerText = "Install" : "";
        }
    }

    return (
        <>
            {props.pipe.imageUrl &&
                <div className={"vanilla__detail"}>
                    <div >
                        <img src={props.pipe.imageUrl} alt={props.pipe.title} width="110" height="110"/>
                    </div>
                    <div className={"vanilla__detail__title"}>
                        {props.pipe.title}
                    </div>
                    {props.pipe.summary}
                    <button className="vanilla__detail-btn" onClick={handleInstall} ref={installRef}> Install </button>
                </div>
            }
        </>
    );
}
