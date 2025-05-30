import {
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

// 你可以寫在 .env 或 config.js
const REGION = 'ap-southeast-2';
const BUCKET = 'machipower-uploads2';
const IDENTITY_POOL_ID = 'ap-southeast-2_pUZWPptE2';

const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: REGION },
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

export const uploadToS3 = async (file, userId, type) => {
  const key = `${userId}/${type}_${Date.now()}_${file.name}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file,
    ContentType: file.type,
  });

  await s3.send(command);

  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
};
