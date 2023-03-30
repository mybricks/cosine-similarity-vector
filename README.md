# cosine-similarity-vector
cosine similarity for words vector lib

### 快速上手
```javascript
import CosSimer from '@mybricks/cosine-similarity-vector'

const cosSimer = new CosSimer({ // 初始化
  vectorLibs: [ // type: any[]
    {
      keyWord: '添加表单',
      content: `{ type: 'add', namespace: 'mybricks.normal-pc.form-container'}`,
    },
    {
      keyWord: '删除表单',
      content: `{ type: 'del', namespace: 'mybricks.normal-pc.form-container'}`,
    },
    {
      keyWord: '添加表格',
      content: `{ type: 'add', namespace: 'mybricks.normal-pc.table'}`,
    },
  ]
})

// 返回最相似记录 cosSimer.getMaxSimilarity(query: string): object
cosSimer.getMaxSimilarity('添加一个表单')

// 查询并返回 cosSimer.search(query: string, length?: number): array<any>
cosSimer.search('添加一个表单', 2)

// 增加向量库条目 cosSimer.addVectors(vectors: any[]): void
cosSimer.addVectors([{}, {}])

```