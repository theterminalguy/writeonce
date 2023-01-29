import React, {useState, useEffect} from "react";
import "./PipeCard.css"


interface PipeCardProps {
    imageUrl: string,
    title: string,
    summary: JSX.Element,
    displayPipeDetails?: (pipe: {imageUrl: string, title: string, summary: JSX.Element}) => void
}

export default function PipeCard(props: PipeCardProps){
    const [selected, setSelected] = useState({
        imageUrl: props.imageUrl,
        title: props.title,
        summary: props.summary
    });

    useEffect(() => {
        return () => {
            setSelected({
                imageUrl: props.imageUrl,
                title: props.title,
                summary: props.summary
            })
        };
    }, [selected]);


    const handleClick = () => {
        props.displayPipeDetails ? props.displayPipeDetails(selected) : "";
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
                        <button className="vanilla__card__title__btn"> Install </button>
                        <button className="vanilla__card__title__btn" onClick={handleClick}> Details </button>
                    </div>
                </div>
                <div className={"vanilla__card__summary"}>
                    {props.summary}
                </div>
            </div>
        </>
    )
}
