import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

import { keys } from '../data/keys'

type AppContext = {
  keyChange: string
  keyDown: string
  keyUp: string
  selectedKey: string
  setSelectedKey: Dispatch<SetStateAction<string>>
}
export const AppContext = createContext<AppContext>({} as AppContext)

export function displayKey(id: string) {
  return (keys.major[id] || keys.minor[id]).display
}

export function getKeyChange(id: string) {
  let isMajor = id.includes('A')
  let [number] = isMajor ? id.split('A') : id.split('B')
  return `${number}${isMajor ? 'B' : 'A'}`
}

export function getKeyDown(keys, id: string) {
  let keysList = Object.keys(keys)
  let i = keysList.indexOf(id) - 1
  return i < 0 ? keysList[keysList.length - 1] : keysList[i]
}

export function getKeyUp(keys, id: string) {
  let keysList = Object.keys(keys)
  let i = keysList.indexOf(id) + 1
  let result = i < keysList.length ? keysList[i] : keysList[0]
  return result
}

type AppProviderProps = { children: ReactNode }
export function AppProvider(props: AppProviderProps) {
  let { children } = props
  let [selectedKey, setSelectedKey] = useState('1A')
  let { major, minor } = keys
  let selectedKeys = selectedKey.includes('B') ? major : minor
  let keyUp = getKeyUp(selectedKeys, selectedKey)
  let keyDown = getKeyDown(selectedKeys, selectedKey)
  let keyChange = getKeyChange(selectedKey)

  return (
    <AppContext.Provider
      value={{
        keyChange,
        keyDown,
        keyUp,
        selectedKey,
        setSelectedKey,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useCamelotKeys() {
  let { keyChange, keyDown, keyUp, selectedKey, setSelectedKey } = useContext(
    AppContext
  )
  return { keyChange, keyDown, keyUp, selectedKey, setSelectedKey }
}
