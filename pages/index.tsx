import { SSRProvider } from '@react-aria/ssr'

import { AppProvider } from '../components/app-provider'
import { Crate } from '../components/crate'
import { Footer, Head, Header } from '../components/home'
import { Wheel } from '../components/wheel'

export default function Home() {
  return (
    <SSRProvider>
      <AppProvider>
        <div className="min-h-screen p-10 bg-purple-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
          <Head />
          <div className="container mx-auto flex flex-col gap-20">
            <Header />
            <main className="flex flex-row flex-wrap gap-10 justify-center">
              <div className="flex-0">
                <Wheel />
              </div>
              <div className="flex-1">
                <Crate />
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </AppProvider>
    </SSRProvider>
  )
}
