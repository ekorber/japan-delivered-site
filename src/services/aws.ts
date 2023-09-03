import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const awsBucketName = process.env.AWS_BUCKET_NAME
const awsBucketRegion = process.env.AWS_BUCKET_REGION

const s3 = new S3Client({
    region: awsBucketRegion,
})

export async function s3Put(file: Blob, name: string) {
    const params = {
        Bucket: awsBucketName,
        Key: name,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)
}

export async function s3Delete(name: string) {
    const params = {
        Bucket: awsBucketName,
        Key: name,
    }

    const command = new DeleteObjectCommand(params)
    await s3.send(command)
}

export async function getS3Url(name: string) {
    const params = {
        Bucket: awsBucketName,
        Key: name,
    }

    const command = new GetObjectCommand(params)
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })

    return url
}