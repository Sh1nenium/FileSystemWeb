import { AppProvider } from './providers/app-provider';
import { AppRouter } from './providers/app-router';

export function App() {
  return (
    <AppProvider>
      <AppRouter/> 
    </AppProvider>
  )
}