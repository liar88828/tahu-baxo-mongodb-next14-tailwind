import { DeliveryDB } from "@prisma/client";
import React from "react";

function DeliveryItem({ item }: { item: DeliveryDB }) {
	return (
		<div className="bg-base-100 rounded-lg shadow border p-6 ">
			{/* Header */ }
			<div
				className="flex items-center justify-between">
				<h2 className="text-lg font-semibold text-gray-800">Delivery Details</h2>
				<span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">In Transit</span>
			</div>
			
			{/* Delivery Date */ }
			<div className="mt-4">
				<label className="block text-sm text-gray-600">Estimated Delivery</label>
				<p className="text-lg font-semibold text-gray-900">Sep 15, 2024</p>
			</div>
			
			{/* Shipping Address */ }
			<div className="mt-4">
				<label className="block text-sm text-gray-600">Shipping Address</label>
				<p className="text-gray-700 mt-1">
					John Doe<br/>
					1234 Elm Street<br/>
					Springfield, IL 62704
				</p>
			</div>
			
			{/* Tracking Number */ }
			<div className="mt-4">
				<label className="block text-sm text-gray-600">Tracking Number</label>
				<p className="text-gray-700 mt-1">1Z999AA10123456784</p>
			</div>
			
			{/* Delivery Status */ }
			<div className="mt-6">
				<button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
					Track Package
				</button>
			</div>
		</div>
	);
}