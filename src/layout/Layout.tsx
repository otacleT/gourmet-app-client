import type {ReactElement} from 'react'
import React from 'react'

import {Header} from './Header'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

/**
 * @package
 */
export const Layout = ({children}: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
