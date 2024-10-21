import React from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import PageNotFound from './pages/PageNotFound'
import ProductsPage from './pages/ProductsPage'
import ModalProvider from './contextApi/ModalContext'
import SnackbarProvider from './contextApi/SnackBarContext'
import AuthProvider, { useAuth } from './contextApi/AuthContext'
import LoadingSpinner from './components/ui/UiLoadingSpinner'
import CartProvider from './contextApi/CartContext'

const AppContent: React.FC = () => {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
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
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SnackbarProvider>
          <ModalProvider>
            <Router>
              <AppContent />
            </Router>
          </ModalProvider>
        </SnackbarProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
