
const ISANGE_CENTRES = [
  // KIGALI CITY PROVINCE
  {
    id: "osc-gasabo",
    name: "Kacyiru Isange One Stop Centre (National Referral)",
    district: "Gasabo",
    province: "Kigali City",
    location: "Kacyiru Hospital, Gasabo District, Kigali",
    phone: "+250 788 311 116",
    hotline: "116",
    police_station: "Kacyiru Police Station / CID",
    services: ["Medical Examination", "Psychological Counseling", "Legal Aid & Evidence Collection", "Emergency Safe Shelter", "24/7 Hotline"],
    is_referral: true
  },
  {
    id: "osc-nyarugenge",
    name: "Muhima Isange One Stop Centre",
    district: "Nyarugenge",
    province: "Kigali City",
    location: "Muhima District Hospital, Nyarugenge, Kigali",
    phone: "+250 788 311 117",
    hotline: "116",
    police_station: "Nyarugenge Police Station",
    services: ["Medical Treatment", "Forensic Investigation", "Counseling", "Social Worker Assistance"],
    is_referral: false
  },
  {
    id: "osc-kicukiro",
    name: "Masaka Isange One Stop Centre",
    district: "Kicukiro",
    province: "Kigali City",
    location: "Masaka District Hospital, Kicukiro, Kigali",
    phone: "+250 788 311 118",
    hotline: "116",
    police_station: "Kicukiro Police Station",
    services: ["Medical Care", "Legal Consultation", "Trauma Counseling", "Safe Temporary Accommodation"],
    is_referral: false
  },

  // SOUTHERN PROVINCE
  {
    id: "osc-huye",
    name: "Huye Isange One Stop Centre (CHUB)",
    district: "Huye",
    province: "Southern Province",
    location: "University Teaching Hospital of Butare (CHUB), Huye",
    phone: "+250 788 311 119",
    hotline: "116",
    police_station: "Huye District Police Unit",
    services: ["Specialized Trauma Care", "Legal & RIB Liaison", "Psychological Therapy", "Medical Evidence Storage"],
    is_referral: true
  },
  {
    id: "osc-muhanga",
    name: "Kabgayi Isange One Stop Centre",
    district: "Muhanga",
    province: "Southern Province",
    location: "Kabgayi Referral Hospital, Muhanga",
    phone: "+250 788 311 120",
    hotline: "116",
    police_station: "Muhanga District Police Unit",
    services: ["Medical Examination", "Legal Referral", "Emergency Psychological Support"],
    is_referral: false
  },
  {
    id: "osc-nyanza",
    name: "Nyanza Isange One Stop Centre",
    district: "Nyanza",
    province: "Southern Province",
    location: "Nyanza District Hospital",
    phone: "+250 788 311 121",
    hotline: "116",
    police_station: "Nyanza Police Station",
    services: ["Medical Support", "Counseling", "RIB Reporting Assistance"],
    is_referral: false
  },
  {
    id: "osc-ruhango",
    name: "Ruhango Isange One Stop Centre",
    district: "Ruhango",
    province: "Southern Province",
    location: "Ruhango Hospital",
    phone: "+250 788 311 122",
    hotline: "116",
    police_station: "Ruhango Police Station",
    services: ["Medical Treatment", "Psychological Care", "Legal Aid"],
    is_referral: false
  },
  {
    id: "osc-nyaruguru",
    name: "Munini Isange One Stop Centre",
    district: "Nyaruguru",
    province: "Southern Province",
    location: "Munini Hospital, Nyaruguru",
    phone: "+250 788 311 123",
    hotline: "116",
    police_station: "Nyaruguru Police Unit",
    services: ["Medical Care", "Legal Guidance", "Emergency Shelter Referral"],
    is_referral: false
  },
  {
    id: "osc-gisagara",
    name: "Kibilizi Isange One Stop Centre",
    district: "Gisagara",
    province: "Southern Province",
    location: "Kibilizi Hospital, Gisagara",
    phone: "+250 788 311 124",
    hotline: "116",
    police_station: "Gisagara Police Station",
    services: ["Medical Treatment", "Trauma Counseling", "Legal Liaison"],
    is_referral: false
  },
  {
    id: "osc-nyamagabe",
    name: "Kigeme Isange One Stop Centre",
    district: "Nyamagabe",
    province: "Southern Province",
    location: "Kigeme Hospital, Nyamagabe",
    phone: "+250 788 311 125",
    hotline: "116",
    police_station: "Nyamagabe Police Station",
    services: ["Medical Care", "Social Worker Support", "Legal Protection"],
    is_referral: false
  },
  {
    id: "osc-kamonyi",
    name: "Remera-Rukoma Isange One Stop Centre",
    district: "Kamonyi",
    province: "Southern Province",
    location: "Remera-Rukoma Hospital, Kamonyi",
    phone: "+250 788 311 126",
    hotline: "116",
    police_station: "Kamonyi Police Unit",
    services: ["Medical Services", "Mental Health Support", "Legal Assistance"],
    is_referral: false
  },

  // WESTERN PROVINCE
  {
    id: "osc-rubavu",
    name: "Gisenyi Isange One Stop Centre",
    district: "Rubavu",
    province: "Western Province",
    location: "Gisenyi Hospital, Rubavu District",
    phone: "+250 788 311 127",
    hotline: "116",
    police_station: "Rubavu District Police Unit",
    services: ["24/7 Medical Care", "Cross-Border Crisis Support", "Legal Aid", "Trauma Counseling"],
    is_referral: true
  },
  {
    id: "osc-rusizi",
    name: "Gihundwe Isange One Stop Centre",
    district: "Rusizi",
    province: "Western Province",
    location: "Gihundwe District Hospital, Kamembe, Rusizi",
    phone: "+250 788 311 128",
    hotline: "116",
    police_station: "Rusizi Police Station",
    services: ["Medical Treatment", "Psychological Counseling", "Safe Room", "Legal Support"],
    is_referral: false
  },
  {
    id: "osc-karongi",
    name: "Kibuye Isange One Stop Centre",
    district: "Karongi",
    province: "Western Province",
    location: "Kibuye Referral Hospital, Karongi",
    phone: "+250 788 311 129",
    hotline: "116",
    police_station: "Karongi Police Unit",
    services: ["Medical Examination", "Legal Assistance", "Psychosocial Therapy"],
    is_referral: true
  },
  {
    id: "osc-rutsiro",
    name: "Murunda Isange One Stop Centre",
    district: "Rutsiro",
    province: "Western Province",
    location: "Murunda Hospital, Rutsiro",
    phone: "+250 788 311 130",
    hotline: "116",
    police_station: "Rutsiro Police Station",
    services: ["Medical Care", "Legal Guidance", "Social Counseling"],
    is_referral: false
  },
  {
    id: "osc-nyabihu",
    name: "Shyira Isange One Stop Centre",
    district: "Nyabihu",
    province: "Western Province",
    location: "Shyira Hospital, Nyabihu",
    phone: "+250 788 311 131",
    hotline: "116",
    police_station: "Nyabihu Police Station",
    services: ["Medical Treatment", "Trauma Counseling", "Legal Liaison"],
    is_referral: false
  },
  {
    id: "osc-ngororero",
    name: "Kabaya Isange One Stop Centre",
    district: "Ngororero",
    province: "Western Province",
    location: "Kabaya Hospital, Ngororero",
    phone: "+250 788 311 132",
    hotline: "116",
    police_station: "Ngororero Police Unit",
    services: ["Medical Services", "Mental Health Care", "Legal Defense Support"],
    is_referral: false
  },
  {
    id: "osc-nyamasheke",
    name: "Bushenge Isange One Stop Centre",
    district: "Nyamasheke",
    province: "Western Province",
    location: "Bushenge Provincial Hospital, Nyamasheke",
    phone: "+250 788 311 133",
    hotline: "116",
    police_station: "Nyamasheke Police Station",
    services: ["Medical Examination", "Specialized Counseling", "Legal Action Guidance"],
    is_referral: false
  },

  // NORTHERN PROVINCE
  {
    id: "osc-musanze",
    name: "Ruhengeri Isange One Stop Centre",
    district: "Musanze",
    province: "Northern Province",
    location: "Ruhengeri Referral Hospital, Musanze",
    phone: "+250 788 311 134",
    hotline: "116",
    police_station: "Musanze District Police Unit",
    services: ["Comprehensive Medical Care", "Trauma Support", "Legal Evidence Collection", "Shelter Referral"],
    is_referral: true
  },
  {
    id: "osc-gicumbi",
    name: "Byumba Isange One Stop Centre",
    district: "Gicumbi",
    province: "Northern Province",
    location: "Byumba Hospital, Gicumbi",
    phone: "+250 788 311 135",
    hotline: "116",
    police_station: "Gicumbi Police Unit",
    services: ["Medical Treatment", "Psychological First Aid", "Legal Advice"],
    is_referral: false
  },
  {
    id: "osc-rulindo",
    name: "Kinihira Isange One Stop Centre",
    district: "Rulindo",
    province: "Northern Province",
    location: "Kinihira Hospital, Rulindo",
    phone: "+250 788 311 136",
    hotline: "116",
    police_station: "Rulindo Police Station",
    services: ["Medical Services", "Trauma Counseling", "Legal Liaison"],
    is_referral: false
  },
  {
    id: "osc-burera",
    name: "Butaro Isange One Stop Centre",
    district: "Burera",
    province: "Northern Province",
    location: "Butaro Hospital, Burera",
    phone: "+250 788 311 137",
    hotline: "116",
    police_station: "Burera Police Unit",
    services: ["Medical Care", "Psychological Therapy", "Safe House Referral"],
    is_referral: false
  },
  {
    id: "osc-gakenke",
    name: "Nemba Isange One Stop Centre",
    district: "Gakenke",
    province: "Northern Province",
    location: "Nemba Hospital, Gakenke",
    phone: "+250 788 311 138",
    hotline: "116",
    police_station: "Gakenke Police Station",
    services: ["Medical Examination", "Legal Guidance", "Social Care"],
    is_referral: false
  },

  // EASTERN PROVINCE
  {
    id: "osc-rwamagana",
    name: "Rwamagana Isange One Stop Centre",
    district: "Rwamagana",
    province: "Eastern Province",
    location: "Rwamagana Provincial Hospital, Eastern Province",
    phone: "+250 788 311 139",
    hotline: "116",
    police_station: "Rwamagana District Police Unit",
    services: ["24/7 Medical Care", "Legal Assistance", "Psychosocial Therapy", "Forensic Lab Link"],
    is_referral: true
  },
  {
    id: "osc-kayonza",
    name: "Gahini Isange One Stop Centre",
    district: "Kayonza",
    province: "Eastern Province",
    location: "Gahini Hospital, Kayonza",
    phone: "+250 788 311 140",
    hotline: "116",
    police_station: "Kayonza Police Unit",
    services: ["Medical Care", "Legal Consultation", "Psychological Counseling"],
    is_referral: false
  },
  {
    id: "osc-nyagatare",
    name: "Nyagatare Isange One Stop Centre",
    district: "Nyagatare",
    province: "Eastern Province",
    location: "Nyagatare Hospital, Nyagatare",
    phone: "+250 788 311 141",
    hotline: "116",
    police_station: "Nyagatare Police Unit",
    services: ["Medical Treatment", "Legal Evidence Collection", "Counseling"],
    is_referral: false
  },
  {
    id: "osc-gatsibo",
    name: "Kiziguro Isange One Stop Centre",
    district: "Gatsibo",
    province: "Eastern Province",
    location: "Kiziguro Hospital, Gatsibo",
    phone: "+250 788 311 142",
    hotline: "116",
    police_station: "Gatsibo Police Station",
    services: ["Medical Services", "Trauma Support", "Legal Protection"],
    is_referral: false
  },
  {
    id: "osc-bugesera",
    name: "Nyamata Isange One Stop Centre",
    district: "Bugesera",
    province: "Eastern Province",
    location: "Nyamata Hospital, Bugesera",
    phone: "+250 788 311 143",
    hotline: "116",
    police_station: "Bugesera Police Unit",
    services: ["Medical Care", "Emergency Shelter Referral", "Social Work Consultation"],
    is_referral: false
  },
  {
    id: "osc-ngoma",
    name: "Kibungo Isange One Stop Centre",
    district: "Ngoma",
    province: "Eastern Province",
    location: "Kibungo Referral Hospital, Ngoma",
    phone: "+250 788 311 144",
    hotline: "116",
    police_station: "Ngoma Police Station",
    services: ["Specialized Trauma Medical Care", "Legal Assistance", "RIB Liaison"],
    is_referral: true
  },
  {
    id: "osc-kirehe",
    name: "Kirehe Isange One Stop Centre",
    district: "Kirehe",
    province: "Eastern Province",
    location: "Kirehe Hospital, Kirehe",
    phone: "+250 788 311 145",
    hotline: "116",
    police_station: "Kirehe Police Station",
    services: ["Medical Treatment", "Mental Health Support", "Legal Aid Referral"],
    is_referral: false
  }
];

const RWANDA_DISTRICTS = [
  // Kigali
  "Gasabo", "Nyarugenge", "Kicukiro",
  // Southern
  "Huye", "Muhanga", "Nyanza", "Ruhango", "Nyaruguru", "Gisagara", "Nyamagabe", "Kamonyi",
  // Western
  "Rubavu", "Rusizi", "Karongi", "Rutsiro", "Nyabihu", "Ngororero", "Nyamasheke",
  // Northern
  "Musanze", "Gicumbi", "Rulindo", "Burera", "Gakenke",
  // Eastern
  "Rwamagana", "Kayonza", "Nyagatare", "Gatsibo", "Bugesera", "Ngoma", "Kirehe"
];
