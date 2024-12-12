const API_URL = import.meta.env.VITE_API_URL;

export async function updateUserInfo(token, route, data) {
  let resultData;
  console.log("route", route);

  try {
    const response = await fetch(`${API_URL}/${route}/update${route}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updateFields: data }),
    });
    if (!response.ok) {
      console.log("Data fetching error");
    }
    resultData = await response.json();
    console.log("Server Response:", resultData);
  } catch (error) {
    console.error("Error submitting data:", error);
  }
  return resultData;
}
