import { ReactNode, Suspense } from 'react'
import type { Metadata } from 'next'
import '@/styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, type Theme } from '@mui/material/styles'
import { ModalProvider } from '@/components/tx-flow'
import PageLayout from '@/components/common/PageLayout'
import createEmotionCache from '@/utils/createEmotionCache'
import PacketThemeProvider from '@/components/theme/PacketThemeProvider'
import { useDarkMode } from '@/hooks/useDarkMode'
import WalletProvider from '@/components/common/WalletProvider'
import StoreProvider from '@/components/StoreProvider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const isDarkMode = useDarkMode()
  const themeMode = isDarkMode ? 'dark' : 'light'

  return (
    <PacketThemeProvider mode={themeMode}>
      <Suspense>
        <WalletProvider>
          <ModalProvider>{children}</ModalProvider>
        </WalletProvider>
      </Suspense>
    </PacketThemeProvider>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          <AppProviders>
            <CssBaseline />
            <PageLayout>{children}</PageLayout>
          </AppProviders>
        </body>
      </StoreProvider>
    </html>
  )
}
