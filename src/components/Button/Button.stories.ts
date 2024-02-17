import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        color: { control: 'select' },
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const LargeButtonPlayer1: Story = {
    args: {
        variant: 'normal',
        color: 'player1',
        children: 'Player 1',
    },
};

export const FWLargeButtonPlayer1: Story = {
    args: {
        variant: 'normal',
        color: 'player1',
        children: 'Player 1',
        fullWidth: true,
    },
};

export const LargeButtonPlayer2: Story = {
    args: {
        variant: 'normal',
        color: 'player2',
        children: 'Player 2',
    },
};

export const MediumButtonPlayer1: Story = {
    args: {
        variant: 'normal',
        color: 'player1',
        children: 'Player 1',
    },
};

export const MediumButtonPlayer2: Story = {
    args: {
        variant: 'normal',
        color: 'player2',
        children: 'Player 2',
    },
};

export const RotatedButtonPlayer1: Story = {
    args: {
        variant: 'rotated',
        color: 'player1',
        children: 'Player 1',
    },
};

export const RotatedButtonPlayer2: Story = {
    args: {
        variant: 'rotated',
        color: 'player2',
        children: 'Player 2',
    },
};
