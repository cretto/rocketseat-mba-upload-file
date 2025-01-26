import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async (
  server: FastifyInstance
) => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        body: z.object({
          name: z.string().min(3).max(255),
        }),
        response: {
          201: z.object({
            upload_url: z.string().url(),
          }),
          409: z.object({
            message: z.string().describe('Upload already exists'),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send({ upload_url: 'https://example.com' })
    }
  )
}
