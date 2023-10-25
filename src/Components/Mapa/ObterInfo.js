import data from "./dados/DispositivosGuardaChuva.json";

// Passo 1 ------------------------------
export function VerificarAreas(
  localizacao,
  setNivelDeChuva,
  setUmidade,
  setTemperatura
) {
  console.log("procurando: ", localizacao);
  let guardaChuvaIdEncontrado = null;

  for (let i = 0; i < data.length; i++) {
    const GuardaChuva = data[i];
    var vertice_1 = GuardaChuva.GuardaChuvaArea.vertice_1;
    var vertice_2 = GuardaChuva.GuardaChuvaArea.vertice_2;
    var vertice_3 = GuardaChuva.GuardaChuvaArea.vertice_3;
    var vertice_4 = GuardaChuva.GuardaChuvaArea.vertice_4;
    var vertice_5 = GuardaChuva.GuardaChuvaArea.vertice_5;
    var vertice_6 = GuardaChuva.GuardaChuvaArea.vertice_6;

    const vertices = [
      vertice_1,
      vertice_2,
      vertice_3,
      vertice_4,
      vertice_5,
      vertice_6,
    ];

    console.log("---------------------------------------------------");
    console.log(GuardaChuva.GuardaChuvaId);

    var estaDentro = pontoDentroDoPoligono(localizacao, vertices);

    if (estaDentro) {
      console.log("Guarda Chuva encontrado");

      guardaChuvaIdEncontrado = GuardaChuva.GuardaChuvaId;
      pegaDados(
        guardaChuvaIdEncontrado,
        setNivelDeChuva,
        setUmidade,
        setTemperatura
      );
      break;
    } else {
      setNivelDeChuva("Nao encontrado");
      setUmidade("Nao encontrado");
      setTemperatura("Nao encontrado");
      console.log("Guarda chuva nao encontrado");

      estaDentro = false;
    }
  }

  if (guardaChuvaIdEncontrado) {
    return guardaChuvaIdEncontrado;
  } else {
    return "Nenhum Guarda Chuva encontrado";
  }
}

// Passo 2 ------------------------------
function pontoDentroDoPoligono(ponto, vertices) {
  let dentro = false;

  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const vertice1 = vertices[i];
    const vertice2 = vertices[j];

    const intersecta =
      vertice1.lng > ponto.lng !== vertice2.lng > ponto.lng &&
      ponto.lat <
        ((vertice2.lat - vertice1.lat) * (ponto.lng - vertice1.lng)) /
          (vertice2.lng - vertice1.lng) +
          vertice1.lat;

    if (intersecta) {
      dentro = true;
    }
  }

  return dentro;
}

// Passo 3 ------------------------------
function pegaDados(Id, setNivelDeChuva, setUmidade, setTemperatura) {
  console.log("id do negocio: ", Id);
  var myHeaders = new Headers();
  myHeaders.append("device-token", Id);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  var apiUrl = `https://api.tago.io/data?`;

  fetch(apiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      if (result.result && result.result.length > 0) {
        var data = result;

        setUmidade(data.result[2].value);
        setNivelDeChuva(data.result[1].value);
        setTemperatura(data.result[3].value);

        console.log("--------------------");
        console.log("Nivel de Chuva: ", data.result[1].value);
        console.log("Umidade: ", data.result[2].value);
        console.log("Temperatura: ", data.result[3].value);
      } else {
        console.error("API response is missing expected data.");
      }
    })
    .catch((error) => console.log("error", error));
}
