import Container from 'react-bootstrap/Container'

import { Routes, Route } from 'react-router'
// pages
import { Home } from './views/Home'
import { About } from './views/About'
import { Contact } from './views/Contact'
import { Detail } from './views/Detail'
import { Login } from './views/Login'
import { Register } from './views/Register'
// components
import { Header } from './components/Header'
import { Footer } from './components/Footer'
// logo
import logo from './assets/logo-1933884_1280.png'

function App() {
  return (
    <>
      <Header title="Project" image={logo} />
      <Container fluid>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product/:productid" element={<Detail />} />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App
