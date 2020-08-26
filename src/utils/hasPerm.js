import store from '@/store'

export function hasPerm (permissions) {
  const role = store.getters.roleName
  return permissions.includes(role)
}
