/**
 * VUGANA — Application Controller & UI Logic (js/app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global App State
  const state = {
    currentLang: localStorage.getItem('vugana_lang') || 'en',
    currentTheme: localStorage.getItem('vugana_theme') || 'light',
    staffAuthenticated: false,
    activeStaffReport: null
  };

  // Initialize UI & Event Listeners
  initTheme();
  initLanguage();
  initNavigation();
  initFormControls();
  initIsangeDirectory();
  initRightsTab();
  initStaffPortal();
  initQuickExit();

  // -------------------------------------------------------------
  // 1. Theme Initialization
  // -------------------------------------------------------------
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.currentTheme);
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.textContent = state.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
      themeBtn.addEventListener('click', () => {
        state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('vugana_theme', state.currentTheme);
        document.documentElement.setAttribute('data-theme', state.currentTheme);
        themeBtn.textContent = state.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
      });
    }
  }

  // -------------------------------------------------------------
  // 2. Language & Internationalization (i18n)
  // -------------------------------------------------------------
  function initLanguage() {
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.textContent = state.currentLang === 'en' ? '🇷🇼 Kinyarwanda' : '🇬🇧 English';
      langBtn.addEventListener('click', () => {
        state.currentLang = state.currentLang === 'en' ? 'rw' : 'en';
        localStorage.setItem('vugana_lang', state.currentLang);
        langBtn.textContent = state.currentLang === 'en' ? '🇷🇼 Kinyarwanda' : '🇬🇧 English';
        applyTranslations();
      });
    }
    applyTranslations();
  }

  function applyTranslations() {
    const lang = state.currentLang;
    const dict = I18N_DATA[lang] || I18N_DATA.en;

    // Data-i18n text replacement
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = getNestedValue(dict, key);
      if (text) el.textContent = text;
    });

    // Data-i18n-placeholder replacement
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = getNestedValue(dict, key);
      if (text) el.placeholder = text;
    });

    // Update dynamic options for abuse types in report form
    const abuseSelect = document.getElementById('abuseTypeSelect');
    if (abuseSelect && dict.report_form && dict.report_form.type_options) {
      const currentVal = abuseSelect.value;
      abuseSelect.innerHTML = `<option value="">${dict.report_form.type_label}</option>` +
        dict.report_form.type_options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
      if (currentVal) abuseSelect.value = currentVal;
    }

    // Refresh active components if open
    renderIsangeCentres();
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  // -------------------------------------------------------------
  // 3. Navigation & Single Page Routing
  // -------------------------------------------------------------
  function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, [data-navigate]');
    const pageViews = document.querySelectorAll('.page-view');
    const mobileToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');

    function navigateTo(viewId) {
      pageViews.forEach(view => {
        if (view.id === viewId) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });

      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-navigate') === viewId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      if (navMenu) navMenu.classList.remove('mobile-open');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = link.getAttribute('data-navigate');
        if (targetView) navigateTo(targetView);
      });
    });

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
      });
    }

    // Expose navigate globally
    window.vuganaNavigate = navigateTo;
  }

  // -------------------------------------------------------------
  // 4. Anonymous Report Submission Form
  // -------------------------------------------------------------
  function initFormControls() {
    const districtSelect = document.getElementById('reportDistrictSelect');
    const form = document.getElementById('anonymousReportForm');
    const resultBox = document.getElementById('reportSuccessResult');
    const codeDisplay = document.getElementById('generatedCodeDisplay');
    const copyBtn = document.getElementById('copyCodeBtn');

    // Populate Rwandan Districts dropdown
    if (districtSelect) {
      districtSelect.innerHTML = `<option value="">-- Select District --</option>` +
        RWANDA_DISTRICTS.map(d => `<option value="${d}">${d}</option>`).join('');
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const district = districtSelect.value;
        const abuseType = document.getElementById('abuseTypeSelect').value;
        const incidentDate = document.getElementById('incidentDateInput').value;
        const incidentTime = document.getElementById('incidentTimeInput').value;
        const description = document.getElementById('incidentDescInput').value;
        const optionalName = document.getElementById('optionalNameInput').value;
        const optionalPhone = document.getElementById('optionalPhoneInput').value;

        if (!district || !abuseType || !description) {
          alert('Please fill in the required fields (District, Abuse Type, and Description).');
          return;
        }

        // Find nearest matching Isange Centre for selected district
        const matchedCentre = ISANGE_CENTRES.find(c => c.district.toLowerCase() === district.toLowerCase());
        const centreName = matchedCentre ? matchedCentre.name : `Isange One Stop Centre (${district})`;
        const provinceName = matchedCentre ? matchedCentre.province : 'Rwanda';

        const payload = {
          district: district,
          province: provinceName,
          abuse_type: abuseType,
          incident_date: incidentDate,
          incident_time: incidentTime,
          description: description,
          optional_name: optionalName,
          optional_phone: optionalPhone,
          isange_centre: centreName
        };

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Encrypted Report...';

        try {
          const response = await VuganaDB.submitReport(payload);
          if (response && response.tracking_code) {
            form.style.display = 'none';
            resultBox.style.display = 'block';
            codeDisplay.textContent = response.tracking_code;

            // Set track action
            document.getElementById('trackNowWithCodeBtn').onclick = () => {
              document.getElementById('trackCodeInput').value = response.tracking_code;
              window.vuganaNavigate('view-track');
              performTracking(response.tracking_code);
            };
          } else {
            alert('Could not submit report. Please try again.');
          }
        } catch (err) {
          alert('An error occurred during submission. Please try again.');
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = I18N_DATA[state.currentLang].report_form.submit_btn;
        }
      });
    }

    if (copyBtn && codeDisplay) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeDisplay.textContent.trim());
        const orig = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => copyBtn.textContent = orig, 2000);
      });
    }

    // Tracking Form Trigger
    const trackForm = document.getElementById('reportTrackForm');
    if (trackForm) {
      trackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('trackCodeInput').value;
        performTracking(code);
      });
    }
  }

  // Perform tracking search
  async function performTracking(code) {
    const resultBox = document.getElementById('trackResultBox');
    const errorBox = document.getElementById('trackErrorBox');
    
    if (!code || !code.trim()) {
      errorBox.style.display = 'block';
      errorBox.textContent = 'Please enter a valid tracking code.';
      resultBox.style.display = 'none';
      return;
    }

    const res = await VuganaDB.trackReport(code);
    if (res && res.report) {
      const report = res.report;
      errorBox.style.display = 'none';
      resultBox.style.display = 'block';

      document.getElementById('resCode').textContent = report.tracking_code;
      document.getElementById('resCentre').textContent = report.isange_centre;
      document.getElementById('resDate').textContent = new Date(report.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      document.getElementById('resAbuseType').textContent = report.abuse_type;

      // Status Badge
      const statusBadge = document.getElementById('resStatusBadge');
      statusBadge.textContent = report.status;
      statusBadge.className = 'status-badge ' + (
        report.status === 'Submitted' ? 'status-submitted' :
        report.status === 'Under Review' ? 'status-review' : 'status-action'
      );

      // Render Messages Timeline
      const timeline = document.getElementById('resTimeline');
      timeline.innerHTML = '';

      if (report.responses && report.responses.length > 0) {
        report.responses.forEach(resp => {
          const timeStr = new Date(resp.created_at).toLocaleString();
          const item = document.createElement('div');
          item.className = 'timeline-item';
          item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-author">${escapeHtml(resp.staff_name)}</span>
                <span class="timeline-time">${timeStr}</span>
              </div>
              <p style="margin-top: 4px; font-size: 0.95rem;">${escapeHtml(resp.message)}</p>
              ${resp.status_change ? `<span class="service-tag" style="margin-top: 8px; display: inline-block;">Status: ${escapeHtml(resp.status_change)}</span>` : ''}
            </div>
          `;
          timeline.appendChild(item);
        });
      } else {
        timeline.innerHTML = `<p style="color: var(--text-muted);">${I18N_DATA[state.currentLang].tracking.no_history}</p>`;
      }
    } else {
      resultBox.style.display = 'none';
      errorBox.style.display = 'block';
      errorBox.textContent = res.error || I18N_DATA[state.currentLang].tracking.error_not_found;
    }
  }

  // -------------------------------------------------------------
  // 5. Isange One Stop Centres Directory
  // -------------------------------------------------------------
  function initIsangeDirectory() {
    const districtFilter = document.getElementById('centreDistrictFilter');
    if (districtFilter) {
      districtFilter.innerHTML = `<option value="ALL">All Districts (30 Districts)</option>` +
        RWANDA_DISTRICTS.map(d => `<option value="${d}">${d}</option>`).join('');

      districtFilter.addEventListener('change', () => {
        renderIsangeCentres(districtFilter.value);
      });
    }
    renderIsangeCentres();
  }

  function renderIsangeCentres(filterDistrict = 'ALL') {
    const grid = document.getElementById('isangeGridContainer');
    if (!grid) return;

    let centres = ISANGE_CENTRES;
    if (filterDistrict !== 'ALL') {
      centres = centres.filter(c => c.district.toLowerCase() === filterDistrict.toLowerCase());
    }

    grid.innerHTML = '';
    centres.forEach(c => {
      const card = document.createElement('div');
      card.className = 'centre-card';
      card.innerHTML = `
        <div>
          <div class="centre-district-tag">${c.district} District • ${c.province}</div>
          <h3 class="centre-name">${c.name}</h3>
          <div class="centre-detail">📍 <strong>Location:</strong> ${c.location}</div>
          <div class="centre-detail">📞 <strong>Direct Line:</strong> <a href="tel:${c.phone}">${c.phone}</a></div>
          <div class="centre-detail">🚨 <strong>Toll-Free Hotline:</strong> <a href="tel:116">116</a></div>
          <div class="centre-detail">🚔 <strong>RIB / Police Unit:</strong> ${c.police_station}</div>
        </div>
        <div>
          <div class="centre-services-tags">
            ${c.services.map(s => `<span class="service-tag">${s}</span>`).join('')}
          </div>
          <a href="tel:${c.phone}" class="btn-primary" style="width: 100%; margin-top: 16px; justify-content: center; font-size: 0.9rem; padding: 10px;">
            📞 Call Centre Now
          </a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // -------------------------------------------------------------
  // 6. Rights & Quiz Interactive Tabs
  // -------------------------------------------------------------
  function initRightsTab() {
    const tabBtns = document.querySelectorAll('.rights-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.tab-content-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.style.display = 'none');

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.style.display = 'block';
      });
    });

    // Quiz Checkbox Listener
    const quizCheckboxes = document.querySelectorAll('.quiz-item input[type="checkbox"]');
    const alertBox = document.getElementById('quizAlertBox');

    quizCheckboxes.forEach(chk => {
      chk.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.quiz-item input[type="checkbox"]:checked').length;
        if (alertBox) {
          alertBox.style.display = checkedCount > 0 ? 'block' : 'none';
        }
      });
    });
  }

  // -------------------------------------------------------------
  // 7. Isange Staff Portal & Case Management
  // -------------------------------------------------------------
  function initStaffPortal() {
    const loginForm = document.getElementById('staffLoginForm');
    const authBox = document.getElementById('staffAuthBox');
    const dashBox = document.getElementById('staffDashBox');
    const passcodeBtn = document.getElementById('staffLoginBtn');

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('staffPasscodeInput').value.trim();
        if (code === 'isange2026' || code === 'admin') {
          state.staffAuthenticated = true;
          authBox.style.display = 'none';
          dashBox.style.display = 'block';
          loadStaffDashboard();
        } else {
          alert('Invalid passcode. Default passcode is: isange2026');
        }
      });
    }

    const filterDistrict = document.getElementById('staffDistrictFilter');
    const filterStatus = document.getElementById('staffStatusFilter');

    if (filterDistrict) {
      filterDistrict.innerHTML = `<option value="ALL">All Districts</option>` +
        RWANDA_DISTRICTS.map(d => `<option value="${d}">${d}</option>`).join('');

      filterDistrict.addEventListener('change', loadStaffDashboard);
    }
    if (filterStatus) {
      filterStatus.addEventListener('change', loadStaffDashboard);
    }

    // Response Modal Handler
    const respondForm = document.getElementById('staffRespondForm');
    if (respondForm) {
      respondForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const code = document.getElementById('modalReportCode').value;
        const msg = document.getElementById('modalStaffMessage').value;
        const newStatus = document.getElementById('modalStaffStatus').value;
        const staffName = document.getElementById('modalStaffName').value;

        if (!msg) {
          alert('Please enter a response message.');
          return;
        }

        const res = await VuganaDB.addStaffResponse({
          tracking_code: code,
          staff_name: staffName || 'Isange Officer',
          message: msg,
          new_status: newStatus
        });

        if (res && res.success) {
          alert('Response and status update posted successfully!');
          document.getElementById('staffModalOverlay').style.display = 'none';
          loadStaffDashboard();
        } else {
          alert('Failed to post response.');
        }
      });
    }

    const modalClose = document.getElementById('closeModalBtn');
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        document.getElementById('staffModalOverlay').style.display = 'none';
      });
    }
  }

  async function loadStaffDashboard() {
    if (!state.staffAuthenticated) return;

    const district = document.getElementById('staffDistrictFilter').value;
    const status = document.getElementById('staffStatusFilter').value;
    const tbody = document.getElementById('staffReportsTbody');
    const countEl = document.getElementById('staffTotalCount');

    const reports = await VuganaDB.getAllReports(district, status);
    if (countEl) countEl.textContent = reports.length;

    tbody.innerHTML = '';
    if (reports.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No reports found matching your criteria.</td></tr>`;
      return;
    }

    reports.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color: var(--primary); font-family: monospace;">${escapeHtml(r.tracking_code)}</strong></td>
        <td>${escapeHtml(r.district)}</td>
        <td>${escapeHtml(r.abuse_type)}</td>
        <td><span class="status-badge ${r.status === 'Submitted' ? 'status-submitted' : r.status === 'Under Review' ? 'status-review' : 'status-action'}">${escapeHtml(r.status)}</span></td>
        <td>${new Date(r.created_at).toLocaleDateString()}</td>
        <td><div style="max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(r.description)}</div></td>
        <td>
          <button class="btn-primary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="openStaffModal('${r.tracking_code}')">
            💬 Action & Reply
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Global helper for opening staff response modal
  window.openStaffModal = async function(trackingCode) {
    const res = await VuganaDB.trackReport(trackingCode);
    if (res && res.report) {
      const r = res.report;
      document.getElementById('modalReportCode').value = r.tracking_code;
      document.getElementById('modalCodeDisplay').textContent = r.tracking_code + ' (' + r.district + ')';
      document.getElementById('modalDescDisplay').textContent = r.description;
      document.getElementById('modalStaffStatus').value = r.status;
      document.getElementById('modalStaffMessage').value = '';
      document.getElementById('staffModalOverlay').style.display = 'flex';
    }
  };

  // -------------------------------------------------------------
  // 8. Safety Quick Exit Mechanism
  // -------------------------------------------------------------
  function initQuickExit() {
    const exitBtns = document.querySelectorAll('.btn-quick-exit');
    exitBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Immediately replace current window location with neutral weather site
        window.location.replace('https://www.accuweather.com/en/rw/kigali/288484/weather-forecast/288484');
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
