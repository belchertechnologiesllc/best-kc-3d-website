import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export interface ConfiguratorSelection {
  bloomId: string | null
  greeneryId: string | null
}

interface ConfiguratorContextValue {
  selection: ConfiguratorSelection
  setBloom: (id: string) => void
  setGreenery: (id: string) => void
}

const ConfiguratorContext = createContext<ConfiguratorContextValue | null>(null)

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<ConfiguratorSelection>({
    bloomId: null,
    greeneryId: null,
  })

  const value = useMemo<ConfiguratorContextValue>(
    () => ({
      selection,
      setBloom: (id) => setSelection((s) => ({ ...s, bloomId: id })),
      setGreenery: (id) => setSelection((s) => ({ ...s, greeneryId: id })),
    }),
    [selection],
  )

  return <ConfiguratorContext.Provider value={value}>{children}</ConfiguratorContext.Provider>
}

export function useConfigurator() {
  const ctx = useContext(ConfiguratorContext)
  if (!ctx) throw new Error('useConfigurator must be used within ConfiguratorProvider')
  return ctx
}
