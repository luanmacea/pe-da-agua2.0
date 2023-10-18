import api from "../api";

export async function cadastrarUsuario(data) {
  try {
    await api.post("/newUser/", {
      name: data.nome,
      phone: data.telefone,
      email: data.email,
      password: data.senha,
      CEP1: data.cep1,
      CEP2: data.cep2,
    });
    return "sucesso";
  } catch (error) {
    throw error;
  }
}

export async function verificarEmailRepetido(novoEmail) {
  try {
    const response = await api.get("/newUser/");
    // const emailJaUtilizado = usuarios.some(
    //   (usuario) => usuario["e-mail"] === novoEmail
    // );
    const Emails = response.data.map((usuario) => usuario["email"]);
    const emailJaUtilizado = Emails.some((email) => email === novoEmail);
    return emailJaUtilizado;
  } catch (error) {
    throw error;
  }
}
