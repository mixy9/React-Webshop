import React from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import PageNotFound from './pages/PageNotFound'
import ProductsPage from './pages/ProductsPage'
import { ModalProvider } from './ModalContext'
import { SnackbarProvider } from './SnackBarContext'

function App() {
  return (
    <SnackbarProvider>
      <ModalProvider>
        <Router>
          <Header />
          <main className="h-full">
            <div className="relative isolate">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/products" element={<ProductsPage />} />
              </Routes>
            </div>
          </main>
        </Router>
      </ModalProvider>
    </SnackbarProvider>
  )
}

export default App
