import Container from 'react-bootstrap/Container'

import { Routes, Route } from 'react-router'
// pages
import { Home } from './views/Home'
import { About } from './views/About'
import { Contact } from './views/Contact'
import { Detail } from './views/Detail'
import { Login } from './views/Login'
import { Register } from './views/Register'
import { SearchResult } from './views/SearchResult'
import { Dashboard } from './views/Dashboard'
import { Logout } from './views/Logout'
// components
import { Header } from './components/Header'
import { Footer } from './components/Footer'
// logo
import logo from './assets/Vlogo.png'

function App() {
  return (
    <>
      <Header title="Verdictly" image={logo} />
      <Container fluid>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product/:productid" element={<Detail />} />
          <Route path="search/:query" element={ <SearchResult/> } />
          <Route path="dashboard" element={ <Dashboard/> } />
          <Route path="logout" element={ <Logout/> } />
        </Routes>
      </Container>
      <Footer title="Verdictly" image='' />
    </>
  )
}

export default App
