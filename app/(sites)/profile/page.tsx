import Navbar from './Navbar'
import { Product } from './Product'
import { ProfileStatus } from './ProfileStatus'
import { ProfileTab } from './ProfileTab'
import { ProfileInfo } from './ProfileInfo'

export default function page() {
	return (
		<>
			<Navbar />
			<div className='space-y-2 p-2'>
				<ProfileInfo />
				<ProfileTab />
				<ProfileStatus />
				<Product />
			</div>
		</>
	)
}
