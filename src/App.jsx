import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Users from './pages/Users'
import Products from './pages/Products'
import Health from './pages/Health'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}> 
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="health" element={<Health />} />
      </Route>
    </Routes>
  )
}
