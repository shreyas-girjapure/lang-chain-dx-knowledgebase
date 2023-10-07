import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { Pinecone } from "@pinecone-database/pinecone";

import dotenv from "dotenv";


dotenv.config();

const PINECONE_KEY = process.env.PINECONE_KEY;
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

const model = new OpenAI({
    openAIApiKey: OPEN_AI_KEY,
    verbose: true,
})

const embedder = new OpenAIEmbeddings({
    openAIApiKey: OPEN_AI_KEY
})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
});

const pinecone = new Pinecone({
    environment: "gcp-starter",
    apiKey: PINECONE_KEY,
});

export { model, embedder, splitter, pinecone };

