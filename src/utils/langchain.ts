import { Ollama } from "@langchain/community/llms/ollama";
import { HuggingFaceInference } from "@langchain/community/llms/hf";


export async function generate(data: string) {
  const ollama = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama2-chinese:13b",
  });

  const stream = await ollama.stream(data);
  
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return chunks.join("");
}



export const generateImage = async (data: string) => {
    const { HfInference } = await HuggingFaceInference.imports();
  const hf = new HfInference('apikey');

  const file = await hf.textToImage({
    model: 'runwayml/stable-diffusion-v1-5',
    inputs: data
  });

  const blob = new Blob([file], { type: file.type });
  const url = URL.createObjectURL(blob);

  return url
};