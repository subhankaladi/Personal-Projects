import { type SchemaTypeDefinition } from 'sanity'
import { quiz } from './schema'
import { subscriber } from './subscriber'
import { userData } from './userdata'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [quiz, subscriber, userData],
}
