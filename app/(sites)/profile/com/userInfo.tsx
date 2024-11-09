export function UserInfo() {
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="flex items-center gap-2">
					<div className="h-5 w-5 text-muted-foreground"/>
					<div>
						<p className="text-sm font-medium">Total Orders</p>
						<p className="text-2xl font-bold">42</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-5 w-5 text-muted-foreground"/>
					<div>
						<p className="text-sm font-medium">Total Spent</p>
						<p className="text-2xl font-bold">$1,234.56</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-5 w-5 text-muted-foreground"/>
					<div>
						<p className="text-sm font-medium">Loyalty Points</p>
						<p className="text-2xl font-bold">2,500</p>
					</div>
				</div>
			</div>
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Recent Orders</h3>
				{ [
					{ id: "ORD-001", date: "2023-06-01", total: "$125.00", status: "Delivered" },
					{ id: "ORD-002", date: "2023-05-15", total: "$79.99", status: "Shipped" },
					{ id: "ORD-003", date: "2023-04-30", total: "$249.50", status: "Processing" },
				].map((order) => (
					<div key={ order.id } className="flex justify-between items-center border-b pb-2">
						<div>
							<p className="font-medium">{ order.id }</p>
							<p className="text-sm text-muted-foreground">{ order.date }</p>
						</div>
						<div className="text-right">
							<p className="font-medium">{ order.total }</p>
							<div className={ 'badge' }>{ order.status }</div>
						</div>
					</div>
				)) }
			</div>
		</div>
	);
}