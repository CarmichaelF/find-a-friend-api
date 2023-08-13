import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
	PORT: z.coerce.number().default(3333),
	HASH_SALT: z.coerce.number(),
	MAPS_API_KEY: z.string(),
	JWT_SECRET: z.string(),
	CLOUDINARY_CLOUD_NAME: z.string(),
	CLOUDINARY_KEY: z.string(),
	CLOUDINARY_SECRET: z.string()
})
const _env = envSchema.safeParse(process.env)

if (!_env.success)
	throw new Error(`Invalid environment variables: ${JSON.stringify(_env.error.format())}`)

export const env = _env.data
