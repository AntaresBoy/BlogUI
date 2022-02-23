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

// /**
//  * @description 将数组转换为指定的属性的字典数组
//  * @param arr 数组
//  * @param fields 字典的属性
//  */
// export function arrayToDict(arr: string[], fields: string[]) {
//   const ret: any[] = []
//   const items = XEUtils.uniq(arr)
//   items.forEach((item: string) => {
//     const tmpDict: any = {}
//     fields.forEach((field: string) => {
//       tmpDict[field] = item
//     })
//     ret.push(tmpDict)
//   })
//   return ret
// }

/**
 * @description 优化终极版;该方式可解决对象循环引用报错和对象内函数深拷贝失败的问题
 * 相比JSON序列化与反序列化方式更完美
 * @param {Array || Object} target 目标对象
 * @param {Map} map
 * @returns
 */
export function deepCopy(target: any, map = new Map()) {
  if (typeof target === 'object' && target) {
    const catchTarget = map.get(target)
    if (catchTarget) {
      return catchTarget
    }
    const isArray = Array.isArray(target)
    const result: any = isArray ? [] : {}
    map.set(target, result)
    if (isArray) {
      target.forEach((curItem: any, index: number) => {
        result[index] = deepCopy(curItem, map)
      })
    } else {
      Object.keys(target).forEach((key) => {
        result[key] = deepCopy(target[key], map)
      })
    }
    return result
  } else {
    return target
  }
}
