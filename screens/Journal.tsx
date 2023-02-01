import { ScrollView, StyleSheet, Text, View } from "react-native"
import GradesList from "../components/Journal/GradesList"
import MissedClasses from "../components/Journal/MissedClasses"
import OverallStats from "../components/Journal/OverallStats"
import Header from "../components/ui/Header"

function JournalScreen() {
  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <Header isSchedule={false} />
        <GradesList />
        <OverallStats />
        <MissedClasses />
      </ScrollView>
    </View>
  )
}

export default JournalScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 12,
  },
})
