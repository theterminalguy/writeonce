
import React from "react";
import "./index.css";

interface PipeDetailsProps {
    pipe: {
        imageUrl: string,
        title: string,
        summary: JSX.Element,
    }
}

export default function PipeDetails(props: PipeDetailsProps) {

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
                    <button className="vanilla__detail__btn"> Install </button>
                </div>
            }
        </>
    );
}
