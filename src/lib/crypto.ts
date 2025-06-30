import crypto from 'crypto'

const rawKey = process.env.TOKEN_ENCRYPTION_KEY!
const key = Buffer.from(rawKey, rawKey.length === 64 ? 'hex' : 'utf8') // detect format

if (key.length !== 32) {
  throw new Error(`TOKEN_ENCRYPTION_KEY must be 32 bytes, got ${key.length}`)
}

const IV_LENGTH = 16 // AES block size

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export function decrypt(text: string): string {
  const [ivHex, encryptedHex] = text.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const encryptedText = Buffer.from(encryptedHex, 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
