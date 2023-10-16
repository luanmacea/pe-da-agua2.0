import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ViewBody: {
    padding: 25,
  },
  Texto: {
    color: "#D3D3D3",
    fontSize: 16,
    paddingVertical: 3,
  },
  Input: {
    backgroundColor: "#EBEBEC",
    fontSize: 16,
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  Titulo: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "500",
  },
  Topo: {
    alignItems: "center",
  },
  ViewImagens: {
    flexDirection: "row",
  },
  ImgMulher: {
    // backgroundColor: "#FFF",
    // width: "2%",
    position: "absolute",
    top: "5%",
    left: '30%',
  },
  ImgNuvem: {
    // backgroundColor: "#FFF",
    // position: "absolute",
    top: "10%",
    right: "10%",
  },
  TituloCadastro: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "500",
    marginVertical: 20,
  },
  EsqueceuCaminho: {
    flexDirection: "row",
  },
  Esqueceu: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    padding: 20
  },
  TextoEsqueceu: {
    color: "#65B0E7",
    fontSize: 16,
    paddingVertical: 3
  }
});

export default estilos;
