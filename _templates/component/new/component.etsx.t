---
to: <%=path%>/<%=name%>.tsx
---
import {FC} from 'react'

type Props = {
  sample: string
}

/**
 * @package
 */
export const <%=name%>: FC<Props> = ({sample}) => {
  return <div>{sample}</div>
}
