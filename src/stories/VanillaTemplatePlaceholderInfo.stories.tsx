import { ComponentMeta, ComponentStory } from "@storybook/react"
import { TemplatePlaceholderInfo } from "../components/UI/TemplatePlaceholderInfo"

export default {
    title: "Writeonce/Placeholders/TemplatePlaceholderInfo",
    component: TemplatePlaceholderInfo
} as ComponentMeta<typeof TemplatePlaceholderInfo>

const Template: ComponentStory<typeof TemplatePlaceholderInfo> = (args) => <TemplatePlaceholderInfo {...args} />

export const Default = Template.bind({});
Default.args = {
    type: "",
    title: "Customer Email",
    count: 4,
}

export const Email = Template.bind({})
Email.args = {
    type: "email",
    title: "Customer Email",
    count: 10,
}
export const PhoneNumber = Template.bind({})
PhoneNumber.args = {
    title: "Phone",
    count: 8,
    type: "phonenumber"
}
export const Date = Template.bind({})
Date.args = {
    title: "Due Date",
    count: 3,
    type: "date"
}
export const Number = Template.bind({})
Number.args = {
    title: "Amount",
    count: 1,
    type: "number"
}