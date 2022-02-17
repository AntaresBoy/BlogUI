import { isObject } from '@/utils/is'

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key])
  }
  return src
}

export function openWindow(url: string) {
  let windowOpener: any = window.open(url, '_blank')
  windowOpener.opener = null
}

// 将时间戳转换为YY-MM-DD hh:mm:ss
export function getYMDHMS(timestamp: number | string) {
  timestamp = typeof timestamp === 'number' ? timestamp : parseInt(timestamp)
  let time = new Date(timestamp)
  let year = time.getFullYear()
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const date = time
    .getDate()
    .toString()
    .padStart(2, '0')
  const hours = time
    .getHours()
    .toString()
    .padStart(2, '0')
  const minute = time
    .getMinutes()
    .toString()
    .padStart(2, '0')
  const second = time
    .getSeconds()
    .toString()
    .padStart(2, '0')
  return (
    year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
  )
}

//正则替换文本中的单引号 双引号否则存储mysql数据库时不生效
export function toLiteral(str: string) {
  const dict: any = {
    '\b': 'b',
    '\t': 't',
    '\n': 'n',
    '\v': 'v',
    '\f': 'f',
    '\r': 'r',
  }
  return str.replace(/([\\'"\b\t\n\v\f\r])/g, function($0, $1) {
    return '\\' + (dict[$1] || $1)
  })
}
