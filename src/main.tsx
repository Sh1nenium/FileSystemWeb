import { createRoot } from 'react-dom/client'
import './app/index.scss'
import { App } from './app'

createRoot(document.getElementById('root')!).render(
  <App />,
)
