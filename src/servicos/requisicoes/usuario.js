import api from "../api";

export async function cadastrarUsuario(data) {
  console.log(data)
  try {
    await api.post("/newUser/",{
      id: data.id,
      name: data.nome,
      phone: data.telefone,
      email: data.email,
      password: data.senha,
      CEP1: data.cep1,
      CEP2: data.cep2
    });
    return 'sucesso'
  } catch (error) {
    throw error;
  }
}
