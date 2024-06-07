# 开源模型的使用（生成式）

## 前置知识

- [langchainjs](https://js.langchain.com/v0.2/docs/introduction/)
- [huggingface](https://huggingface.co/)
- [Ollama](https://ollama.com/)


## 案例介绍
- 功能描述：文本和图片生成
- 案例截图:

![fbe648ad-618d-4586-a19b-22c67ec5d806](https://github.com/rookiewxy/langchainjs-demo/assets/65204427/382c0845-181e-4c24-8a6a-ff670abaa7dd)


## 实现方案
- 方案一：langchainjs + Ollama
- 方案二：langchainjs + Huggingface

## langchainjs
langchainjs是基于langchain（python版）开发的，功能可能还没有python版的全，现在也有[langchain的java版](https://github.com/langchain4j/langchain4j)那么他的作用是啥呢？简单一句话就是统一了大模型的调用接口，相当于一个适配器，上层供开发者使用，下层调用各种ai大模型和接口，他已经支持`aws`、`openai`、`huggingface`等等大模型的接入

## Ollama
`Ollama`是一个大模型服务工具，操作简单易上手，例如我需要下载`llama3`模型，按照以下步骤实现

- 第一步：官网下载[Ollama](https://ollama.com/)支持mac、windows、linux
- 第二步：![2dca64c7-3a9e-4831-ac79-1972d47084a2](https://github.com/rookiewxy/langchainjs-demo/assets/65204427/a5f1ca64-b018-410e-965d-e7ff33948d6b)
终端执行命令`ollama run llama3`,下载llama3模型
- 第三步：`ollama list`查看对应的模型Name，列表里就会出现llama3，需要和`langchainjs`对接的时候使用，当作`modelId`
- 第四步：`Ollama`默认的服务地址是`127.0.0.1:11434`如果遇到 跨域的情况,需要设置环境变量,参考该文https://blog.csdn.net/QiZi_Zpl/article/details/137133486
- 第五步：模型已经下载成功，就可以和langchainjs进行对接

代码实现，可以看github仓库

## HuggingFace
HuggingFace是一个开源的自然语言模型仓库，其中有非常多的开源模型，他也提供了开发者接口，可以单独安装他的开发包进行对接，不过langchainjs已经对它进行了集成，所以直接调hf模块就可以，例如我想实现一个text2image的功能，可以按一下步骤来实现

- 第一步：申请`apikey`![d4799d11-5751-4ba2-b3e5-6576cf0f17ca](https://github.com/rookiewxy/langchainjs-demo/assets/65204427/14ff34f8-2bd3-4913-b8df-7c6b30c72142)
- 第二步：复制模型的id![b35f8218-6c5b-496e-8ebe-7cb7c345da9a](https://github.com/rookiewxy/langchainjs-demo/assets/65204427/c478122b-0762-4eef-9a11-7bbcfdcc2d71)
- 第三步：完成前面两步，就可以和langchainjs对接了,使用功能的时候，可能需要用点魔法，因为内部是直接点的huggingface模型地址的接口，所以可能需要翻墙

代码实现，可以看github仓库

需要下载HuggingFace的模型话，可以使用Huggingface Cli，具体可看https://huggingface.co/docs/huggingface_hub/guides/cli


## 总结
`Ollama`适合大模型语言的本地化部署，有一些模型在`Ollama`上并没有开源，就可以使用`HuggingFace`上的模型，`HuggingFace`提供了更广泛的LLM平台， 使用`HuggingFace`的弊端就是考虑网络情况

