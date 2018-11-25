import { chunk } from 'lodash'
import lazily from 'utils/lazily'

export default function chunkIntoPromises(list, chunkSize, callback) {
  if (!list.length) return []
  const chunks = chunkSize ? chunk(list, chunkSize) : list
  console.log(`starting ${chunks.length} batch(es) of size ${chunkSize}`)
  if (chunks.length === 1) return [lazy(chunks[0])]
  return chunks.map(lazy)

  function lazy(singleChunk) {
    return lazily(() => singleChunk.forEach(callback))
  }
}
