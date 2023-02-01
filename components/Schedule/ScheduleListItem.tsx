import { PropsWithChildren } from "react"
import { View, StyleSheet, Text } from "react-native"
import { ScheduledClass } from "../../lib/types"
import Tooltip, { Props as TooltipProps } from "rn-tooltip"

interface Props extends PropsWithChildren {
  scheduledClass: ScheduledClass
}

const getDefaultOptions = (w: number, h = 30) => {
  return {
    width: w * 8.5,
    height: h,
    actionType: "press",
    animationType: "none",
    containerStyle: { padding: 0, backgroundColor: "#7286D3", maxWidth: 330 },
    pointerColor: "#7286D3",
    overlayColor: "rgba(0,0,0,0.35)",
  } as TooltipProps
}

const ScheduleListItem = ({ scheduledClass }: Props) => {
  const getTTText = (text: string) => {
    return text.length >= 39 ? `${text.slice(0, 40)}...` : text
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {scheduledClass.header.number} <Text style={{ fontSize: 16 }}>Пара</Text>
        </Text>
        <Text style={styles.headerText}>{scheduledClass.header.time}</Text>
      </View>

      {scheduledClass.content.map((content, i) => (
        <View key={`${content.shortTitle}/${i}`} style={styles.content}>
          <Tooltip
            popover={<Text style={styles.tooltipText}>{getTTText(content.title)}</Text>}
            {...getDefaultOptions(getTTText(content.title).length)}
          >
            <Text style={styles.title}>{content.shortTitle}</Text>
          </Tooltip>

          {content.subgroup ? <Text style={styles.subgroup}>{content.subgroup} п/г</Text> : null}

          {content.auditorium || content.teacher ? (
            <View style={styles.bottomContainer}>
              {content.auditorium ? (
                <Text style={styles.grayText}>
                  ауд.<Text style={styles.highlightText}>{content.auditorium}</Text>
                </Text>
              ) : null}

              {content.teacher ? (
                <Tooltip
                  popover={<Text style={styles.tooltipText}>{content.teacher}</Text>}
                  {...getDefaultOptions(content.teacher.length)}
                >
                  <View>
                    <Text style={styles.grayText}>
                      преп.<Text style={styles.highlightText}>{content.shortTeacher}</Text>
                    </Text>
                  </View>
                </Tooltip>
              ) : null}
            </View>
          ) : null}
        </View>
      ))}
    </View>
  )
}

export default ScheduleListItem

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
  },

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#A0C3D2",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#645CBB",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },

  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },

  content: {
    borderBottomColor: "gray",
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    position: "relative",
  },

  title: {
    padding: 12,
    textAlign: "center",
    fontSize: 23,
    fontWeight: "500",
  },

  highlightText: {
    fontWeight: "500",
    color: "#1A0000",
    fontSize: 16,
  },

  grayText: {
    color: "gray",
    fontSize: 13,
  },

  tooltipText: {
    color: "#FFF2F2",
    fontWeight: "500",
  },

  subgroup: {
    position: "absolute",
    top: 18,
    left: 15,
    fontSize: 18,
    fontWeight: "500",
  },
})
