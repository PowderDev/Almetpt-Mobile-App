import { useState } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"

import { Colors } from "../../constants/styles"
import ChooseGroupModal from "../ui/ChooseGroupModal"

interface Props {
  onGroupChange: (g: { id: string; name: string }) => void
  groupName: string
}

function Course({ onGroupChange, groupName }: Props) {
  const [isOpen, setOpen] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Группа</Text>

      <Pressable onPress={() => setOpen(true)} style={[styles.input]}>
        <Text style={styles.groupText}>{groupName || "Выберите группу"}</Text>
      </Pressable>

      <ChooseGroupModal isOpen={isOpen} onClose={() => setOpen(false)} onChoose={onGroupChange} />
    </View>
  )
}

export default Course

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },

  groupText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },

  inputInvalid: {
    backgroundColor: Colors.error100,
  },
})
