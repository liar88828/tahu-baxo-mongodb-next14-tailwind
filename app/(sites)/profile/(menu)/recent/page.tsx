import React, { Suspense } from 'react';
import { Loading } from "@/components/loading/loading";
import { ProfileRecentPaging } from "@/app/(sites)/profile/(menu)/recent/profileRecentPaging";

export default async function Page() {
	return (
		<Suspense fallback={ <Loading/> }>
			<ProfileRecentPaging/>
		</Suspense>
	);
}

