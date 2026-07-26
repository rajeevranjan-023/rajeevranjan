import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'


import './styles/variables.css'
import './styles/base.css'
import './styles/animations.css'
import './styles/background.css'
import './styles/layout.css'
import './styles/sidebar.css'
import './styles/header.css'
import './styles/buttons.css'
import './styles/cards.css'
import './styles/utilities.css'
import './styles/hero.css'
import './styles/pages.css'
import './styles/footer.css'
import './styles/responsive.css'

import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
