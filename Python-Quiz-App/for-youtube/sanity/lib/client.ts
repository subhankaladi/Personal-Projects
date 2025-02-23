import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN || "sk7JNQ6Zdruc0ZDuTr5N6QBZVMQvIcUfXSvmCVLzuoZe5zfrVW6nLzoMZmTu62VCaleTLZyQe08yTCKFCb1dTn8qsU0BpBGY5UQQh3nZf3C0XfMKJZCNwEPGeghL22pbnlKCNMqKmsPEjNoqr2g41qgnvhCBTZ9vrv1uwPJcLL4wSt8Rm9Se",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
