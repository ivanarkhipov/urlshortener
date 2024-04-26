interface NavbarProps {
	children: React.ReactNode;
}

export function Navbar() {

	return (
		<>
			<div className="w-screen">
				<nav className="flex items-center justify-between py-4">
					<div className="flex items-center justify-between w-full max-w-6xl mx-auto px-5">
						<div className="flex items-center">
							<a href="/" className="text-xl font-semibold">
								Shorterly
							</a>
							<div className="ml-5 space-x-4">
								<a
									href="/"
									className="text-gray-600 hover:text-gray-900"
								>
									shorten
								</a>
								<a
									href="/stats"
									className="text-gray-600 hover:text-gray-900"
								>
									usage
								</a>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}
