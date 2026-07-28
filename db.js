/* ==========================================================================
   VUGANA — Data layer (DEMO ONLY)
   -----------------------------------------------------------------------
   IMPORTANT: This stores reports in the browser's localStorage. That means
   data lives ONLY on the device that submitted it — nobody else, including
   "Isange staff" on a different computer, can see it. This is fine for a
   demo/prototype, but for a real deployment handling real survivor data
   you need a real backend: a server + database, HTTPS, authentication,
   and encryption at rest. Do not launch this as-is for real use.
   ========================================================================== */

const VUGANA_STORAGE_KEY = "vugana_reports";

function vgGenerateCode() {
  const num = Math.floor(100000 + Math.random() * 900000);
  return "VGN-" + num;
}

function vgGetAllReports() {
  try {
    const raw = localStorage.getItem(VUGANA_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("VUGANA: failed to read reports", e);
    return [];
  }
}

function vgSaveAllReports(reports) {
  localStorage.setItem(VUGANA_STORAGE_KEY, JSON.stringify(reports));
}

function vgSaveReport(report) {
  const reports = vgGetAllReports();
  let code = vgGenerateCode();
  // guard against (very unlikely) collision
  while (reports.some(function (r) { return r.code === code; })) {
    code = vgGenerateCode();
  }

  const fullReport = {
    code: code,
    district: report.district,
    abuseType: report.abuseType,
    date: report.date,
    time: report.time || "",
    description: report.description,
    name: report.name || "",
    phone: report.phone || "",
    status: "Submitted",
    submittedAt: new Date().toISOString(),
    timeline: [
      {
        status: "Submitted",
        message: "Your report was received. It has been routed to the " + report.district + " Isange One Stop Centre.",
        staffName: "System",
        at: new Date().toISOString()
      }
    ]
  };

  reports.push(fullReport);
  vgSaveAllReports(reports);
  return fullReport;
}

function vgGetReport(code) {
  const reports = vgGetAllReports();
  return reports.find(function (r) { return r.code === code.trim().toUpperCase(); }) || null;
}

function vgUpdateReport(code, status, message, staffName) {
  const reports = vgGetAllReports();
  const idx = reports.findIndex(function (r) { return r.code === code; });
  if (idx === -1) return null;

  reports[idx].status = status;
  reports[idx].timeline.push({
    status: status,
    message: message,
    staffName: staffName || "Isange Social Worker",
    at: new Date().toISOString()
  });

  vgSaveAllReports(reports);
  return reports[idx];
}
