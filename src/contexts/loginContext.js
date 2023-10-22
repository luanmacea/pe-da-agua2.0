import { createContext, useState } from "react";
import { validarUsuario } from "../servicos/requisicoes/usuario";

export const UsuarioContext = createContext({});

export function LoginContextProvider({ children }) {
  const [usuario, setUsuario] = useState({});

  async function Login(email, senha) {
    const resultado = await validarUsuario(email, senha);
    console.log(resultado)
    if (resultado.length > 0) {
      setUsuario(resultado);
      return true;
    } else {
      return false;
    }
  }
  return (
    <UsuarioContext.Provider value={{ usuario, Login }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export default LoginContextProvider;