import '../App.css'
import Home from './Home'
import Description from './Description.jsx'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <header className="header">
        <h1>New Zealand Foragers Glossary</h1>
      </header>
      <div className="appmain">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="plants/:id" element={<Description />} />
        </Routes>
      </div>
    </>
  )
}

export default App
