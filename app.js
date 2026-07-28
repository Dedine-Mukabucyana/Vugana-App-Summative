/* ==========================================================================
   VUGANA — App logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initLanguage();
  initNavigation();
  initMobileNav();
  initQuickExit();
  populateDistrictSelects();
  populateAbuseTypeSelect();
  renderCentres();
  initReportForm();
  initTrackForm();
  initRightsTabs();
  initQuiz();
  initStaffPortal();
});

/* --------------------------------------------------------------------
   Theme (light / dark)
   -------------------------------------------------------------------- */

function initTheme() {
  const saved = localStorage.getItem("vugana_theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeBtn(saved);

  document.getElementById("themeToggleBtn").addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("vugana_theme", next);
    updateThemeBtn(next);
  });
}

function updateThemeBtn(theme) {
  const btn = document.getElementById("themeToggleBtn");
  btn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
}

/* --------------------------------------------------------------------
   Language (English / Kinyarwanda)
   -------------------------------------------------------------------- */

function initLanguage() {
  const saved = localStorage.getItem("vugana_lang") || "en";
  applyLanguage(saved);

  document.getElementById("langToggleBtn").addEventListener("click", function () {
    const current = localStorage.getItem("vugana_lang") || "en";
    const next = current === "en" ? "rw" : "en";
    localStorage.setItem("vugana_lang", next);
    applyLanguage(next);
  });
}

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.en;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });

  const langBtn = document.getElementById("langToggleBtn");
  langBtn.textContent = lang === "en" ? "🇷🇼 Kinyarwanda" : "🇬🇧 English";
}

/* --------------------------------------------------------------------
   Navigation between page views
   -------------------------------------------------------------------- */

function initNavigation() {
  document.querySelectorAll("[data-navigate]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const target = el.getAttribute("data-navigate");
      showView(target);
    });
  });
}

function showView(viewId) {
  document.querySelectorAll(".page-view").forEach(function (v) {
    v.classList.toggle("active", v.id === viewId);
  });
  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("data-navigate") === viewId);
  });
  document.getElementById("navMenu").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initMobileNav() {
  document.getElementById("mobileNavToggle").addEventListener("click", function () {
    document.getElementById("navMenu").classList.toggle("open");
  });
}

/* --------------------------------------------------------------------
   Quick exit — immediately leaves the site
   -------------------------------------------------------------------- */

function initQuickExit() {
  document.querySelectorAll(".btn-quick-exit").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.location.replace("https://www.google.com");
    });
  });

  // Also bind the Esc key as a fast panic exit
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") window.location.replace("https://www.google.com");
  });
}

/* --------------------------------------------------------------------
   Populate district selects (report form, centres filter, staff filter)
   -------------------------------------------------------------------- */

function populateDistrictSelects() {
  const selects = [
    document.getElementById("reportDistrictSelect"),
    document.getElementById("centreDistrictFilter"),
    document.getElementById("staffDistrictFilter")
  ];

  selects.forEach(function (select) {
    if (!select) return;
    if (select.id !== "reportDistrictSelect") {
      const allOpt = document.createElement("option");
      allOpt.value = "ALL";
      allOpt.textContent = "All Districts";
      select.appendChild(allOpt);
    }
    RWANDA_DISTRICTS.forEach(function (d) {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      select.appendChild(opt);
    });
  });

  const centreFilter = document.getElementById("centreDistrictFilter");
  if (centreFilter) centreFilter.addEventListener("change", renderCentres);

  const staffFilter = document.getElementById("staffDistrictFilter");
  if (staffFilter) staffFilter.addEventListener("change", renderStaffTable);
}

function populateAbuseTypeSelect() {
  const select = document.getElementById("abuseTypeSelect");
  if (!select) return;
  ABUSE_TYPES.forEach(function (type) {
    const opt = document.createElement("option");
    opt.value = type;
    opt.textContent = type;
    select.appendChild(opt);
  });
}

/* --------------------------------------------------------------------
   Isange Centres directory
   -------------------------------------------------------------------- */

function renderCentres() {
  const container = document.getElementById("isangeGridContainer");
  if (!container) return;
  const filter = document.getElementById("centreDistrictFilter").value || "ALL";

  const list = ISANGE_CENTRES.filter(function (c) {
    return filter === "ALL" || filter === "" || c.district === filter;
  });

  container.innerHTML = list.map(function (c) {
    return (
      '<div class="centre-card">' +
        "<h4>Isange OSC — " + c.district + "</h4>" +
        "<p>" + c.hospital + "</p>" +
        '<p class="centre-phone">📞 ' + c.phone + " (toll-free)</p>" +
        "<p>🕒 " + c.hours + "</p>" +
        "<p>" + c.services.join(", ") + "</p>" +
      "</div>"
    );
  }).join("");
}

/* --------------------------------------------------------------------
   Anonymous report form
   -------------------------------------------------------------------- */

function initReportForm() {
  const form = document.getElementById("anonymousReportForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const report = {
      district: document.getElementById("reportDistrictSelect").value,
      abuseType: document.getElementById("abuseTypeSelect").value,
      date: document.getElementById("incidentDateInput").value,
      time: document.getElementById("incidentTimeInput").value,
      description: document.getElementById("incidentDescInput").value,
      name: document.getElementById("optionalNameInput").value,
      phone: document.getElementById("optionalPhoneInput").value
    };

    const saved = vgSaveReport(report);

    form.style.display = "none";
    const resultBox = document.getElementById("reportSuccessResult");
    resultBox.style.display = "block";
    document.getElementById("generatedCodeDisplay").textContent = saved.code;

    document.getElementById("copyCodeBtn").onclick = function () {
      navigator.clipboard.writeText(saved.code);
      this.textContent = "✅ Copied";
      setTimeout(() => { this.textContent = "📋 Copy Code"; }, 1500);
    };

    document.getElementById("trackNowWithCodeBtn").onclick = function () {
      form.style.display = "block";
      resultBox.style.display = "none";
      form.reset();
      showView("view-track");
      document.getElementById("trackCodeInput").value = saved.code;
      document.getElementById("reportTrackForm").dispatchEvent(new Event("submit"));
    };
  });
}

/* --------------------------------------------------------------------
   Track report form
   -------------------------------------------------------------------- */

function initTrackForm() {
  const form = document.getElementById("reportTrackForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const code = document.getElementById("trackCodeInput").value.trim().toUpperCase();
    const report = vgGetReport(code);

    const errorBox = document.getElementById("trackErrorBox");
    const resultBox = document.getElementById("trackResultBox");

    if (!report) {
      errorBox.style.display = "block";
      errorBox.textContent = "No report found for code " + code + ". Please check the code and try again.";
      resultBox.style.display = "none";
      return;
    }

    errorBox.style.display = "none";
    resultBox.style.display = "block";

    document.getElementById("resCode").textContent = report.code;
    document.getElementById("resAbuseType").textContent = report.abuseType;
    document.getElementById("resCentre").textContent = "Isange OSC — " + report.district;
    document.getElementById("resDate").textContent = report.date;

    const badge = document.getElementById("resStatusBadge");
    badge.textContent = report.status;
    badge.className = "status-badge " + statusClass(report.status);

    const timeline = document.getElementById("resTimeline");
    timeline.innerHTML = report.timeline.map(function (t) {
      return (
        '<div class="timeline-item">' +
          '<div class="t-meta">' + formatDate(t.at) + " · " + t.staffName + "</div>" +
          '<div class="t-msg"><strong>' + t.status + ":</strong> " + escapeHtml(t.message) + "</div>" +
        "</div>"
      );
    }).join("");
  });
}

function statusClass(status) {
  if (status === "Under Review") return "status-under-review";
  if (status === "Action Taken") return "status-action-taken";
  return "status-submitted";
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) +
    " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* --------------------------------------------------------------------
   Rights page tabs + self-check quiz
   -------------------------------------------------------------------- */

function initRightsTabs() {
  document.querySelectorAll(".tab-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content-panel").forEach(p => p.style.display = "none");
      btn.classList.add("active");
      document.getElementById(btn.getAttribute("data-tab")).style.display = "block";
    });
  });
}

function initQuiz() {
  const checkboxes = document.querySelectorAll(".quiz-item input[type=checkbox]");
  const alertBox = document.getElementById("quizAlertBox");
  if (!checkboxes.length) return;

  checkboxes.forEach(function (cb) {
    cb.addEventListener("change", function () {
      const anyChecked = Array.from(checkboxes).some(c => c.checked);
      alertBox.style.display = anyChecked ? "block" : "none";
    });
  });
}

/* --------------------------------------------------------------------
   Staff portal (DEMO auth — see note in db.js)
   -------------------------------------------------------------------- */

const VUGANA_DEMO_PASSCODES = {
  staff: "isange2026",
  admin: "admin2026"
};

let vgCurrentRole = "staff";

function initStaffPortal() {
  const loginForm = document.getElementById("staffLoginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const role = document.getElementById("staffRoleSelect").value;
    const entered = document.getElementById("staffPasscodeInput").value;

    if (entered !== VUGANA_DEMO_PASSCODES[role]) {
      alert("Incorrect passcode for this role. (Demo — Staff: isange2026, Admin: admin2026)");
      return;
    }

    vgCurrentRole = role;
    document.getElementById("staffAuthBox").style.display = "none";
    document.getElementById("staffDashBox").style.display = "block";

    const isAdmin = role === "admin";
    document.getElementById("adminAnalyticsBox").style.display = isAdmin ? "block" : "none";
    document.getElementById("staffDashTitle").textContent = isAdmin
      ? "Admin Dashboard — All Districts"
      : "Isange Case Management Dashboard";
    document.getElementById("staffDashSubtitle").textContent = isAdmin
      ? "System-wide oversight of GBV reports across all 30 districts."
      : "Manage submitted GBV reports across Rwandan districts.";

    renderStaffTable();
  });

  const statusFilter = document.getElementById("staffStatusFilter");
  if (statusFilter) statusFilter.addEventListener("change", renderStaffTable);

  document.getElementById("closeModalBtn").addEventListener("click", closeStaffModal);

  document.getElementById("staffRespondForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const code = document.getElementById("modalReportCode").value;
    const status = document.getElementById("modalStaffStatus").value;
    const message = document.getElementById("modalStaffMessage").value;
    const staffName = document.getElementById("modalStaffName").value;

    vgUpdateReport(code, status, message, staffName);
    closeStaffModal();
    renderStaffTable();
  });
}

function renderStaffTable() {
  const tbody = document.getElementById("staffReportsTbody");
  if (!tbody) return;

  const districtFilter = document.getElementById("staffDistrictFilter").value || "ALL";
  const statusFilter = document.getElementById("staffStatusFilter").value || "ALL";

  let reports = vgGetAllReports();
  if (districtFilter !== "ALL") reports = reports.filter(r => r.district === districtFilter);
  if (statusFilter !== "ALL") reports = reports.filter(r => r.status === statusFilter);

  const allReports = vgGetAllReports();
  document.getElementById("staffTotalCount").textContent = allReports.length;

  if (vgCurrentRole === "admin") {
    document.getElementById("adminStatSubmitted").textContent = allReports.filter(r => r.status === "Submitted").length;
    document.getElementById("adminStatReview").textContent = allReports.filter(r => r.status === "Under Review").length;
    document.getElementById("adminStatAction").textContent = allReports.filter(r => r.status === "Action Taken").length;
    document.getElementById("adminStatDistricts").textContent = new Set(allReports.map(r => r.district)).size;
  }

  if (!reports.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: var(--text-muted); padding: 24px;">No reports match this filter yet.</td></tr>';
    return;
  }

  tbody.innerHTML = reports.map(function (r) {
    const preview = r.description.length > 60 ? r.description.slice(0, 60) + "…" : r.description;
    const deleteBtn = vgCurrentRole === "admin"
      ? ' <button class="btn-row-action" style="background: var(--emergency);" onclick="deleteReportRow(\'' + r.code + '\')">Delete</button>'
      : "";
    return (
      "<tr>" +
        "<td><strong>" + r.code + "</strong></td>" +
        "<td>" + r.district + "</td>" +
        "<td>" + r.abuseType + "</td>" +
        '<td><span class="status-badge ' + statusClass(r.status) + '">' + r.status + "</span></td>" +
        "<td>" + r.date + "</td>" +
        "<td>" + escapeHtml(preview) + "</td>" +
        '<td><button class="btn-row-action" onclick="openStaffModal(\'' + r.code + '\')">Respond</button>' + deleteBtn + "</td>" +
      "</tr>"
    );
  }).join("");
}

function deleteReportRow(code) {
  if (!confirm("Delete report " + code + "? This cannot be undone.")) return;
  const reports = vgGetAllReports().filter(function (r) { return r.code !== code; });
  vgSaveAllReports(reports);
  renderStaffTable();
}

function openStaffModal(code) {
  const report = vgGetReport(code);
  if (!report) return;

  document.getElementById("modalReportCode").value = report.code;
  document.getElementById("modalCodeDisplay").textContent = report.code;
  document.getElementById("modalDescDisplay").textContent = report.description;
  document.getElementById("modalStaffStatus").value = report.status;
  document.getElementById("modalStaffMessage").value = "";

  document.getElementById("staffModalOverlay").style.display = "flex";
}

function closeStaffModal() {
  document.getElementById("staffModalOverlay").style.display = "none";
}
