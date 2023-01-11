import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

interface AppContextType {
  searchActive: boolean
  setSearchActive: Dispatch<SetStateAction<boolean>>
}

interface Props {
  children: ReactNode
}

export const AppContext = createContext<AppContextType>({
  searchActive: false,
  setSearchActive: () => {},
})

const AppProvider = ({ children }: Props) => {
  const [searchActive, setSearchActive] = useState<boolean>(false)

  const contextProps = {
    searchActive,
    setSearchActive,
  }

  return <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
}

export default AppProvider
