export function setPropertyToStorage<T>(key: string, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value))
}
export function getPropertyFromStorage<T>(key: string): T {
  return JSON.parse(window.localStorage.getItem(key))
}
export function removePropertyFromStorage(key: string): void {
  window.localStorage.removeItem(key)
}
