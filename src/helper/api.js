import { GoogleGenAI } from "@google/genai";

const API = import.meta.env.VITE_GOOGLE_API_KEY
const ai = new GoogleGenAI({apiKey:API});

export const codegenerator = async (prompt) => {
    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt,
    });
  
    console.log(interaction);
  
    return interaction.output_text;
  };