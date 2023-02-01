import { useState } from "react"
import { StyleSheet, View } from "react-native"
import Button from "../ui/Button"
import { Group } from "../ui/ChooseGroupModal"
import { Credentials } from "./AuthContent"
import Course from "./Course"
import Input from "./Input"

interface Props {
  onSubmit: (val: Credentials) => void
  credentialsInvalid: { [key: string]: boolean }
}

function AuthForm({ onSubmit, credentialsInvalid }: Props) {
  const [enteredName, setEnteredName] = useState("")
  const [enteredPassword, setEnteredPassword] = useState("")
  const [chosenGroup, setChosenGroup] = useState({} as Group)

  const { name: nameIsInvalid, password: passwordIsInvalid } = credentialsInvalid

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case "name":
        setEnteredName(enteredValue)
        break
      case "password":
        setEnteredPassword(enteredValue)
        break
    }
  }

  function submitHandler() {
    onSubmit({
      name: enteredName,
      password: enteredPassword,
      group: chosenGroup,
    })
  }

  return (
    <View>
      <Input
        label="Логин"
        onChangeText={(val) => updateInputValueHandler("name", val)}
        value={enteredName}
        isInvalid={nameIsInvalid}
      />
      <Input
        label="Пароль"
        onChangeText={(val) => updateInputValueHandler("password", val)}
        value={enteredPassword}
        isInvalid={passwordIsInvalid}
      />

      <Course onGroupChange={setChosenGroup} groupName={chosenGroup.name} />

      <View style={styles.buttons}>
        <Button onPress={submitHandler}>Войти</Button>
      </View>
    </View>
  )
}

export default AuthForm

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
})
