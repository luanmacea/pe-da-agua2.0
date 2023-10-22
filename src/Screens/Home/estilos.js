import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  Container: {
    flex: 1
  },
  ViewBody: {
    paddingHorizontal: 25,
    paddingTop: 25,
    flex: 1
  },
  Titulo: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "500",
    marginTop: "20%"
  },
  Texto: {
    color: "#D3D3D3",
    fontSize: 16,
    paddingVertical: 3
  },
  Mapa: {
    width: "100%",
    height: 230,
    marginTop: "20%",
    marginBottom: 20,
  },
  Search: {
    position: "absolute",
    width: '100%',
    shadowColor: "#000",
    zIndex: 9999,
  },
  Informacoes: {
    backgroundColor: "#034C5C",
    flexDirection: "row",
    marginBottom: 20
  },
  ViewAvisos: {
    flex: 1,
    // backgroundColor: "#034C1C",
    alignSelf: "center",
  },
  TextoAvisos: {
    color: "#D3D3D3",
    fontSize: 21,
    paddingVertical: 3,
    textAlign: "center",
  },
  ImgInformacoes: {
    margin: 10
  }
});

export default estilos;
