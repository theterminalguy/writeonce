import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TemplateCard } from "../components/UI/TemplateCard";

export default {
    title: "Writeonce/Cards/Template",
    component: TemplateCard
} as ComponentMeta<typeof TemplateCard>

const Template: ComponentStory<typeof TemplateCard> = (args) => <TemplateCard {...args} />

export const DefaultCard = Template.bind({});
DefaultCard.args = {
    content: "Underwriters love to see their feedback addressed. The recent effects of disposable income on the equity market are pretty alarming Underwriters love to see their feedback addressed. The recent effects of disposable income on the equity market are pretty alarming Underwriters love to see their feedback addressed. The recent effects of disposable income on the equity market are pretty alarming",
    time: "3 months ago",
    title: "Letter of Introduction"
}
