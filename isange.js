/* ==========================================================================
   VUGANA — Isange One Stop Centre data
   NOTE: Phone numbers / addresses below are placeholders for demo purposes.
   Before real deployment, replace with verified contact details from
   MIGEPROF / Rwanda National Police for each district.
   ========================================================================== */

const RWANDA_DISTRICTS = [
  "Nyarugenge", "Gasabo", "Kicukiro",                      // Kigali City
  "Nyanza", "Gisagara", "Nyaruguru", "Huye", "Nyamagabe",
  "Ruhango", "Muhanga", "Kamonyi",                          // Southern Province
  "Karongi", "Rutsiro", "Rubavu", "Nyabihu", "Ngororero",
  "Rusizi", "Nyamasheke",                                   // Western Province
  "Rulindo", "Gakenke", "Musanze", "Burera", "Gicumbi",     // Northern Province
  "Rwamagana", "Nyagatare", "Gatsibo", "Kayonza",
  "Kirehe", "Ngoma", "Bugesera"                             // Eastern Province
];

const ISANGE_CENTRES = RWANDA_DISTRICTS.map(function (district) {
  return {
    district: district,
    hospital: district + " District Hospital",
    phone: "116",
    hours: "24/7",
    services: ["Medical care", "Counseling", "Forensic exam", "Emergency shelter", "Legal referral"]
  };
});

const ABUSE_TYPES = [
  "Physical violence",
  "Sexual violence / assault",
  "Emotional or psychological abuse",
  "Economic abuse / financial control",
  "Child abuse or neglect",
  "Stalking or digital harassment",
  "Forced or early marriage",
  "Other"
];
