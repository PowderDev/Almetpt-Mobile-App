import { useFocusEffect } from "@react-navigation/native"
import { PropsWithChildren, useCallback, useContext, useState } from "react"
import { View, StyleSheet } from "react-native"
import { $api } from "../../lib/http"
import { JournalItem } from "../../lib/types"
import { AppContext } from "../Context/AppContext"
import GradeListItem from "./GradeListItem"

interface Props extends PropsWithChildren {}

const GradesList = ({}: Props) => {
  const { journal, setJournal, elco_session, name } = useContext(AppContext)

  const fetchJournal = async () => {
    try {
      const { data } = await $api.get<JournalItem[]>(
        `/journal/${name}?elco_session=${elco_session}`
      )
      setJournal(data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCallback = useCallback(() => {
    if (journal.length == 0) fetchJournal()
  }, [])

  useFocusEffect(fetchCallback)

  return (
    <View style={styles.container}>
      {journal.map((item) => (
        <GradeListItem key={item.className} item={item} />
      ))}
    </View>
  )
}

export default GradesList

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
})
