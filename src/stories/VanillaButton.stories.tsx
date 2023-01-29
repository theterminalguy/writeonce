import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Button } from "../components/atoms/Button"

export default {
    title: "Writeonce/atoms/Button",
    component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const ModalButton = Template.bind({});
ModalButton.args = {
    className: "vanilla__modal-content-btn",
    children: "ok"
}

export const PlaceholderButton = Template.bind({})
PlaceholderButton.args = {
    className: "vanilla__placeholder-item-header-btn",
    children: "B"
}

export const QuickFlowButton = Template.bind({})
QuickFlowButton.args = {
    className: "vanilla__quickflow-sidebar-button",
    children: "Install"
}

export const QuickFlowTabButton = Template.bind({});
QuickFlowTabButton.args = {
    className: "vanilla__quickflow-tab-btn",
    children: "Data"
}

export const FloatingToolbarButton = Template.bind({});
FloatingToolbarButton.args = {
    className: "vanilla__floating-toolbar-button",
    children: "Button"
}
export const FloatingToolbarBaseButton = Template.bind({});
FloatingToolbarBaseButton.args = {
    className: "vanilla__floating-toolbar-button-base",
    children: "Button"
}