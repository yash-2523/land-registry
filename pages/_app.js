import '@/styles/globals.css'
import { Web3ContextProvider } from '@/context/Web3Context';
import RootLayout from '@/components/Layout';
import GlobalLoadingContextProvider from '@/context/LoadingContext';


export default function App({ Component, pageProps }) {
  return(
    <GlobalLoadingContextProvider>
    <Web3ContextProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Web3ContextProvider>
    </GlobalLoadingContextProvider>
  ) 
    
}
