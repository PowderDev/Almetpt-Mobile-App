import { PropsWithChildren, useState } from "react"
import { View, StyleSheet, Text, TouchableWithoutFeedback, Pressable, Button } from "react-native"
import { getMonth } from "../../lib/helpers/date"
import { JournalItem } from "../../lib/types"
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native"
import { Ionicons } from "@expo/vector-icons"

interface Props extends PropsWithChildren {
  item: JournalItem
}

const GradeListItem = ({ item }: Props) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Collapse isExpanded={isOpen} style={{ marginTop: 15 }}>
      <CollapseHeader>
        <TouchableWithoutFeedback onPress={() => setOpen(!isOpen)}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{item.className}</Text>
            <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={32} color={"#FFF2F2"} />
          </View>
        </TouchableWithoutFeedback>
      </CollapseHeader>

      <CollapseBody>
        {item.grades.map((gradesByMonth, i) => (
          <View key={i}>
            <Text style={styles.month}>{getMonth(gradesByMonth[0].month - 1, true)}</Text>

            <View style={styles.grid}>
              {gradesByMonth.map((grade, i) => (
                <View key={`${i}/${grade.day}/${grade.grade}/${item.className}/${grade.month}`}>
                  <Text style={styles.grade}>{grade.day}</Text>
                  <Text style={styles.grade}>{grade.grade}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </CollapseBody>
    </Collapse>
  )
}

export default GradeListItem

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#645CBB",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerText: {
    color: "white",
    flex: 0.9,
  },

  month: {
    fontSize: 18,
    textAlign: "center",
  },

  grid: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },

  grade: {
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 1,
    borderColor: "black",
    fontSize: 16,
  },
})
