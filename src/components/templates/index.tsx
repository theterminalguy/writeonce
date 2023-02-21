import React from 'react'
import Layout from '../UI/Layout'
import { TemplateLayout } from "./TemplateLayout"
import { TemplateSidePanel } from './TemplateSidePanel'

const index = () => {
    return (
        <div className="wrapper">
            <Layout>
                <TemplateLayout />
                <TemplateSidePanel />
            </Layout>
        </div>
    )
}

export default index
