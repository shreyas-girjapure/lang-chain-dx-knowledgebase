import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

import { PromptTemplate } from "langchain/prompts"
import { getVectoredData } from "./vectorise.js"
import dotenv from "dotenv";
dotenv.config();

const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
const LOCAL_VECTOR_STORE_PATH = "VectorStore";
const DIRECTORY_PATH = "SFDX-Data/Trained";

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

let vectorStore = await getVectoredData(splitter, LOCAL_VECTOR_STORE_PATH, embedder, DIRECTORY_PATH)

let queryString = "How does sample package.xml looks like , give examples and flag usage if there is information";
let allowedDocumentLimit = 1;
// let data = await vectorStore.similaritySearch(queryString,allowedDocumentLimit);
// console.log(data)
// let contextArray = data.map(item => item.pageContent)
// let contextString = contextArray.toString();

let vectorQuery = await embedder.embedQuery(queryString);
let data = await vectorStore.similaritySearchVectorWithScore(vectorQuery, allowedDocumentLimit);
console.log(data.length)
console.log(data)
let contextArray = data.map(item => item[0].pageContent);
let contextString = contextArray.toString();

console.log(contextArray)
let systemPrompt = "You are a developer experience assistant You are good at providing helpful commands , their documentation and examples.";

let prompt = PromptTemplate.fromTemplate("Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer Context: {context} \n Question: {question} \n Helpful Answer and Various Examples :" );

let formattedPrompt = await prompt.format({ context: contextString, question: queryString })
let response = await model.call(formattedPrompt)


console.log({ response });