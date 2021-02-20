import axios from "axios";

const getSecretWord = async (setSecretWord) => {
  const response = await axios.get("http://localhost:3030");
  setSecretWord(response.data);
};
const HookActions = {
  getSecretWord,
};
export default HookActions;
