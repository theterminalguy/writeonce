

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PipeCard from '../components/UI/PipeCard';

export default {
    title: 'Writeonce/PipeCard',
    component: PipeCard,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
} as ComponentMeta<typeof PipeCard>;

const Template: ComponentStory<typeof PipeCard> = (args) => <PipeCard {...args} />;

export const Pipe = Template.bind({});
Pipe.args = {
        imageUrl: "https://cdn-icons-png.flaticon.com/512/6052/6052250.png",
        title: "Email Pipe",
        summary: <p>This pipe allows users to send and <br/>receive electronic messages, <br/>commonly referred to as
            emails. <br/>These apps can be accessed on a <br/> variety of devices, including <br/> smartphones, tablets,
            and computers.</p>
}
