import { PromptTemplate } from "langchain/prompts"
import { embedder, splitter } from "./helperScripts/entityConfigs.js";
import { getVectoredData } from "./helperScripts/vectorise.js"

//Connect to db

const directoryToReadFrom = 'SFDX-Data/EOFSplitted';
const vectorStorePath = 'Vector-Store/EOF-Separated';

let vectorStore = await getVectoredData(splitter, vectorStorePath, embedder, directoryToReadFrom)

let result = await vectorStore.similaritySearch("show all  commands");

result.forEach(item => {
    console.log('-----------***************-------------------')
    console.log(item.pageContent)
    console.log(item.metadata.source)
    console.log('-----------***************-------------------')
})