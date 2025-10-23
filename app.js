const API_Key = "ak_5c9d4265c0a7539f03e7dcf90cb54adef04fc9c22e215109";
const Base_URL = "https://assessment.ksensetech.com/api";

async function fetchPatients() {
    let allPatients = [];
    let page = 1;
    let maxPages = 10;

    while (page <= maxPages) {

        try {
            const response = await fetch(`${Base_URL}/patients?page=${page}`, {
                method: 'GET',
                headers: {
                    "x-api-key": API_Key,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 429) {
                console.warn('Rate limit exceeded. Retrying after 3 second...');
                await new Promise(resolve => setTimeout(resolve, 3000));
                continue; // Retry the same page

            }
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const data = await response.json();
            allPatients.push(...data.patients);
            page++;
        } catch (error) {
            console.error(`Error fetching page ${page}: ${error.message}`);
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        return allPatients;
    }
}