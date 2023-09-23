import React from 'react'
import SideBar from './components/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path='' element={<SideBar />}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App