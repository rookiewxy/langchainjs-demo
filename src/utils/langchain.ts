import { Ollama } from "@langchain/community/llms/ollama";
import { HuggingFaceInference } from "@langchain/community/llms/hf";

// 配置 Ollama
export async function generate(params: string) {
  const ollama = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama2-chinese:latest",
  });

  const stream = await ollama.stream(params);
  
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return chunks.join("");
}



export const generateImage = async (data: string) => {
  const model = new HuggingFaceInference({
      model: "gpt2",
      apiKey: "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",
  });
  const res = await model.invoke("1 + 1 =");
  console.log({ res });
};