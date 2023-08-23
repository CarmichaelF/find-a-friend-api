import { UploadPetImages } from '../upload-pet-images/upload-pet-images-use-case'

export function makeUploadPetImages(){
	const useCase = new UploadPetImages()
	return useCase
}