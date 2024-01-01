import { getServerSession } from 'next-auth'
import { options } from './options'

export const getSessions = async () => {
	return await getServerSession(options)
}
