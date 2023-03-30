
// 根据index数组 过滤数组
export function filterArray (arr: any[], index: number[]) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (index.includes(i)) {
      res.push(arr[i])
    }
  }
  return res
}
