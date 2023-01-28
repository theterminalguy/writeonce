
import React, {useState} from "react";
import PipeListings from "./PipeListings"
import PipeDetails from "./PipeDetails"
import 'split-pane-react/esm/themes/default.css'
import Layout from "../UI/Layout";
import "./index.css";


export default function Marketplace(): JSX.Element {
    const [selectedPipe, setSelectedPipe] = useState({
        imageUrl: "",
        title: "",
        summary: <p></p>,
    });

    const displayPipeDetails = (sp: {imageUrl: string, title: string, summary: JSX.Element}) => {
        setSelectedPipe({
            imageUrl: sp.imageUrl,
            title: sp.title,
            summary: sp.summary
        });
    }

    return (
        <>
            <div className="vanilla__wrapper">
                <Layout>
                    <div className={"vanilla__scroll"}> <PipeListings displayPipeDetails={displayPipeDetails}/> </div>
                    <PipeDetails pipe={selectedPipe}/>
                </Layout>
            </div>
        </>
    );
}
