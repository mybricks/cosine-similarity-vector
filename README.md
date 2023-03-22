# cosine-similarity-vector
cosine similarity for words vector lib

### 快速上手
```javascript
import CosSimer from '@mybricks/cosine-similarity-vector'

const cosSimer = new CosSimer({
  vectorLibs: [
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

cosSimer.getSimilarities('添加一个表单')

// { keyWord: '添加表单', content: `{ type: 'add', namespace: 'mybricks.normal-pc.form-container'}` }

```