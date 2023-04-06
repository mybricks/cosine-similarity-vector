
// 根据index数组 过滤数组
export function filterArray (arr: any[], indexs: number[]) {
  const res: any[] = []
  indexs.forEach(i => {
    if (arr[i]) {
      res.push(arr[i])
    }
  })
  return res
}



export function filterPunctuation(str: string) {
  // 使用正则表达式匹配所有标点符号
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~！，。、；：？（）【】『』「」《》]/g;
  
  // 将匹配到的标点符号替换为空字符串
  return str.replace(regex, '');
}