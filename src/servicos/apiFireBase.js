import axios from "axios";

const apiFireBase = axios.create({
  baseURL: "https://pe-dagua-47d38-default-rtdb.firebaseio.com",
})

export default apiFireBase