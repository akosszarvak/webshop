import { describe, it, expect } from 'vitest'
import { findItemById, findItemIndexById } from '@/utils/array'

describe('findItemById', () => {
  it('should find an item by its id', () => {
    const items = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' }
    ]
    const item = findItemById(items, '1')

    expect(item).toEqual({ id: '1', name: 'Item 1' })
  })

  it('should return undefined if item is not found', () => {
    const items = [{ id: '1', name: 'Item 1' }]
    const item = findItemById(items, '2')

    expect(item).toBeUndefined()
  })
})

describe('findItemIndexById', () => {
  it('should find the index of an item by its id', () => {
    const items = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' }
    ]
    const index = findItemIndexById(items, '2')

    expect(index).toBe(1)
  })

  it('should return -1 if item is not found', () => {
    const items = [{ id: '1', name: 'Item 1' }]
    const index = findItemIndexById(items, '2')

    expect(index).toBe(-1)
  })
})
