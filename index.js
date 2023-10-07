import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

import { PromptTemplate } from "langchain/prompts"
//import { getVectoredData } from "./vectorise.js"
import dotenv from "dotenv";
dotenv.config();

const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

const model = new OpenAI({
    openAIApiKey: OPEN_AI_KEY,
    verbose: true,
})

const embedder = new OpenAIEmbeddings({
    openAIApiKey: OPEN_AI_KEY
})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 500,
});

let queryString = "How does sample package.xml looks like , give examples and flag usage if there is information";

let prompt = PromptTemplate.fromTemplate("Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer Context: {context} \n Question: {question} \n Helpful Answer and Various Examples :" );

let formattedPrompt = await prompt.format({ context: contextString, question: queryString })
let response = await model.call(formattedPrompt)

console.log({ response });