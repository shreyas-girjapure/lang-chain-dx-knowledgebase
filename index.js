import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferWindowMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";

import dotenv from "dotenv";


dotenv.config();
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

// const llm = new ChatOpenAI({
//     modelName : "gpt-3.5-turbo",
//     openAIApiKey: OPEN_AI_KEY,
//     verbose :true
// })

const model = new ChatOpenAI({
    openAIApiKey: OPEN_AI_KEY,
    verbose: true,
})


const chatPrompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.",
    ],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
]);

const memory = new BufferWindowMemory({ k: 5 });
const chain = new ConversationChain({
    memory: memory,
    prompt: chatPrompt,
    llm: model,
});

const response = await chain.call({
    input: "My name is shreyas"
});
const response1 = await chain.call({
    input: "i live in india"
});


const response2 = await chain.call({
    input: "What is my name"
}
);
const response3 = await chain.call({
    input: "Where do i live"
}
);

console.log(response3);