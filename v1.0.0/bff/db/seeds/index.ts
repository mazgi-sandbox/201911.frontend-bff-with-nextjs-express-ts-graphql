import { loadUsers } from './Users'

export async function loadDBSeeds(): Promise<void> {
  await loadUsers()
}
