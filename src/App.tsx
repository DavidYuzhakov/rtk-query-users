import Navigation from "./components/Navigation"
import { useAppSelector } from "./hooks/redux"
import Modal from "./components/Modal"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"

function App() {
  const isModal = useAppSelector(state => state.users.isModal)
  

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      {isModal && <Modal />}
    </>
  )
}

export default App
