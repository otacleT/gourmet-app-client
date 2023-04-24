---
to: <%=path%>/<%=name%>.stories.tsx
---
import {Meta, StoryObj} from '@storybook/react'

import {<%=name%>} from '.'

const meta: Meta<typeof <%=name%>> = {
  title: '<%=name%>',
  component: <%=name%>,
}

export default meta
type Story = StoryObj<typeof <%=name%>>

export const Primary: Story = {
  args: {
    sample: 'sample',
  },
}