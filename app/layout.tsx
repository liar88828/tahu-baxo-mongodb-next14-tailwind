import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import ProviderAuth from "@/components/provider/ProviderAuth";
import ProviderContext from "@/components/provider/ProviderContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout(
	{ children, navbar }: {
		children: React.ReactNode,
		navbar: React.ReactNode,
	}) {
	return (
		<html
			lang='en'
			className={ inter.className }
			// data-theme={ 'mytheme' }
		>
		<body className={ ' min-h-screen   ' }>
		<div className="container">
			<ProviderAuth>
				<ProviderContext>
			{ navbar }
			{ children }
				</ProviderContext>
			</ProviderAuth>
		</div>
		</body>
		</html>
	)
}
