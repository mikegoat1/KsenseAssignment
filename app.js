const API_Key = "ak_5c9d4265c0a7539f03e7dcf90cb54adef04fc9c22e215109";
const Base_URL = "https://assessment.ksensetech.com/api";
let allPatients = [];

async function fetchPatients() {
  let page = 1;
  let maxPages = 10;

  while (page <= maxPages) {
    try {
      const response = await fetch(`${Base_URL}/patients?page=${page}`, {
        method: "GET",
        headers: {
          "x-api-key": API_Key,
          "Content-Type": "application/json",
        },
      });

      // Handle rate limit (429)
      if (response.status === 429) {
        const retryDelay = 5000 + Math.random() * 1000; // 5–6s with jitter
        console.warn(
          `Rate limited (429). Retrying after ${retryDelay / 1000}s...`
        );
        await new Promise((res) => setTimeout(res, retryDelay));
        continue;
      }

      // Handle intermittent failures (500/503)
      if ([500, 503].includes(response.status)) {
        console.warn(`Server error ${response.status}. Retrying in 3s...`);
        await new Promise((res) => setTimeout(res, 3000));
        continue;
      }

      if (!response.ok) {
        throw new Error(`Unexpected response: ${response.status}`);
      }

      const data = await response.json();
      const patients = Array.isArray(data.patients) ? data.patients : [];

      if (patients.length === 0) {
        console.warn(`Empty data on page ${page}, retrying...`);
        await new Promise((res) => setTimeout(res, 2000));
        continue;
      }

      allPatients.push(...patients);
      console.log(`Fetched page ${page} (${patients.length} patients)`);
      page++;
    } catch (error) {
      console.error(`Error fetching page ${page}: ${error.message}`);
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
  return allPatients;
}
function processPatients(allPatients) {
  const highRisk = [];
  const feverPatients = [];
  const dataQualityIssues = [];

  function parseBloodPressure(bp) {
    if (!bp || typeof bp !== "string")
      return { systolic: null, diastolic: null };

    const [sys, dia] = bp.split("/").map((v) => Number(v.trim()));

    if (isNaN(sys) || isNaN(dia)) return { systolic: null, diastolic: null };
    return { systolic: sys, diastolic: dia };
  }

  function getBloodPressureRisk(bp) {
    const { systolic, diastolic } = parseBloodPressure(bp);
    if (systolic == null || diastolic == null) return 0;

    let sysStage = 0;
    let diaStage = 0;

    // Systolic classification
    if (systolic < 120) sysStage = 1;
    else if (systolic < 130) sysStage = 2;
    else if (systolic < 140) sysStage = 3;
    else sysStage = 4;

    // Diastolic classification
    if (diastolic < 80) diaStage = Math.max(diaStage, 1);
    else if (diastolic < 90) diaStage = Math.max(diaStage, 3);
    else diaStage = Math.max(diaStage, 4);

    return Math.max(sysStage, diaStage);
  }

  function getTemperatureRisk(temp) {
    if (temp == null || typeof temp !== "number" || isNaN(temp)) return 0;
    if (temp <= 99.5) return 0;
    if (temp <= 100.9) return 1;
    return 2;
  }

  function getAgeRisk(age) {
    if (age == null || typeof age !== "number" || isNaN(age)) return 0;
    if (age > 65) return 2;
    return 1; // both <40 and 40–65 => 1 point
  }

  for (const p of allPatients) {
    const bpRisk = getBloodPressureRisk(p.blood_pressure);
    const tempRisk = getTemperatureRisk(p.temperature);
    const ageRisk = getAgeRisk(p.age);

    const totalRisk = bpRisk + tempRisk + ageRisk;

    const hasInvalidData =
      bpRisk === 0 ||
      ageRisk === 0 ||
      (p.temperature !== undefined &&
        getTemperatureRisk(p.temperature) === 0 &&
        typeof p.temperature !== "number");

    if (hasInvalidData) dataQualityIssues.push(p.patient_id);
    if (tempRisk > 0) feverPatients.push(p.patient_id);
    if (bpRisk >= 4 || totalRisk >= 6) highRisk.push(p.patient_id);
  }

  console.log("High-Risk Patients:", highRisk);
  console.log("Fever Patients:", feverPatients);
  console.log("Data Quality Issues:", dataQualityIssues);

  return { highRisk, feverPatients, dataQualityIssues };
}
async function main() {
  try {
    console.log("Fetching patients...");
    const patients = await fetchPatients();
    console.log("Starting patient data processing...");
    const results = processPatients(patients);
    console.log("Processing complete.");
    console.log("High-Risk Patients:", results.highRisk);
    console.log("Fever Patients:", results.feverPatients);
    console.log("Data Quality Issues:", results.dataQualityIssues);
    return results;
  } catch (error) {
    console.error(`Error in main: ${error.message}`);
  }
}

main();
