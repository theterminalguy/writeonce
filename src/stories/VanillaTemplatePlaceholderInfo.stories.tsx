import { ComponentMeta, ComponentStory } from "@storybook/react"
import { TemplatePlaceholderInfo } from "../components/UI/TemplatePlaceholderInfo"

export default {
    title: "Writeonce/Placeholders/TemplatePlaceholderInfo",
    component: TemplatePlaceholderInfo
} as ComponentMeta<typeof TemplatePlaceholderInfo>

const Template: ComponentStory<typeof TemplatePlaceholderInfo> = (args) => <TemplatePlaceholderInfo />

export const Default = Template