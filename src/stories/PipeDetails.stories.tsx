
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PipeDetails from '../components/marketplace/PipeDetails';

export default {
    title: 'Writeonce/PipeDetails',
    component: PipeDetails,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
} as ComponentMeta<typeof PipeDetails>;

const Template: ComponentStory<typeof PipeDetails> = (args) => <PipeDetails {...args} />;

export const PipeDetail = Template.bind({});
PipeDetail.args = {
    pipe: {
        imageUrl: "https://cdn-icons-png.flaticon.com/512/6052/6052250.png",
        title: "Email Pipe",
        summary: <p>This pipe allows users to send and <br/>receive electronic messages, <br/>commonly referred to as
            emails. <br/>These apps can be accessed on a <br/> variety of devices, including <br/> smartphones, tablets,
            and computers.</p>
    }
}
