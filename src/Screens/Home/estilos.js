import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  Container: {
    flex: 1
  },
  ViewBody: {
    padding: 25,
  },
  ViewWeather: {
    backgroundColor: '#034C5C',
    // backgroundColor: 'red',
    borderRadius: 34,
    width: '100%',
    height: '47%'
  },
  InputCep: {
		backgroundColor: "#EBEBEC",
    borderColor: "#ddd",
    color: "#444",
    borderRadius: 14,
    fontSize: 16,
    paddingHorizontal: 20,
    // marginRight: 10,
    flex: 1,
    height: 55,
  },
	Pesquisa: {
    flexDirection: "row",
    marginTop: 15,
    // marginBottom: 20,
	},
  ButtonPesquisar: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 14,
  },
  map: {
    width: '100%',
    height: '34%',
    marginTop: 20,
    marginBottom: 20,
  },
  TituloWeather: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginTop: 20,
  },
  ViewPrevisao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: '10%',
    marginTop: 5,
  },
  TextTemperatura: {
    color: "#FFF",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  TextDiaSemana: {
    color: "#FFF",
    fontSize: 14,
    // fontWeight: 100,
  }
});

export default estilos;
