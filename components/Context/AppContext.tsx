import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { JournalItem, JournalStats, MissedClass } from "../../lib/types"
import { Group } from "../ui/ChooseGroupModal"

export const AppContext = createContext({
  isAuth: false,
  setIsAuth: (v: boolean) => {},
  chosenDate: new Date(),
  setChosenDate: (v: Date) => {},
  chosenGroup: {} as Group,
  setChosenGroup: (v: Group) => {},
  journal: [] as JournalItem[],
  setJournal: (v: JournalItem[]) => {},
  name: "",
  setName: (v: string) => {},
  elco_session: "",
  setToken: (v: string) => {},
  overallStats: {} as JournalStats,
  setStats: (v: JournalStats) => {},
  missed: [] as MissedClass[],
  setMissed: (v: MissedClass[]) => {},
})

export function AppContextProvider({ children }: PropsWithChildren) {
  const [isAuth, setIsAuth] = useState(false)
  const [chosenDate, setChosenDate] = useState({} as Date)
  const [chosenGroup, setChosenGroup] = useState({} as Group)
  const [journal, setJournal] = useState([] as JournalItem[])
  const [name, setName] = useState("")
  const [elco_session, setToken] = useState("")
  const [overallStats, setStats] = useState({} as JournalStats)
  const [missed, setMissed] = useState([] as MissedClass[])

  useEffect(() => {
    let date = new Date()
    if (date.getDay() === 0 || date.getHours() >= 18) {
      date.setDate(date.getDate() + 1)
    }
    setChosenDate(date)
  }, [])

  return (
    <AppContext.Provider
      value={{
        isAuth,
        setIsAuth,
        chosenDate,
        chosenGroup,
        setChosenDate,
        setChosenGroup,
        journal,
        setJournal,
        name,
        setName,
        elco_session,
        setToken,
        overallStats,
        setStats,
        missed,
        setMissed,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
