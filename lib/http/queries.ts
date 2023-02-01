import { $api } from "."

export const loginStud = async (credentials: { name: string; password: string }) => {
  const { data } = await $api.post<{ elco_session: string }>("/login", credentials)
  return data.elco_session
}
