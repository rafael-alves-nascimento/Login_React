import Cadastro from './Componentes/Cadastro/Cadastro';
import Login from './Componentes/Login/Login';
import {BrowserRouter, Routes, Route} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes> 
          <Route path='/' element={<Login/>} />  
          <Route path='/Cadastro' element={<Cadastro/>} />  
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
