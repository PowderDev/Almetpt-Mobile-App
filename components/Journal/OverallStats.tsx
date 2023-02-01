import { useFocusEffect } from "@react-navigation/native"
import { PropsWithChildren, useCallback, useContext } from "react"
import { View, StyleSheet, Text } from "react-native"
import { $api } from "../../lib/http"
import { JournalStats, JournalStatsKey } from "../../lib/types"
import { AppContext } from "../Context/AppContext"

interface Props extends PropsWithChildren {}

const OverallStats = ({}: Props) => {
  const { elco_session, name, setStats, overallStats, journal } = useContext(AppContext)

  const fetchStats = async () => {
    try {
      const { data } = await $api.get<JournalStats>(`/overall/${name}?elco_session=${elco_session}`)
      setStats(data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCallback = useCallback(() => {
    if (Object.keys(overallStats).length === 0 && journal.length > 0) fetchStats()
  }, [journal])

  useFocusEffect(fetchCallback)

  return (
    <View style={styles.container}>
      {(Object.keys(overallStats) as JournalStatsKey[]).map((color, i) => (
        <Text style={[styles.item, styles[color], { marginLeft: i !== 0 ? 10 : 0 }]} key={color}>
          {overallStats[color]}
        </Text>
      ))}
    </View>
  )
}

export default OverallStats

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },

  item: {
    paddingVertical: 8,
    width: 90,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  blues: {
    backgroundColor: "#0A81FF",
  },
  reds: {
    backgroundColor: "#FFE135",
  },
  yellows: {
    backgroundColor: "#C60012",
    color: "white",
  },
})
