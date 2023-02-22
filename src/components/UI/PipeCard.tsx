import React, {useState, useEffect, useRef} from "react";
import "./PipeCard.css"
import {sourcePipe} from "../../PipeModel";


interface PipeCardProps {
    imageUrl: string,
    title: string,
    summary: JSX.Element,
    displayPipeDetails?: (pipe: { imageUrl: string, title: string, summary: JSX.Element }) => void
}

export default function PipeCard(props: PipeCardProps): JSX.Element {
    const installRef = useRef<HTMLButtonElement>(null);
    const [selected, setSelected] = useState({
        imageUrl: props.imageUrl,
        title: props.title,
        summary: props.summary
    });

    useEffect(() => {
        setSelected({
            imageUrl: props.imageUrl,
            title: props.title,
            summary: props.summary
        })
    }, []);


    const handleClick = () => {
        props.displayPipeDetails ? props.displayPipeDetails(selected) : "";
    }


    async function handleInstall() {
        installRef.current ? installRef.current.innerText = "Installing..." : "";
        const result = await sourcePipe(selected.title)
        if (result.status) {
            installRef.current ? installRef.current.innerText = "Installed" : "";
        } else {
            installRef.current ? installRef.current.innerText = "Install" : "";
        }
    }


    return (
        <>
            <div className="vanilla__card">
                <div className={"vanilla__card__upper"}>
                    <div className={"vanilla__card__image"}>
                        <img
                            src={props.imageUrl}
                            alt={props.title}
                            width="110"
                            height="110"
                        />
                    </div>
                    <div className={"vanilla__card__title"}>
                        <p> {props.title} </p>
                        <button className="vanilla__card-title-btn" onClick={handleInstall} ref={installRef}> Install
                        </button>
                        <button className="vanilla__card-title-btn" onClick={handleClick}> Details</button>
                    </div>
                </div>
                <div className={"vanilla__card__summary"}>
                    {props.summary}
                </div>
            </div>
        </>
    )
}
