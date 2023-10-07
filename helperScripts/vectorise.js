//Document Loading and Transforming
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { TextLoader } from "langchain/document_loaders/fs/text"

import { FaissStore } from "langchain/vectorstores/faiss";
import fs from 'fs/promises';

import dotenv from "dotenv";
dotenv.config();



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
    console.log('fie exist ',fileExists)
    if (fileExists) {
        vectorStore = await FaissStore.load(
            existingVectorStorefilePath,
            embedderInstance
        );
    } else {
        const directoryLoader = new DirectoryLoader(directoryPath, {
            ".pdf": (path) => new PDFLoader(path),
            ".txt": (path) => new TextLoader(path),
        })
        let splittedAndLoadedDocuments = await directoryLoader.load(splitterInstance, embedderInstance);
        vectorStore = await FaissStore.fromDocuments(
            splittedAndLoadedDocuments,
            embedderInstance
        );
        await vectorStore.save(existingVectorStorefilePath);
    }
    return vectorStore;
}

export { getVectoredData };
