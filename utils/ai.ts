import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import z from 'zod'

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
  // sentimentScore: z
  //   .number()
  //   .describe(
  //     'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
  //   ),
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
  console.log('moje entry je **************************', entry)
  const input = await getPrompt(entry)
  const model = new ChatOpenAI({ model: 'gpt-4o-mini', temperature: 0 })
  const result = await model.invoke(input)
  console.log('moje result je **************************', result)
  try {
    return parser.parse(result.content)
  } catch (e) {
    console.log('error je', e)
  }
}
