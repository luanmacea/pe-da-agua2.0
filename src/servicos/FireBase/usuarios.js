import apiFireBase from "../apiFireBase";

export async function cadastrarUsuario(data) {
  console.log("Usuario: ", data);
  try {
    await apiFireBase.patch("/DadosClientes.json/", data);
    return "Cadastrado!";
  } catch (error) {
    // throw error;
    return "Erro ao cadastrar!" + error;
  }
}
export async function pegarUsuarios() {
  try {
    const response = await apiFireBase.get("/DadosClientes.json/");
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function pegandoCepEspecifico(cep) {
  // console.log(cep);
  try {
    const response = await apiFireBase.get(
      // "/DadosClientes/CepsFavoritos.json/"
      `/DadosClientes.json?orderBy="CepsFavoritos"&equalTo="${cep}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
