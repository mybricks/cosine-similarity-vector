interface Vector {
  [key: string]: number
}

interface VectorLibItem {
  keyWord: string
  content: string
}

function cosineSimilarity(str1: string, str2: string) {
  // 将字符串转换为分词数组
  // const words1 = str1.trim().split(/[\s，。？！、；：“”【】《》‘’（）—…]+/);
  // const words2 = str2.trim().split(/[\s，。？！、；：“”【】《》‘’（）—…]+/);
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

  private vectorLibs: VectorLibItem[] = []

  constructor (props: any) { 
    this.vectorLibs = props.vectorLibs
  }

  public getSimilarities (query: string) {
    const simArray: { index: number, cosSim: number }[] = []
    // const val1 = '添加一个表单'
    // console.log('向量库', this.vectorLibs)
    // console.log('用户输入', query)

    this.vectorLibs.map((item, index) => {
      const cosSim = cosineSimilarity(item.keyWord, query)
      simArray.push({
        index,
        cosSim
      })
      // console.log(item, cosSim)
    })

    simArray.sort((a, b) => a.cosSim - b.cosSim)

    const maxSim = simArray[simArray.length - 1]

    const maxVector = this.vectorLibs[maxSim.index]

    // console.log('余弦相似性结果', maxSim)

    return maxVector
  }

  public addVectors (vectors: VectorLibItem[]) {
    this.vectorLibs = [...this.vectorLibs, ...vectors]
  }

  public updateVectors (vectors: VectorLibItem[]) {
    this.vectorLibs = [...vectors]
  }
}


export default CosSimer



