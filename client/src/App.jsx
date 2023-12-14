import React from "react"
// import "./components/Auth/index"
import Index from "./components/index/index"
import Auth from "./components/Auth/Auth"
import Appartement from "./components/appartement/appartement"

import { BrowserRouter,Route, Routes } from "react-router-dom"

function App() {
  return (
  <React.StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/appartement" element={<Appartement />} />
      </Routes>
      </BrowserRouter>
  </React.StrictMode>
  )
}

export default App