import { Nav } from './components/ui/Nav'
import { Hero } from './components/sections/Hero'
import { Philosophy } from './components/sections/Philosophy'
import { Services } from './components/sections/Services'
import { Process } from './components/sections/Process'
import { Gallery } from './components/sections/Gallery'
import { Configurator } from './components/sections/Configurator'
import { Faq } from './components/sections/Faq'
import { Booking } from './components/sections/Booking'
import { Footer } from './components/sections/Footer'
import { ConfiguratorProvider } from './lib/configurator-context'

function App() {
  return (
    <ConfiguratorProvider>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Process />
        <Gallery />
        <Configurator />
        <Faq />
        <Booking />
      </main>
      <Footer />
    </ConfiguratorProvider>
  )
}

export default App
