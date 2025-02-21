import { type SchemaTypeDefinition } from 'sanity'
import { quiz } from './schema'
import { subscriber } from './subscriber'
import { userData } from './userdata'
import { courses } from './courses'
import { community } from './community'
import code from './code'
import { notes } from './notes'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [quiz, subscriber, userData, courses, community, code, notes],
}
