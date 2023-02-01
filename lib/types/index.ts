export interface ScheduledClass {
  header: {
    time?: string
    number: string
  }

  content: {
    auditorium?: string
    title: string
    shortTitle: string
    teacher?: string
    shortTeacher?: string
    subgroup?: "1" | "2"
  }[]
}

export interface JournalItem {
  className: string
  grades: Grade[][]
}

export interface Grade {
  day: string
  grade: string
  month: number
}

export type JournalStatsKey = "blues" | "reds" | "yellows"
export type JournalStats = { [key: string]: string }

export interface MissedClass {
  date: string
  number: string
  name: string
}
