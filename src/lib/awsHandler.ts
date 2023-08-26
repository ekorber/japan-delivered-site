import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

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

