export async function fetchQuestions(amount = 5, retries = 3, delay = 2000) {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&difficulty=medium&type=multiple`
    );

    if (res.status === 429) {
      if (retries > 0) {
        console.warn(`⚠️ Rate limited, retrying in ${delay / 1000}s...`);
        await new Promise(r => setTimeout(r, delay)); // wait before retry
        return fetchQuestions(amount, retries - 1, delay * 2); // exponential backoff
      } else {
        throw new Error("API rate limit reached. Try again later.");
      }
    }

    if (!res.ok) {
      throw new Error("Failed to fetch questions");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}
