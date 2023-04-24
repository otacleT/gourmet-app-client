---
to: <%=path%>/<%=name%>.tsx
---
import {FC} from 'react'

type Props = {
  sample: string
}

export const <%=name%>: FC<Props> = ({sample}) => {
  return <div>{sample}</div>
}
