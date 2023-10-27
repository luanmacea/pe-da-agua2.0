import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ViewBody: {
    padding: 25,
    // alignItems: "center",
  },
  ViewHeader: {
    alignItems: "center",
  },
  LogoAguaImage: {
    height: 210,
  },
  Titulo: {
    fontSize: 40,
    color: "#FFF",
    fontWeight: "500",
    marginVertical: 20,
  },
  Legenda: {
    color: "#d3d3d3",
    fontSize: 21,
    marginBottom: 20,
  },
  ViewBotao: {
    backgroundColor: "#228CA3",
    // width: "80%",
    marginVertical: 20,
  },
  TextoBotao: {
    color: "#FFF",
    fontWeight: "400",
    fontSize: 18,
    padding: 9,
    textAlign: "center",
  },
  TextoErro: {
    color: "#D3D3D3",
    fontSize: 16,
    paddingBottom: 12,
  },
  Input: {
    backgroundColor: "#EBEBEC",
    fontSize: 16,
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  InputError: {
    backgroundColor: "#EBEBEC",
    borderColor: "#FF0000",
    fontSize: 16,
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 3,
    borderWidth: 2,
    borderRadius: 3,
  },
  TituloInformacoes: {
    fontSize: 23,
    color: "#e0dada",
  },
  TextoInformacoes: {
    fontSize: 18,
    color: "#828181",
  },
  Dados: {
    paddingVertical: 5,
  },
});

export default estilos;
