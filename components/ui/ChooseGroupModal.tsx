import { useFocusEffect } from "@react-navigation/native"
import { PropsWithChildren, useCallback, useState } from "react"
import { Pressable, Text } from "react-native"
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native"
import { $api } from "../../lib/http"

export interface Group {
  name: string
  id: string
}

interface Props extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  onChoose: (v: Group) => void
}

const ChooseGroupModal = ({ isOpen, onClose, onChoose }: Props) => {
  const [groups, setGroups] = useState([] as Group[][][])

  const fetchCallback = useCallback(() => {
    $api
      .get<Group[][][]>("/groups")
      .then(({ data }) => setGroups(data))
      .catch((err) => console.log(err))
  }, [])

  useFocusEffect(fetchCallback)

  const handlePress = (g: Group) => {
    onChoose(g)
    onClose()
  }

  const division = (i: number) => (i ? "Заочное  отделение" : "Очное отделение")

  return (
    <>
      {isOpen ? (
        <Modal animationType="slide" transparent={true} visible={isOpen} onRequestClose={onClose}>
          <TouchableOpacity style={styles.overlay} activeOpacity={1} onPressOut={onClose}>
            <ScrollView contentContainerStyle={styles.container}>
              <TouchableWithoutFeedback>
                <View style={{ flex: 1 }}>
                  <ScrollView>
                    {groups.length
                      ? groups.map((mode, i) => (
                          <View key={division(i)}>
                            <Text style={[styles.modeTitle, { marginTop: i ? 20 : 0 }]}>
                              {division(i)}
                            </Text>

                            <>
                              {mode.map((course, i) => (
                                <View key={`${i}/Курс`}>
                                  {course ? (
                                    <>
                                      <Text style={styles.courseTitle}>{i + 1} Курс</Text>

                                      <View style={styles.grid}>
                                        {course.map((group) => (
                                          <Pressable
                                            key={group.name}
                                            style={styles.itemContainer}
                                            onPress={() => handlePress(group)}
                                          >
                                            <Text style={styles.groupName}>{group.name}</Text>
                                          </Pressable>
                                        ))}
                                      </View>
                                    </>
                                  ) : null}
                                </View>
                              ))}
                            </>
                          </View>
                        ))
                      : null}
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </>
  )
}

export default ChooseGroupModal

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    marginBottom: "auto",
    marginHorizontal: 12,
    borderRadius: 7,
    height: "80%",
    backgroundColor: "white",
    elevation: 3,
    paddingVertical: 12,
    flexWrap: "wrap",
    flexDirection: "row",
    zIndex: 2,
  },

  itemContainer: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  groupName: {
    fontWeight: "500",
    fontSize: 16,
    borderColor: "blue",
    borderWidth: 2,
    width: 85,
    height: 35,
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
  },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modeTitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },

  courseTitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    textDecorationColor: "black",
    textDecorationLine: "underline",
    marginTop: 12,
    marginBottom: 10,
  },

  grid: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
})
