export const orderStatuses = [
	{ name: 'Processing', completed: true },
	{ name: 'Shipped', completed: true },
	{ name: 'Delivered', completed: false },
]
export const orderDetails = {
	orderId: '#ORD-12345',
	date: 'May 15, 2023',
	status: 'Shipped',
	items: [
		{ name: 'Wireless Headphones', price: 129.99, quantity: 1 },
		{ name: 'Smartphone Case', price: 24.99, quantity: 2 },
		{ name: 'USB-C Cable', price: 9.99, quantity: 3 },
	],
	subtotal: 209.95,
	shipping: 5.99,
	tax: 17.84,
	total: 233.78,
	shippingAddress: '123 Main St, Anytown, ST 12345',
	paymentMethod: 'Visa ending in 1234',
}
