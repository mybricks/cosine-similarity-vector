import { filterArray } from './utils'

interface Vector {
  [key: string]: number
}

function cosineSimilarity(str1: string, str2: string) {
  // 将字符串转换为分词数组
  const words1 = segment(str1);
  const words2 = segment(str2);

  // console.log(words1, words2)

  // 将分词数组转换为词频向量
  const vector1 = getVector(words1);
  const vector2 = getVector(words2);

  // 计算余弦相似度
  const dotProduct = getDotProduct(vector1, vector2);
  const magnitude1 = getMagnitude(vector1);
  const magnitude2 = getMagnitude(vector2);
  const similarity = dotProduct / (magnitude1 * magnitude2);

  return similarity;
}

function getVector(words: string[]) {
  const vector: Vector = {};
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!vector[word]) {
      vector[word] = 0;
    }
    vector[word]++;
  }
  return vector;
}

function getDotProduct(vector1: Vector, vector2: Vector) {
  let dotProduct = 0;
  for (const key in vector1) {
    if (vector2[key]) {
      dotProduct += vector1[key] * vector2[key];
    }
  }
  return dotProduct;
}

function getMagnitude(vector: Vector) {
  let sumOfSquares = 0;
  for (const key in vector) {
    sumOfSquares += vector[key] ** 2;
  }
  return Math.sqrt(sumOfSquares);
}

function segment(text: string) { // Todo... 后续可引入更加准确的分词库
  const words = Array.from(new Intl.Segmenter('cn', { granularity: 'word' }).segment(text)).map(item => item.segment)

  return words
}

class CosSimer {

  private vectorLibs: any[] = []

  constructor (props: any) { 
    this.vectorLibs = props.vectorLibs
  }

  public search (query: string, length: number = 1) {
    const simArray = this._getCosSims(query)

    const resSim = simArray.slice(0, length)

    return filterArray(this.vectorLibs, resSim.map(item => item.index))
  }

  public getMaxSimilarity (query: string) {
    const simArray = this._getCosSims(query)

    const maxSim = simArray[0]

    const maxVector = this.vectorLibs[maxSim.index]

    return maxVector
  }

  public addVectors (vectors: any[]) {
    this.vectorLibs = [...this.vectorLibs, ...vectors]
  }

  public updateVectors (vectors: any[]) {
    this.vectorLibs = [...vectors]
  }


  private _getCosSims (query: string) {
    const simArray: { index: number, cosSim: number }[] = []

    this.vectorLibs.map((item, index) => {
      const vectorStr = typeof item === 'string' ? item : JSON.stringify(item)
      const cosSim = cosineSimilarity(vectorStr, query)

      simArray.push({
        index,
        cosSim
      })
    })

    // 从大到小排序
    simArray.sort((a, b) => b.cosSim - a.cosSim)

    return simArray
  }
}

export default CosSimer



