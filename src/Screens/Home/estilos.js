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
    flexDirection: "row",
    zIndex: 1000,
  },
  Estrela: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  Informacoes: {
    backgroundColor: "#034C5C",
    flexDirection: "row",
    marginVertical: 10
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
    width: 100,
    height: 100,
    margin: 10
  },
  Botao: {
    backgroundColor: "#d3d3d3",
    width: "100%",
    alignItems: "center",
    borderRadius: 5
  }
});

export default estilos;
