import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NewTemplateCard } from "../components/UI/TemplateCard/NewTemplateCard";

export default {
    title: "Writeonce/Cards/NewTemplate",
    component: NewTemplateCard
} as ComponentMeta<typeof NewTemplateCard>

const Template: ComponentStory<typeof NewTemplateCard> = (args) => <NewTemplateCard />

export const Default = Template