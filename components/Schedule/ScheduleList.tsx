import { useFocusEffect } from "@react-navigation/native"
import { PropsWithChildren, useCallback, useEffect, useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { $api } from "../../lib/http"
import { ScheduledClass } from "../../lib/types"
import { AppContext } from "../Context/AppContext"
import LoadingOverlay from "./LoadingOverlay"
import ScheduleListItem from "./ScheduleListItem"
import { useContext } from "react"
import { storage } from "../../App"

interface Props extends PropsWithChildren {}

const ScheduleList = ({}: Props) => {
  const [classes, setClasses] = useState([] as ScheduledClass[])
  const [loading, setLoading] = useState(true)
  const { chosenDate, chosenGroup, setChosenGroup } = useContext(AppContext)

  const handleDate = (date: Date) => {
    return date.toJSON().slice(0, 10)
  }

  const fetchSchedule = async () => {
    setLoading(true)

    let groupId = chosenGroup.id || ""

    if (!groupId) {
      groupId = storage.getString("groupId") as string
      const groupName = storage.getString("groupName") as string
      setChosenGroup({ id: groupId, name: groupName })
    }

    try {
      const { data } = await $api.get<ScheduledClass[]>(
        `/schedule/${groupId}/${handleDate(chosenDate)}`
      )
      setClasses(data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCallback = useCallback(() => {
    fetchSchedule()
  }, [chosenDate, chosenGroup.id])

  useFocusEffect(fetchCallback)

  if (loading) return <LoadingOverlay message="Загрузка расписание" />
  else if (!loading && classes.length == 0)
    return <Text style={styles.noSchedule}>Расписания на этот день нет</Text>

  return (
    <View>
      {classes.map((scheduledClass, i) => (
        <ScheduleListItem
          key={`${i}/${scheduledClass.content[0].title}`}
          scheduledClass={scheduledClass}
        />
      ))}
    </View>
  )
}

export default ScheduleList

const styles = StyleSheet.create({
  noSchedule: {
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
    fontSize: 23,
    marginTop: 250,
  },
})
