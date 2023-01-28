
import React from "react";
import "./index.css"
import PipeCard from "../../UI/PipeCard";

export default function PipeListings(props: { displayPipeDetails: (sp: {imageUrl: string, title: string, summary: JSX.Element}) => void }) {

    const emailPipe = {
        imageUrl: "https://cdn-icons-png.flaticon.com/512/6052/6052250.png",
        title: "Email Pipe",
        summary: <p>This pipe allows users to send and <br/>receive electronic messages, <br/>commonly referred to as emails. <br/>These apps can be accessed on a <br/> variety of devices, including <br/> smartphones, tablets, and computers.</p>
    }

    const smsPipe = {
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3616/3616112.png",
        title: "SMS Pipe",
        summary: <p>This pipe allows users to send and <br/> electronic short messages, <br/>commonly referred to as SMS. <br/>These apps can be accessed on a <br/> variety of devices, including <br/> smartphones, tablets, and computers.</p>
    }

    const slackPipe = {
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3800/3800024.png",
        title: "Slack Pipe",
        summary: <p>This pipe allows users to send and <br/>receive electronic messages via slack, <br/>commonly referred to as slack messages. <br/>These apps can be accessed on a <br/> variety of devices, including <br/> smartphones, tablets, and computers.</p>
    }

    const teamsPipe = {
        imageUrl: "https://cdn-icons-png.flaticon.com/512/906/906349.png",
        title: "Teams Pipe",
        summary: <p>This pipe allows users to send and <br/>receive electronic messages, <br/>commonly referred to as emails. <br/>These apps can be accessed on a <br/> variety of devices, including <br/> smartphones, tablets, and computers.</p>
    }

    const pdfPipe = {
        imageUrl: "https://cdn-icons-png.flaticon.com/512/4726/4726010.png",
        title: "PDF Pipe",
        summary: <p>This pipe allows users to send and <br/>receive electronic messages, <br/>commonly referred to as emails. <br/>These apps can be accessed on a <br/> variety of devices, including <br/> smartphones, tablets, and computers.</p>
    }

    const invoicePipe = {
        imageUrl: "https://cdn-icons-png.flaticon.com/512/951/951764.png",
        title: "Invoice Pipe",
        summary: <p>This pipe allows users to send and <br/>receive electronic messages, <br/>commonly referred to as emails. <br/>These apps can be accessed on a <br/> variety of devices, including <br/> smartphones, tablets, and computers.</p>
    }



    return (
        <>
            <div className="vanilla__pipe__container">
                <PipeCard imageUrl={emailPipe.imageUrl} title={emailPipe.title} summary={emailPipe.summary} displayPipeDetails={props.displayPipeDetails}/>
                <PipeCard imageUrl={smsPipe.imageUrl} title={smsPipe.title} summary={smsPipe.summary} displayPipeDetails={props.displayPipeDetails}/>
                <PipeCard imageUrl={slackPipe.imageUrl} title={emailPipe.title} summary={emailPipe.summary} displayPipeDetails={props.displayPipeDetails} />
                <PipeCard imageUrl={teamsPipe.imageUrl} title={teamsPipe.title} summary={emailPipe.summary} displayPipeDetails={props.displayPipeDetails}/>
                <PipeCard imageUrl={pdfPipe.imageUrl} title={pdfPipe.title} summary={pdfPipe.summary} displayPipeDetails={props.displayPipeDetails}/>
                <PipeCard imageUrl={invoicePipe.imageUrl} title={invoicePipe.title} summary={invoicePipe.summary} displayPipeDetails={props.displayPipeDetails}/>
            </div>
        </>
    );
}
