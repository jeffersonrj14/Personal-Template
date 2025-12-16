import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

export const IntlDateFormatter = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'short',
  timeZone: 'Asia/Jakarta',
  hour12: false
})

export const IntlWeekdayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long'
})

export function formatFullDateTime(date: Date) {
  const day = date.getDate()
  const month = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    timeZone: 'Asia/Jakarta'
  }).format(date)
  const year = date.getFullYear()

  // Ordinal suffix (st, nd, rd, th)
  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return s[(v - 20) % 10] || s[v] || s[0]
  }

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Jakarta'
  }).format(date)

  return `${day}${getOrdinal(day)} ${month} ${year} • ${time}`
}

export function formatClockDate(date: Date) {
  const day = date.getDate()
  const month = new Intl.DateTimeFormat('en-US', {
    month: 'long'
  }).format(date)
  const year = date.getFullYear()

  // Ordinal suffix (st, nd, rd, th)
  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return s[(v - 20) % 10] || s[v] || s[0]
  }

  return `${day}${getOrdinal(day)} ${month} ${year}`
}

export function formatClockTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(date)
}

export const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  return `${hours} hrs ${minutes} mins`
}

export const extractDate = (dateString: string | number | Date) =>
  new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

export function formatDate(date: string) {
  let currentDate = new Date().getTime()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date).getTime()
  let timeDifference = Math.abs(currentDate - targetDate)
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  let fullDate = new Date(date).toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  if (daysAgo < 1) {
    return 'Today'
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7)
    return `${fullDate} (${weeksAgo}w ago)`
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30)
    return `${fullDate} (${monthsAgo}mo ago)`
  } else {
    const yearsAgo = Math.floor(daysAgo / 365)
    return `${fullDate} (${yearsAgo}y ago)`
  }
}
