import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Landing from './pages/Landing.jsx'
import Project from './pages/Project.jsx'
import Cycle from './pages/Cycle.jsx'
import Leafrush from './pages/Leafrush.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    // mode="wait" → the outgoing page finishes its fade before the next enters.
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/work/:projectSlug" element={<Project />} />
        <Route path="/work/:projectSlug/:cycleSlug" element={<Cycle />} />
        <Route path="/leafrush" element={<Leafrush />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </>
  )
}
