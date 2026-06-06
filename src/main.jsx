import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import App from './App.jsx'
import { mdxComponents } from './components/mdxComponents.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* MDXProvider makes the custom case-study components (BLUF, PRD,
          MetricResult, Quote, Artifact, …) available inside every .mdx file
          with no per-file imports. */}
      <MDXProvider components={mdxComponents}>
        <App />
      </MDXProvider>
    </BrowserRouter>
  </StrictMode>
)
