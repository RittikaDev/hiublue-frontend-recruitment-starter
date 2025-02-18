export const loginUser = async (email: string, password: string) => {
	try {
		const response = await fetch("https://dummy-1.hiublue.com/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) throw new Error("Login failed");

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Login failed");
	}
};
