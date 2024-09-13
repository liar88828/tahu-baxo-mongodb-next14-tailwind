import { ProfileInfo } from './ProfileInfo'
import React, { ReactNode, Suspense } from "react";
import { Loading } from "@/components/loading";
import { ProfileTab } from "@/app/(sites)/profile/ProfileTab";
import { ProfileStatus } from "@/app/(sites)/profile/ProfileStatus";

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='space-y-2 p-2'>
			<ProfileInfo/>
			<Suspense fallback={ <Loading/> }>
				<ProfileStatus/>
				<ProfileTab/>
				{ children }
			</Suspense>
		</div>
	)
}
