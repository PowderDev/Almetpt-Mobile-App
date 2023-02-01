import { useFocusEffect } from "@react-navigation/native"
import { PropsWithChildren, useCallback, useContext } from "react"
import { View, StyleSheet, Text } from "react-native"
import { $api } from "../../lib/http"
import { AppContext } from "../Context/AppContext"

interface Props extends PropsWithChildren {}

const MissedClasses = ({}: Props) => {
  const { elco_session, name, setMissed, missed, journal } = useContext(AppContext)

  const fetchStats = async () => {
    try {
      const { data } = await $api.get(`/missed/${name}?elco_session=${elco_session}`)
      setMissed(data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCallback = useCallback(() => {
    if (missed.length == 0 && journal.length > 0) fetchStats()
  }, [journal])

  useFocusEffect(fetchCallback)

  return (
    <View style={styles.container}>
      {missed.map((missedClass) => (
        <View style={styles.item} key={`${missedClass.date}/${missedClass.number}`}>
          <Text style={styles.text}>{missedClass.date.replace(/ \d{4}гг./, "")}</Text>
          <Text style={styles.text}>{missedClass.number}</Text>
          <Text style={styles.text}>{missedClass.name}</Text>
        </View>
      ))}
    </View>
  )
}

export default MissedClasses

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  item: {
    padding: 8,
    paddingLeft: 0,
    flexDirection: "row",
    backgroundColor: "#FF7F7F",
    marginBottom: 8,
    borderRadius: 5,
  },

  text: {
    fontSize: 16,
    marginLeft: 8,
  },
})
