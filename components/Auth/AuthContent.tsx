import { useState } from "react"
import { Alert, StyleSheet, View } from "react-native"
import AuthForm from "./AuthForm"
import { Colors } from "../../constants/styles"
import { Group } from "../ui/ChooseGroupModal"

export interface Credentials {
  name: string
  password: string
  group: Group
}

interface Props {
  onAuthenticate?: (val: Credentials) => void
}

function AuthContent({ onAuthenticate }: Props) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    password: false,
    group: false,
  })

  function submitHandler(credentials: Credentials) {
    let { name, password, group } = credentials

    name = name.trim()
    password = password.trim()

    const nameIsValid = name.length >= 6
    const passwordIsValid = password.length >= 3
    const groupIdIsValid = group.id.length >= 1

    if (!nameIsValid || !passwordIsValid || !groupIdIsValid) {
      Alert.alert("Ошибка входа", "Проверьте введенные данные")
      setCredentialsInvalid({
        name: !nameIsValid,
        password: !passwordIsValid,
        group: !groupIdIsValid,
      })
      return
    }
    onAuthenticate?.({ name, password, group })
  }

  return (
    <View style={styles.authContent}>
      <AuthForm onSubmit={submitHandler} credentialsInvalid={credentialsInvalid} />
    </View>
  )
}

export default AuthContent

const styles = StyleSheet.create({
  authContent: {
    marginTop: "auto",
    marginBottom: "auto",
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
})
