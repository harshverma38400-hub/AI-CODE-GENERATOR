import { GoogleGenAI } from "@google/genai";

const API = import.meta.env.VITE_GOOGLE_API_KEY
const ai = new GoogleGenAI({apiKey:API});

export const  codegenerator =async(userQuery)=>{
  const prompt = promptGenerator(userQuery)
const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: prompt,
});

return interaction.output_text
}

export const promptGenerator = (userQuery) => {
  return `
Create a simple React functional component based on this description: "${userQuery}"

Requirements:
- Use React.createElement instead of JSX syntax.
- Keep it simple, no imports needed.
- Name the function 'GeneratedComponent'.
- Use inline styles as regular JavaScript objects.
- Don't use any JSX syntax. Use React.createElement instead.
- Don't include any markdown or code block syntax.
- Don't include any markdown explanation.
- Return only the component code without any markdown formatting or code block syntax.

Example format:

function GeneratedComponent() {
  return React.createElement(
    'div',
    { style: { padding: '10px' } },
    React.createElement(
      'button',
      {
        style: {
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px'
        },
        onClick: () => alert('Clicked!')
      },
      'Click me'
    )
  );
}
`;
};