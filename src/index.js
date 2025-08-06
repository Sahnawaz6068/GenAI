import express from "express";
import { config } from "dotenv";
import { main } from "./index1.js";

const app = express();

app.use(express.json());
config({ path: "../.env" });
const PORT = process.env.PORT;

/*
    We will put our user History here.
    in key value pair
    key -->user id
    value -->message array []
*/
const chatHistory = {
  1: [],
  2: [],
};

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Oho bete Generative AI sikh Rahe ho",
  });
});

//Hit GenAi
app.post("/chat", async (req, res) => {
  const { text, id } = req.body;
  const id1 = parseInt(id);

  if (!text || !id1) {
    return res.status(400).json({ error: "text and id are required" });
  }

  if (!chatHistory[id1]) {
    chatHistory[id1] = [];
  }

  //User history find from storage
  const History = chatHistory[id1];

  //history+Current
  const promptMessage = [
    ...History,
    {
      role: "user", //Current text
      parts: [{ text: text }],
    },
  ];
  console.log(promptMessage);
  const answer = await main(promptMessage);

  History.push({ role: "user", parts: [{ text: text }] });
  History.push({ role: "model", parts: [{ text: answer }] });

  res.send(answer);
});

app.listen(PORT, () => {
  console.log(`app listen on PORt: ${PORT}`);
});
