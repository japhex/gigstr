import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

interface AppContextType {
  searchActive: boolean
  setSearchActive: Dispatch<SetStateAction<boolean>>
  searchLoading: boolean
  setSearchLoading: Dispatch<SetStateAction<boolean>>
}

interface Props {
  children: ReactNode
}

export const AppContext = createContext<AppContextType>({
  searchActive: false,
  setSearchActive: () => {},
  searchLoading: false,
  setSearchLoading: () => {},
})

const AppProvider = ({ children }: Props) => {
  const [searchActive, setSearchActive] = useState<boolean>(false)
  const [searchLoading, setSearchLoading] = useState<boolean>(false)

  const contextProps = {
    searchActive,
    setSearchActive,
    searchLoading,
    setSearchLoading,
  }

  return <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
}

export default AppProvider
