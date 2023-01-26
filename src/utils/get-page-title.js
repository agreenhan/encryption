import defaultSettings from '@/settings'

const title = defaultSettings.title || '文本数据加解密平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
