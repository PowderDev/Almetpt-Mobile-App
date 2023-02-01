import { useContext } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { AppContext } from "../components/Context/AppContext"
import ScheduleList from "../components/Schedule/ScheduleList"
import Header from "../components/ui/Header"
import { getMonth } from "../lib/helpers/date"

function ScheduleScreen() {
  const { chosenDate, chosenGroup } = useContext(AppContext)

  const displayDate = () => {
    return `${chosenDate.getDate()} ${getMonth(chosenDate.getMonth())} ${chosenDate.getFullYear()}`
  }

  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <Header />
        <Text style={styles.groupName}>{chosenGroup.name}</Text>
        <Text style={styles.chosenDate}>{displayDate()}</Text>
        <ScheduleList />
      </ScrollView>
    </View>
  )
}

export default ScheduleScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 12,
  },

  groupName: {
    textAlign: "center",
    fontSize: 26,
  },

  chosenDate: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 18,
  },
})
