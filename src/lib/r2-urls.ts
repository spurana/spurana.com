import R2Service from '../services/r2'

const r2 = R2Service.getInstance()

export const rewriteAssetUrl = (url: string) => r2.rewriteAssetUrl(url)
export const rewriteContent = (content: string) => r2.rewriteContent(content)
export const getProxyUrl = (
  key: string,
  type?: 'file' | 'download' | 'image',
  filename?: string,
) => r2.getProxyUrl(key, type, filename)
