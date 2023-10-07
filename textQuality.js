import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { CharacterTextSplitter } from "langchain/text_splitter";


import { FaissStore } from "langchain/vectorstores/faiss"
import fs from 'fs/promises';

import dotenv from "dotenv";
dotenv.config();

const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
const LOCAL_VECTOR_STORE_PATH = "TextVectorStore";
const DIRECTORY_PATH = "SFDX-Data/Texts/";

async function checkIfAlreadyVectorised(filePath) {
    let filePathToCheck = `${filePath}/faiss.index`;
    try {
        await fs.access(filePathToCheck);
        console.log(`File '${filePathToCheck}' exists.`);
        return true;
    } catch (err) {
        console.error(`File '${filePathToCheck}' does not exist.`);
        return false;
    }
}
async function getVectoredData(splitterInstance, existingVectorStorefilePath, embedderInstance, directoryPath) {
    const fileExists = await checkIfAlreadyVectorised(existingVectorStorefilePath);
    let vectorStore;
    console.log('fie exist ', fileExists)
    if (fileExists) {
        vectorStore = await FaissStore.load(
            existingVectorStorefilePath,
            embedderInstance
        );
    } else {
        const directoryLoader = new DirectoryLoader(directoryPath, {
            ".pdf": (path) => new PDFLoader(path),
            ".txt": (path) => new TextLoader(path)
        })
        let splittedAndLoadedDocuments = await directoryLoader.loadAndSplit(splitterInstance);
        vectorStore = await FaissStore.fromDocuments(
            splittedAndLoadedDocuments,
            embedderInstance
        );
        await vectorStore.save(existingVectorStorefilePath);
    }
    return vectorStore;
}


const embedder = new OpenAIEmbeddings({
    openAIApiKey: OPEN_AI_KEY
})

const splitter = new RecursiveCharacterTextSplitter({
    separators: ['EOF'],
    chunkSize : 1500,
    chunkOverlap : 50
});

const directoryLoader = new DirectoryLoader(DIRECTORY_PATH, {
    ".pdf": (path) => new PDFLoader(path),
    ".txt": (path) => new TextLoader(path)
})
let splittedAndLoadedDocuments = await directoryLoader.loadAndSplit(splitter);

console.log(splittedAndLoadedDocuments)
// let vectorStore = await getVectoredData(splitter, LOCAL_VECTOR_STORE_PATH, embedder, DIRECTORY_PATH)

// let queryString = "How to deploy metadata ";
// let allowedDocumentLimit = 5;


// let data = await vectorStore.similaritySearch(queryString, allowedDocumentLimit);
// console.log(data)
// let contextArray = data.map(item => item.pageContent)
// let contextString = contextArray.toString();
// console.log(contextString)

// let vectorQuery = await embedder.embedQuery(queryString);
// let data = await vectorStore.similaritySearchVectorWithScore(vectorQuery, allowedDocumentLimit);
// console.log(data.length)
// console.log(data)

