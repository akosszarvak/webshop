export function findItemById(items, id) {
  return items.find((item) => item.id === id)
}

export function findItemIndexById(items, id) {
  return items.findIndex((item) => item.id === id)
}
