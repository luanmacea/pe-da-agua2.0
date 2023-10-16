import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ViewBody: {
    padding: 25,
  },
  Topo: {
    alignItems: "center",
  },
  Titulo: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "500",
    marginVertical: 15,
    textAlign: "center",
  },
  ViewImagens: {
    flexDirection: "row",
  },
  ImgMulher: {
    // backgroundColor: "#FFF",
    width: "15%",
  },
  ImgHomem: {
    // backgroundColor: "#FFF",
    width: "20%",
  },
  TituloCadastro: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "500",
    marginVertical: 20,
  },
  Input: {
    backgroundColor: "#EBEBEC",
    fontSize: 16,
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  Texto: {
    color: "#D3D3D3",
    fontSize: 16,
  },
  EsqueceuCaminho: {
    flexDirection: "row",
  },
  Esqueceu: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  TextoEsqueceu: {
    color: "#65B0E7",
    fontSize: 16,
  }
});

export default estilos;
