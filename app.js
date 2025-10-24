const API_Key = "ak_5c9d4265c0a7539f03e7dcf90cb54adef04fc9c22e215109";
const Base_URL = "https://assessment.ksensetech.com/api";
let allPatients = [];
const mock_data = [
  {
    patient_id: "DEMO001",
    name: "TestPatient, John",
    age: 45,
    gender: "M",
    blood_pressure: "120/80",
  },
  {
    patient_id: "DEMO002",
    name: "AssessmentUser, Jane",
    age: 67,
    gender: "F",
    blood_pressure: "140/90",
  },
  {
    patient_id: "DEMO003",
    name: "SkillsTest, Bob",
    age: 34,
    gender: "M",
    blood_pressure: "110/70",
  },
  {
    patient_id: "DEMO004",
    name: "CodeChallenge, Alice",
    age: 52,
    gender: "F",
    blood_pressure: "INVALID_BP_FORMAT",
  },
  {
    patient_id: "DEMO005",
    name: "DataTest, Charlie",
    age: 28,
    gender: "M",
    blood_pressure: "N/A",
  },
  {
    patient_id: "DEMO006",
    name: "EdgeCase, Diana",
    age: 73,
    gender: "F",
    blood_pressure: "130/85",
  },
  {
    patient_id: "DEMO007",
    name: "ErrorTest, Frank",
    age: 41,
    gender: "M",
    blood_pressure: "150/95",
  },
  {
    patient_id: "DEMO008",
    name: "BoundaryCase, Grace",
    age: 59,
    gender: "F",
    blood_pressure: "125/82",
  },
  {
    patient_id: "DEMO009",
    name: "StressTest, Henry",
    age: 36,
    gender: "M",
    blood_pressure: "135/88",
  },
  {
    patient_id: "DEMO010",
    name: "FinalTest, Ivy",
    age: 48,
    gender: "F",
    blood_pressure: "145/92",
  },
  {
    patient_id: "DEMO012",
    name: "ExtremeCase, Mary",
    age: 89,
    gender: "F",
    blood_pressure: "180/110",
  },
  {
    patient_id: "DEMO013",
    name: "Normal, Sarah",
    age: 32,
    gender: "F",
    blood_pressure: "118/78",
  },
  {
    patient_id: "DEMO014",
    name: "Healthy, Mike",
    age: 29,
    gender: "M",
    blood_pressure: "115/75",
  },
  {
    patient_id: "DEMO015",
    name: "Athlete, Lisa",
    age: 26,
    gender: "F",
    blood_pressure: "108/68",
  },
  {
    patient_id: "DEMO016",
    name: "Hypertensive, Robert",
    age: 55,
    gender: "M",
    blood_pressure: "160/100",
  },
  {
    patient_id: "DEMO017",
    name: "Borderline, Karen",
    age: 49,
    gender: "F",
    blood_pressure: "139/89",
  },
  {
    patient_id: "DEMO018",
    name: "Elevated, Tom",
    age: 42,
    gender: "M",
    blood_pressure: "128/75",
  },
  {
    patient_id: "DEMO019",
    name: "Senior, Betty",
    age: 78,
    gender: "F",
    blood_pressure: "155/95",
  },
  {
    patient_id: "DEMO020",
    name: "Elderly, Walter",
    age: 82,
    gender: "M",
    blood_pressure: "165/88",
  },
  {
    patient_id: "DEMO021",
    name: "Fever, Amanda",
    age: 35,
    gender: "F",
    blood_pressure: "125/80",
  },
  {
    patient_id: "DEMO022",
    name: "LowTemp, David",
    age: 68,
    gender: "M",
    blood_pressure: "140/85",
  },
  {
    patient_id: "DEMO023",
    name: "Problematic, Carol",
    age: 54,
    gender: "F",
    blood_pressure: "150/",
  },
  {
    patient_id: "DEMO024",
    name: "Inconsistent, Mark",
    age: 43,
    gender: "M",
    blood_pressure: "/95",
  },
  {
    patient_id: "DEMO025",
    name: "Young, Emma",
    age: 22,
    gender: "F",
    blood_pressure: "110/65",
  },
  {
    patient_id: "DEMO026",
    name: "Student, Alex",
    age: 19,
    gender: "M",
    blood_pressure: "115/70",
  },
  {
    patient_id: "DEMO027",
    name: "Diabetic, Helen",
    age: 61,
    gender: "F",
    blood_pressure: "148/92",
  },
  {
    patient_id: "DEMO028",
    name: "Prediabetic, James",
    age: 58,
    gender: "M",
    blood_pressure: "142/88",
  },
  {
    patient_id: "DEMO029",
    name: "Pregnant, Maria",
    age: 31,
    gender: "F",
    blood_pressure: "130/82",
  },
  {
    patient_id: "DEMO030",
    name: "Expecting, Jennifer",
    age: 28,
    gender: "F",
    blood_pressure: "125/78",
  },
  {
    patient_id: "DEMO031",
    name: "Severe, Richard",
    age: 66,
    gender: "M",
    blood_pressure: "190/120",
  },
  {
    patient_id: "DEMO032",
    name: "Critical, Nancy",
    age: 72,
    gender: "F",
    blood_pressure: "200/110",
  },
  {
    patient_id: "DEMO033",
    name: "Cardiac, Paul",
    age: 69,
    gender: "M",
    blood_pressure: "152/95",
  },
  {
    patient_id: "DEMO034",
    name: "Arrhythmia, Linda",
    age: 64,
    gender: "F",
    blood_pressure: "138/86",
  },
  {
    patient_id: "DEMO035",
    name: "Nullish, George",
    age: null,
    gender: "M",
    blood_pressure: "145/90",
  },
  {
    patient_id: "DEMO036",
    name: "Undefined, Susan",
    age: 47,
    gender: "F",
    temperature: 99.2,
  },
  {
    patient_id: "DEMO037",
    name: "HighFever, Chris",
    age: 39,
    gender: "M",
    blood_pressure: "120/78",
  },
  {
    patient_id: "DEMO038",
    name: "Septic, Rachel",
    age: 57,
    gender: "F",
    blood_pressure: "88/55",
  },
  {
    patient_id: "DEMO039",
    name: "MiddleAge, Kevin",
    age: 45,
    gender: "M",
    blood_pressure: "132/84",
  },
  {
    patient_id: "DEMO040",
    name: "Mature, Barbara",
    age: 52,
    gender: "F",
    blood_pressure: "144/89",
  },
  {
    patient_id: "DEMO041",
    name: "VeryOld, Ernest",
    age: 95,
    gender: "M",
    blood_pressure: "175/85",
  },
  {
    patient_id: "DEMO042",
    name: "Teen, Ashley",
    age: 17,
    gender: "F",
    blood_pressure: "108/62",
  },
  {
    patient_id: "DEMO043",
    name: "StringAge, William",
    age: "fifty-three",
    gender: "M",
    blood_pressure: "156/94",
  },
  {
    patient_id: "DEMO044",
    name: "noissue, Lisa",
    age: 29,
    gender: "F",
    blood_pressure: "119/76",
  },
  {
    patient_id: "DEMO045",
    name: "PolyPharmacy, Harold",
    age: 76,
    gender: "M",
    blood_pressure: "168/98",
  },
  {
    patient_id: "DEMO046",
    name: "NoMeds, Kelly",
    age: 24,
    gender: "F",
    blood_pressure: "112/68",
  },
  {
    patient_id: "DEMO047",
    name: "LastTest, Morgan",
    age: 38,
    gender: "F",
    blood_pressure: "127/79",
  },
  {
    patient_id: "DEMO048",
    name: "FinalCase, Brian",
    age: 44,
    gender: "M",
    blood_pressure: "141/91",
  },
];

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

  function getBloodPressureRiskFromValues(systolic, diastolic) {
    if (systolic == null || diastolic == null) return 0;
    let risk = 0;

    if (systolic < 120 && diastolic < 80) return 0;

    if (systolic >= 120 && systolic <= 129 && diastolic < 80) return 1;

    if (
      (systolic >= 130 && systolic <= 139) ||
      (diastolic >= 80 && diastolic <= 89)
    )
      return 2;

    if (systolic >= 140 || diastolic >= 90) return 3;

    return risk;
  }


function getTemperatureRisk(temp) {
  if (temp == null || typeof temp !== "number" || isNaN(temp)) return 0;
  if (temp <= 99.5) return 0;
  if (temp >= 99.6 && temp <= 100.9) return 1;
  if (temp >= 101.0) return 2;
  return 0;
}

  function getAgeRisk(age) {
    if (age == null || typeof age !== "number" || isNaN(age)) return 0;
    if (age < 40) return 0;
    if (age > 40 && age < 65) return 1;
    if (age > 65) return 2;
  }

  for (const p of allPatients) {
    const { systolic, diastolic } = parseBloodPressure(p.blood_pressure);

    const bpInvalid =
      typeof p.blood_pressure !== "string" ||
      systolic == null ||
      diastolic == null;

    const ageInvalid = typeof p.age !== "number" || Number.isNaN(p.age);

    const tempInvalid =
      Object.prototype.hasOwnProperty.call(p, "temperature") &&
      p.temperature !== undefined &&
      p.temperature !== null &&
      Number.isNaN(Number(p.temperature));

    const nameInvalid =
      typeof p.name !== "string" ||
      !p.name.trim() ||
      /undefined|null/i.test(p.name.trim());

    const hasInvalidData =
      bpInvalid || ageInvalid || tempInvalid || nameInvalid;

    const bpRisk = bpInvalid
      ? 0
      : getBloodPressureRiskFromValues(systolic, diastolic);

    const tempValue =
      tempInvalid || p.temperature == null ? null : Number(p.temperature);
    const tempRisk = tempValue == null ? 0 : getTemperatureRisk(tempValue);

    const ageRisk = ageInvalid ? 0 : getAgeRisk(p.age);

    const totalRisk = bpRisk + tempRisk + ageRisk;
    console.log(
      `Patient ${p.patient_id} - BP Risk: ${bpRisk}, Temp Risk: ${tempRisk}, Age Risk: ${ageRisk}, Total Risk: ${totalRisk}`
    );

    if (hasInvalidData) {
      const invalidReasons = [];
      if (bpInvalid)
        invalidReasons.push(
          `Invalid/missing blood pressure (raw="${p.blood_pressure ?? "N/A"}")`
        );
      if (ageInvalid)
        invalidReasons.push(`Invalid/missing age (raw="${p.age}")`);
      if (tempInvalid)
        invalidReasons.push(
          `Invalid temperature value (raw="${p.temperature}")`
        );
      if (nameInvalid) invalidReasons.push(`Invalid name (raw="${p.name}")`);

      console.log(
        `❌ Data quality issue for patient ${
          p.patient_id
        }: ${invalidReasons.join("; ")}`
      );
      dataQualityIssues.push(p.patient_id);
    } else {
      if (tempRisk > 0) feverPatients.push(p.patient_id);
      if (totalRisk > 4) highRisk.push(p.patient_id);
    }
  }
  return { highRisk, feverPatients, dataQualityIssues };
}
async function submitResults(results) {
  try {
    const response = await fetch(`${Base_URL}/submit-assessment`, {
      method: "POST",
      headers: {
        "x-api-key": API_Key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    });

    if (!response.ok) {
      throw new Error(`Submission failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("Submission successful:", data);
  } catch (error) {
    console.error(`Error submitting results: ${error.message}`);
  }
}

async function main() {
  try {
    console.log("Fetching patients...");
    const patients = await fetchPatients();
    console.log(`Fetched total ${patients.length} patients.`);
    console.log(`Patients: ${patients.map((p) => p.patient_id).join(", ")}`);
    console.log("Starting patient data processing...");
    const results = processPatients(patients);
    // const results = processPatients(mock_data);
    console.log("Processing complete.");
    console.log("High-Risk Patients:", results.highRisk);
    console.log("Fever Patients:", results.feverPatients);
    console.log("Data Quality Issues:", results.dataQualityIssues);
    console.log("Complete results:", JSON.stringify(patients.flat(), null, 2));
    const payload = {
      high_risk_patients: results.highRisk,
      fever_patients: results.feverPatients,
      data_quality_issues: results.dataQualityIssues,
    };
    console.log("Submitting results...");
    await submitResults(payload);
    console.log("✅ Assessment submitted successfully!");
  } catch (error) {
    console.error(`Error in main: ${error.message}`);
  }
}

main();
