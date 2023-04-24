---
to: "<%= hasContext ? `${path}/contexts/SampleContext.tsx` : null %>"
---
import type {ReactNode} from 'react'
import {createContext, useContext, useEffect, useState} from 'react'

type ContextType = {
  new: string
}

const SampleContext = createContext<ContextType>({
  new: 'new',
})

export const SampleProvider = ({children}: {children: ReactNode}) => {
  const [sample, setSample] = useState<string>('new')

  useEffect(() => {
    setSample('new')
  }, [])

  return <SampleContext.Provider value={{new: sample}}>{children}</SampleContext.Provider>
}

export const useSample = () => {
  return useContext(SampleContext)
}

