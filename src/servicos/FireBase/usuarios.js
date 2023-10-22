import apiFireBase from "../apiFireBase";

export async function cadastrarUsuario(data) {
  console.log("Usuario: ", data);
  try {
    await apiFireBase.post("/DadosClientes.json/", {
      name: data.nome,
      phone: data.telefone,
      email: data.email,
      password: data.senha,
      CEP1: data.cep1,
      CEP2: data.cep2,
    });
    return "Cadastrado!";
  } catch (error) {
    // throw error;
    return "Erro ao cadastrar!" + error;
  }
}
export async function verificarEmailRepetido(novoEmail) {
  try {
    const response = await apiFireBase.get("/DadosClientes.json/");
    const Emails = response.data.map((usuario) => usuario["email"]);
    const emailJaUtilizado = Emails.some((email) => email === novoEmail);
    return emailJaUtilizado;
  } catch (error) {
    throw error;
  }
}
export async function validarUsuario(email, senha) {
  try {
    const response = await apiFireBase.get(
      `/DadosClientes.json?email=${email}&password=${senha}`
    );
    return response.data;
  } catch (error) {
    throw error;
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
