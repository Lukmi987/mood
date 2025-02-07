import { ChatOpenAI, OpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import z from 'zod'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

const zodSchema = z.object({
  mood: z
    .string()
    .describe('the mood of the person who wrote the journal entry.'),
  negative: z
    .boolean()
    .describe(
      'is the journal entry negative? (i.e. does it contain negative emotions?).'
    ),
  summary: z.string().describe('quick summary of the entire entry.'),
  subject: z.string().describe('the subject of the journal entry.'),
  color: z
    .string()
    .describe(
      'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
    ),
  sentimentScore: z
    .number()
    .describe(
      'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
    ),
})

const parser = StructuredOutputParser.fromZodSchema(zodSchema)

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyze = async (entry) => {
  const input = await getPrompt(entry)
  const model = new ChatOpenAI({ model: 'gpt-4o-mini', temperature: 0 })
  const result = await model.invoke(input)
  try {
    return parser.parse(result.content)
  } catch (e) {
    console.log('error je', e)
  }
}

export const qa = async (question, entries) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    })
  })

  console.log('qa question 4', question)
  console.log('qa docs 5', docs)

  const model = new ChatOpenAI({ model: 'gpt-4o-mini', temperature: 0 })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings() // embeddings are group of vectors
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question) // At this point we know which entries we need to answer the question, based on the question these are selected entries
  //store.similaritySearch takes your question puts in the database
  // we need to answer the question

  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })
  console.log('qa docs 6', res)
  return res.output_text
}
