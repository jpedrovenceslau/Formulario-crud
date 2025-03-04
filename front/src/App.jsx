import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cadastro from "./pages/Cadastro"




const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Cadastro/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
