## Overview

### SFDX Helper

This is an AI  bot which will take contextual queries and be a good helper providing help in DX areas like 
1. Providing basic dx commands.
1. Helping in setting up stuff.
1. Provide help in shell scripting whenever asked.


### Plan

1. Front end

1. Back End
    1. Node
    1. Lang-Chain
1. LLM
    1. `gpt-3.5-turbo`
1. Embedding
    1. `text-embedding-ada-002`
1. Vector DB / Knowledge base
    1. PineCone
1. Documentation to train on
    1. `SFDX-Data/Trained` from project's directory
    1. `SFDX-Data/FutureScope` This data is not picked up for vectorization.

### Tasks

1. Setup Langchain  - **Done**
    1. ENV variables
    1. LLM Boilerplate
    1. Test response
1. Add Memory in conversation - **In Progress**
1. Load Documents from a directory
    1. Document loader's setup
    1. Load Only 2
    1. Test out responses.
1. Add a vector DB
    1. Look into pinecone docs
    1. Add Embbedings to documents
1. Query Optimization
    1. Vectorize query
    1. Check with non vectorized content
1. Retrieve Query
    1. Add vector query chain
1. Prompt Engineer Model
    1. Add Templates for Human and AI Conversation
1. Display output in console
1. Choose Frontend setup
1. Test out locally
1. Deploy

### Future scoped tasks
1. Look into [Retrieve](https://js.langchain.com/docs/modules/data_connection/retrievers/)