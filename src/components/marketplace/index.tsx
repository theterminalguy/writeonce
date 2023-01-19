
import React, {useState} from "react";
import PipeListings from "./PipeListings"
import PipeDetails from "./PipeDetails"
import 'split-pane-react/esm/themes/default.css'
import Layout from "../UI/Layout";
import Menu from "../menu";
import "./index.css";


export default function Marketplace() {
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
            <div className="wrapper">
                <Layout>
                    <div> <Menu /> </div>
                    <div className={"scroll"}> <PipeListings displayPipeDetails={displayPipeDetails}/> </div>
                    <div> <PipeDetails pipe={selectedPipe}/> </div>
                </Layout>
            </div>
        </>
    );
}
