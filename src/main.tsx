import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth.tsx'
import SuccessLogin from './pages/successLogin.tsx'
import { RecipeForm } from './components/index.ts';
import { ToastProvider } from './contexts/ToastContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/successLogin" element={<SuccessLogin />} />
          <Route path='/submit-recipe' element={<RecipeForm />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>,
)
