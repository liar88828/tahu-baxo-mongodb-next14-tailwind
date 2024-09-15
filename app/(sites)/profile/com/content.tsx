import React from "react";
import { ProfileRecent } from "@/app/(sites)/profile/com/profileRecent";
import {
	ProfileOrderHistory,
	ProfilePaymentMethods,
	ProfileSetting,
	ProfileStatus
} from "@/app/(sites)/profile/com/serverCom";

export async function Content() {
	return (<>
			<ProfileStatus/>
			<ProfileRecent/>
			<ProfileOrderHistory/>
			<ProfileSetting/>
			<ProfilePaymentMethods/>
		</>
	);
}
