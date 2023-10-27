import axios from "axios";

const apiCep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export async function validarCep(cep) {
  try {
    const response = await apiCep.get(`${cep}/json/`);
    if (response.data.erro === true) {
      return false;
    } else {
      return true
    }
  } catch (error) {
    throw error;
  }
}
export async function pegarDadosCep(cep) {
  try {
    const response = await apiCep.get(`${cep}/json/`);
    if (response.data.erro === true) {
      return false;
    } else {
      return response.data.logradouro
    }
  } catch (error) {
    throw error;
  }
}