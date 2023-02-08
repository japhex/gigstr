import { SecretsManager } from 'aws-sdk'

const region = 'us-east-1'
const client = new SecretsManager({ region })

export const getSecrets = async () => {
  try {
    const result = await client
      .getSecretValue({
        SecretId: 'gigstr',
      })
      .promise()
    return JSON.parse(result.SecretString)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
