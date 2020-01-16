import axios from "axios";

const instant = axios.create({
  baseURL: "https://react-my-burger-13557.firebaseio.com/",
  headers: {
    Accept: "appliacation/json",
    "Content-Type": "application/json"
  }
});

export default instant;
