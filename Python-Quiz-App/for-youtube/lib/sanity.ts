import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  // token : process.env.SANITY_API_TOKEN || 'sk7JNQ6Zdruc0ZDuTr5N6QBZVMQvIcUfXSvmCVLzuoZe5zfrVW6nLzoMZmTu62VCaleTLZyQe08yTCKFCb1dTn8qsU0BpBGY5UQQh3nZf3C0XfMKJZCNwEPGeghL22pbnlKCNMqKmsPEjNoqr2g41qgnvhCBTZ9vrv1uwPJcLL4wSt8Rm9Se',
  useCdn: false,
}) 