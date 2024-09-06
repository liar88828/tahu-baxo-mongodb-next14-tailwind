import type { TListCard } from "../../interface/model/dashboard"

export const currentDate = new Date()
export const currentYear = currentDate.getFullYear()
export const currentMonth = currentDate.getMonth() + 1 // Adding 1 to adjust for 0-based months
export const currentMinute = currentDate.getMinutes()
const formattingOptions = {
	hari: { weekday: "long" },
	angka: { dateStyle: "long" },
  tanggal: { dateStyle: "medium" },
	full: { dateStyle: "full" },
	month: { month: "long" },
}

type MyTypeObject = keyof typeof formattingOptions

export const today = currentDate.getDate()

export function addDays(days: number) {
	return new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000)
}

export const getTime = (detik: boolean = false) => {
  let today = currentDate
	let d = ":" + today.getSeconds()
	
	return today.getHours() + ":" + today.getMinutes() + detik && d
}

export const setHours = (time: string | Date): string => {
	const t = new Date(Date.parse(time.toString()))
		.toLocaleTimeString("id-ID", {
			hour: "2-digit",
			minute: "2-digit",
		})
		.split(".")
	
	return t[0] + ":" + t[1] // + ":" + "00"
}

export const setTanggal = (
  date: string | Date,
  option: MyTypeObject = "hari"
) => {
	const d = new Date(Date.parse(date.toString()))

  // @ts-ignore

  // console.log(dates)
	return d.toLocaleDateString("id-ID", formattingOptions[option])
}

export const newSetTanggal = (date: string | Date) => {
	const d = new Date(Date.parse(date.toString()))

  // @ts-ignore
	return d.toLocaleDateString("id-ID", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
    // second: 'numeric',
    // timeZoneName: 'short'
	})
}

export const getDates = (option: MyTypeObject, value: number) => {
  value = currentMonth + value
	
	const year = value > 0 ? currentYear : currentYear - 1
  const month = value > 0 ? value : value + 12

  // console.log( year,month )
	const d = new Date(`${ year }-${ month }-01`)

  // @ts-ignore
	return d.toLocaleString("id-ID", formattingOptions[option])
}

export const setDates = (date: string): Date | string => {
	const d = new Date(Date.parse(date)).toLocaleString("id-ID", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	})
	const array = d.split("/")
	return array[2] + "-" + array[1] + "-" + array[0]
}

export const defaultDate = () => {
  let curr = currentDate
	curr.setDate(curr.getDate() + 3)
	return curr.toISOString().substring(0, 10)
}

export const getKirim = (waktuKirim: string | Date) => {
	return new Date(waktuKirim)
}

export function statusKirim(d: TListCard) {
	const tanggal = addDays(0).getDate()

  // console.info( tanggal )
	if (tanggal >= 4 && tanggal <= 6) {
		return " btn-primary "
  }
	if (tanggal >= 0 && tanggal <= 3) {
		return " bg-warning "
  }
	if (tanggal < 0) {
		return " bg-error "
  }
}

export function timeOtp(value: number) {
	return new Date(currentDate.getTime() + value * 60000)
}

export function compareTime(dataTime: Date) {
  // const futureTime = new Date(currentTime.getTime() + 5 * 60000); // Adding 5 minutes (5 * 60 seconds * 1000
  // milliseconds)
  // console.log( currentDate, dataTime )
	const date = dataTime > currentDate
  // console.log( dataTime )
  // console.log( currentTime )
  // console.log( date )
  return date
}
