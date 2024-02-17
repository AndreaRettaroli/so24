import type { Meta, StoryObj } from '@storybook/react';

import { Background } from './Background';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Components/Background',
    component: Background,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof Background>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BG: Story = {
    args: {
        variant: 'normal',
        color: 'player1',
        text: 'Player 1',
    },
};
