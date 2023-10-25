import { createContext, useState } from "react";
import { validarUsuario } from "../servicos/requisicoes/usuario";
import { pegarUsuarios } from "../servicos/FireBase/usuarios";

export const UsuarioContext = createContext({});

export function LoginContextProvider({ children }) {
  const [usuario, setUsuario] = useState({});

  async function Login(email, senha) {
    setUsuario({});
    const data = await pegarUsuarios();
    for (let i = 0; i < data.Nome.length; i++) {
      if (data.Email[i] === email && data.Senha[i] === senha) {
        setUsuario({
          Nome: data.Nome[i],
          Email: data.Email[i],
          Telefone: data.Telefone[i],
          Senha: data.Senha[i],
          CepsFavoritos: data.CepsFavoritos[i],
        });
        return usuario;
      }
    }
    return false;

    // const resultado = await validarUsuario(email, senha);
    // console.log(resultado)
    // if (resultado.length > 0) {
    //   setUsuario(resultado);
    //   return true;
    // } else {
    //   return false;
    // }
  }
  return (
    <UsuarioContext.Provider value={{ usuario, Login }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export default LoginContextProvider;
