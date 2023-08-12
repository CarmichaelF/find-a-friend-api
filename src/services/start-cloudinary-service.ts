import { env } from '@/env'
import { v2 as cloudinary } from 'cloudinary'

export default function startCloudinary() {
	cloudinary.config({
		cloud_name: env.CLOUDINARY_CLOUD_NAME,
		api_key: env.CLOUDINARY_KEY,
		api_secret: env.CLOUDINARY_SECRET,
	})
}
