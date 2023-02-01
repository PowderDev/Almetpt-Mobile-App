import { useNavigation } from "@react-navigation/native"
import { PropsWithChildren, useContext, useState } from "react"
import { View, StyleSheet } from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker"
import { AppContext } from "../Context/AppContext"
import Button from "./Button"
import ChooseGroupModal from "./ChooseGroupModal"

interface Props extends PropsWithChildren {
  isSchedule?: boolean
}

const Header = ({ isSchedule = true }: Props) => {
  const [isOpen, setOpen] = useState(false)
  const [isDatePickerOpen, setDatePicker] = useState(false)
  const { setChosenGroup, setChosenDate, chosenDate } = useContext(AppContext)
  const nav = useNavigation()

  return (
    <View style={[styles.container, !isSchedule && { marginTop: 15 }]}>
      {isSchedule ? (
        <>
          <Button
            textStyle={styles.chooseButtonText}
            style={styles.chooseButton}
            onPress={() => setOpen(true)}
          >
            Выбрать группу
          </Button>
          <Button
            textStyle={styles.chooseButtonText}
            style={styles.chooseButton}
            onPress={() => setDatePicker(true)}
          >
            Выбрать дату
          </Button>
        </>
      ) : null}

      <Button
        textStyle={styles.actionButtonText}
        style={[styles.actionButton, isSchedule && styles.activeActionButton]}
        onPress={() => nav.navigate("Schedule")}
      >
        Расписание
      </Button>

      <Button
        textStyle={styles.actionButtonText}
        style={[styles.actionButton, !isSchedule && styles.activeActionButton]}
        onPress={() => nav.navigate("Journal")}
      >
        Журнал
      </Button>

      <ChooseGroupModal isOpen={isOpen} onClose={() => setOpen(false)} onChoose={setChosenGroup} />
      <DateTimePicker
        mode="date"
        date={chosenDate}
        onCancel={() => setDatePicker(false)}
        isVisible={isDatePickerOpen}
        onConfirm={(v) => {
          setChosenDate(v)
          setDatePicker(false)
        }}
      />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  chooseButton: {
    width: "50%",
    borderRadius: 0,
    borderWidth: 1,
    marginBottom: 10,
  },

  chooseButtonText: {
    fontSize: 14,
    fontWeight: "400",
  },

  actionButton: {
    width: "50%",
    borderWidth: 0,
    marginBottom: 20,
    borderRadius: 0,
  },

  activeActionButton: {
    borderColor: "white",
    borderBottomWidth: 2,
  },

  actionButtonText: {},
})
