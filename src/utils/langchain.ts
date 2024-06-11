import { Ollama } from "@langchain/community/llms/ollama";
import { HuggingFaceInference } from "@langchain/community/llms/hf";
import axios from "axios";

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

async function translateToEnglish(text: string): Promise<string> {
  const response = await hf.translation({
    model: 'Helsinki-NLP/opus-mt-zh-en',
    inputs: text,
  }) as { translation_text: string };
  return response.translation_text;

}

export const generateImage = async (data: string) => {
  return new Promise((resolve) => {
    (async () => {
      const text = await translateToEnglish(data)


      // 方法一：使用国内镜像，加快访问速度
      const res = await axios.post("https://api-inference.hf-mirror.com/models/Corcelio/mobius", {
        model: 'Corcelio/mobius',
        inputs: text
      }, {
        headers: {
          'Authorization': `Bearer ${assetKey}`,
        },
        responseType: "blob",
        timeout: 50000000
      })
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const url = URL.createObjectURL(blob);
      resolve(url)


      // 方法二：直接使用
      // const { HfInference } = await HuggingFaceInference.imports();
      // const hf = new HfInference('assetKey');
      // const file = await hf.textToImage({
      //   model: 'Corcelio/mobius',
      //   inputs: text
      // },{
      //   wait_for_model: true
      // })

      // const blob = new Blob([file], { type: file.type });
      // const url = URL.createObjectURL(blob);
      // resolve(url)
    })()



  })


};
