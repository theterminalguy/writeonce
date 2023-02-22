import React from 'react'
import "./templateLayout.css"
import { TemplateCard } from "../../UI/TemplateCard"
import { NewTemplateCard } from '../../UI/TemplateCard/NewTemplateCard'



export const TemplateLayout = () => {
    const dummy = Array(20).fill({
        content: "Underwriters love to see their feedback addressed. The recent effects of disposable income on the equity market are pretty alarming Underwriters love to see their feedback addressed. The recent effects of disposable income on the equity market are pretty alarming Underwriters love to see their feedback addressed. The recent effects of disposable income on the equity market are pretty alarming",
        time: "3 months ago",
        title: "Letter of Introduction"
    }
    )
    return (
        <div className="vanilla__template-wrapper">
            <NewTemplateCard />
            {dummy.map((data, i) => <TemplateCard key={i} {...data} />)}
        </div>
    )
}
