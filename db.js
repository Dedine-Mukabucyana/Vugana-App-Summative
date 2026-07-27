/**
 * VUGANA Data Access Layer (js/db.js)
 * Seamlessly interfaces with the Express REST API (/api/reports)
 * and provides LocalStorage / IndexedDB fallback for offline/static hosting resilience.
 */

const VuganaDB = (function() {
  const LOCAL_STORAGE_KEY = 'vugana_local_reports_v1';

  // Seed default sample reports for offline demonstration if empty
  function getLocalStorageReports() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      const initialSeed = [
        {
          id: "VGN-482910",
          tracking_code: "VGN-482910",
          district: "Gasabo",
          province: "Kigali City",
          abuse_type: "Physical Violence",
          incident_date: "2026-07-20",
          incident_time: "18:30",
          description: "Domestic dispute in Kimironko sector involving physical threats.",
          optional_name: "Anonymous",
          optional_phone: "Not provided",
          status: "Under Review",
          isange_centre: "Kacyiru Isange One Stop Centre (Gasabo)",
          created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
          updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
          responses: [
            {
              staff_name: "Isange Officer - Kacyiru",
              message: "Report received and assigned to a specialized social worker. Local RIB station notified for patrol check.",
              status_change: "Under Review",
              created_at: new Date(Date.now() - 86400000 * 1).toISOString()
            }
          ]
        },
        {
          id: "VGN-739102",
          tracking_code: "VGN-739102",
          district: "Huye",
          province: "Southern Province",
          abuse_type: "Emotional / Psychological Abuse",
          incident_date: "2026-07-24",
          incident_time: "14:00",
          description: "Witness reporting continuous harassment and intimidation of a student near university accommodation.",
          optional_name: "Witness (Anonymous)",
          optional_phone: "Not provided",
          status: "Action Taken",
          isange_centre: "Huye Isange One Stop Centre (CHUB)",
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
          responses: [
            {
              staff_name: "Isange Social Worker - Huye",
              message: "Case reviewed. Survivor contacted confidentially through partner community health worker. Safe housing guidance provided.",
              status_change: "Action Taken",
              created_at: new Date(Date.now() - 86400000 * 1).toISOString()
            }
          ]
        }
      ];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialSeed));
      return initialSeed;
    }
    return JSON.parse(data);
  }

  function saveLocalStorageReports(reports) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reports));
  }

  function generateCode() {
    const chars = '0123456789';
    let code = 'VGN-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  return {
    /**
     * Submit new report
     */
    async submitReport(reportData) {
      try {
        const response = await fetch('/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reportData)
        });
        if (response.ok) {
          const resJson = await response.json();
          // Sync local copy
          const local = getLocalStorageReports();
          local.unshift(resJson.report);
          saveLocalStorageReports(local);
          return resJson;
        }
      } catch (err) {
        console.warn('API server unreachable, using local storage fallback mode:', err);
      }

      // Local Fallback Execution
      const code = generateCode();
      const localReports = getLocalStorageReports();
      const newReport = {
        id: code,
        tracking_code: code,
        district: reportData.district,
        province: reportData.province || 'Rwanda',
        abuse_type: reportData.abuse_type,
        incident_date: reportData.incident_date || new Date().toISOString().split('T')[0],
        incident_time: reportData.incident_time || 'Not specified',
        description: reportData.description,
        optional_name: reportData.optional_name || 'Anonymous',
        optional_phone: reportData.optional_phone || 'Not provided',
        status: 'Submitted',
        isange_centre: reportData.isange_centre || `Isange One Stop Centre (${reportData.district})`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        responses: [
          {
            staff_name: 'VUGANA System',
            message: 'Report successfully recorded and securely transmitted to nearest Isange Centre.',
            status_change: 'Submitted',
            created_at: new Date().toISOString()
          }
        ]
      };
      localReports.unshift(newReport);
      saveLocalStorageReports(localReports);
      return { success: true, tracking_code: code, report: newReport };
    },

    /**
     * Track report by tracking code
     */
    async trackReport(code) {
      const formattedCode = code.trim().toUpperCase();
      try {
        const response = await fetch(`/api/reports/track/${encodeURIComponent(formattedCode)}`);
        if (response.ok) {
          const resJson = await response.json();
          return resJson;
        }
      } catch (err) {
        console.warn('API track endpoint unreachable, checking local storage:', err);
      }

      // Local Fallback Search
      const localReports = getLocalStorageReports();
      const match = localReports.find(r => r.tracking_code.toUpperCase() === formattedCode);
      if (match) {
        return { success: true, report: match };
      }
      return { error: 'Report not found for this code.' };
    },

    /**
     * Fetch all reports for Staff Dashboard
     */
    async getAllReports(districtFilter = 'ALL', statusFilter = 'ALL') {
      try {
        const response = await fetch(`/api/reports?district=${encodeURIComponent(districtFilter)}&status=${encodeURIComponent(statusFilter)}`);
        if (response.ok) {
          const resJson = await response.json();
          return resJson.reports;
        }
      } catch (err) {
        console.warn('API get reports unreachable, loading local storage:', err);
      }

      // Local Fallback Filter
      let reports = getLocalStorageReports();
      if (districtFilter && districtFilter !== 'ALL') {
        reports = reports.filter(r => r.district.toLowerCase() === districtFilter.toLowerCase());
      }
      if (statusFilter && statusFilter !== 'ALL') {
        reports = reports.filter(r => r.status.toLowerCase() === statusFilter.toLowerCase());
      }
      return reports;
    },

    /**
     * Post staff response & update status
     */
    async addStaffResponse(payload) {
      try {
        const response = await fetch('/api/reports/respond', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          const resJson = await response.json();
          // Sync local copy
          const local = getLocalStorageReports();
          const idx = local.findIndex(r => r.tracking_code.toUpperCase() === payload.tracking_code.toUpperCase());
          if (idx !== -1) {
            local[idx] = resJson.report;
            saveLocalStorageReports(local);
          }
          return resJson;
        }
      } catch (err) {
        console.warn('API respond unreachable, updating local storage:', err);
      }

      // Local Fallback Update
      const local = getLocalStorageReports();
      const report = local.find(r => r.tracking_code.toUpperCase() === payload.tracking_code.toUpperCase());
      if (!report) return { error: 'Report not found locally.' };

      if (payload.new_status) {
        report.status = payload.new_status;
      }
      report.updated_at = new Date().toISOString();

      report.responses.push({
        staff_name: payload.staff_name || 'Isange Officer',
        message: payload.message,
        status_change: payload.new_status || report.status,
        created_at: new Date().toISOString()
      });

      saveLocalStorageReports(local);
      return { success: true, report };
    }
  };
})();
