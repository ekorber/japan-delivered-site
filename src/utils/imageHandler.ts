export function validateUploadedImages(images: Blob[], maxImageSize = 2000): boolean {

    for (let i = 0; i < images.length; i++) {

        //Check file type
        if (images[i].type != 'image/png' && images[i].type != 'image/jpeg' && images[i].type != 'image/webp') {
            console.log('Image Upload Failure: All image files need to be in a png, jpg/jpeg or webp format!')
            return false
        }

        //Check image size
        if ((images[i].size / 1024) > maxImageSize) {
            console.log('Image Upload Failure: All image files need to be less than 2MB in size!')
            return false
        }
    }

    return true
}