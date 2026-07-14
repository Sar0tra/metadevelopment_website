import Hero from './components/Hero'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Nav from './components/Nav'
import CustomCursor from './components/CustomCursor'
import {Analytics} from "@vercel/analytics/react"

function App() {
    return (
        <main className="min-h-screen bg-ink">
            <CustomCursor/>
            <Nav/>
            <Hero/>
            <Services/>
            <Contact/>
            <Footer/>
            <Analytics/>
            
        </main>
    )
}

export default App
