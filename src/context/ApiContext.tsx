import React, {
  createContext,
  FC,
  ReactElement,
  useCallback,
  useState,
} from 'react'
import ethers from 'ethers'

interface ApiContextValue {
  provider: any
  signer: any
  login?: () => Promise<string>
}

const ApiContext = createContext<ApiContextValue>({
  provider: null,
  signer: null,
})

export const ApiProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [provider, setProvider] = useState()
  const [signer, setSigner] = useState()

  const login = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    const hash = await provider.send('eth_requestAccounts', [])

    const signer = provider.getSigner()

    setSigner(signer)
    setProvider(provider)

    return hash
  }, [])

  return (
    <ApiContext.Provider
      value={{
        provider,
        signer,
        login,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}
