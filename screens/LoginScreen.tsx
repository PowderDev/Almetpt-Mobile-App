import AuthContent from "../components/Auth/AuthContent"
import { Credentials } from "../components/Auth/AuthContent"
import { useContext } from "react"
import { AppContext } from "../components/Context/AppContext"
import { loginStud } from "../lib/http/queries"
import { storage } from "../App"

export function LoginScreen() {
  const { setIsAuth } = useContext(AppContext)

  const onSubmit = async (credentials: Credentials) => {
    try {
      await loginStud(credentials)
      storage.set("name", credentials.name)
      storage.set("password", credentials.password)
      storage.set("groupId", credentials.group.id)
      storage.set("groupName", credentials.group.name)
      setIsAuth(true)
    } catch (err) {
      console.log(err)
    }
  }

  return <AuthContent onAuthenticate={onSubmit} />
}

export default LoginScreen
