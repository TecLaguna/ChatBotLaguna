import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Traine from './pages/Traine.jsx'
import IntentClassifier from './pages/IntentClassifier.jsx'
function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path='/train' element={<Traine />} />
        <Route path='/intent' element={<IntentClassifier/>} />
      </Routes>
    </div>
  )
}

export default App
