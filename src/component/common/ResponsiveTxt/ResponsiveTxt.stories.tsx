import {Meta, StoryObj} from '@storybook/react'

import {ResponsiveTxt} from '.'

const meta: Meta<typeof ResponsiveTxt> = {
  title: 'ResponsiveTxt',
  component: ResponsiveTxt,
}

export default meta
type Story = StoryObj<typeof ResponsiveTxt>

export const Primary: Story = {
  args: {
    sample: 'sample',
  },
}
