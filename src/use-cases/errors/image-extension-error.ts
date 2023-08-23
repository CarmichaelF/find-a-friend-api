export class ImageExtensionError extends Error{
	constructor(){
		//TODO: Create an enum/array with the extensions accepted to have 1 source of truth
		super('Only png, jpeg and jpg files are accepted')
	}
}