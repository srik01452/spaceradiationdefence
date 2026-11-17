# ASTRIS-Bio | NASA Space Apps Challenge 2026 Innovation
## Autonomous Flight Surgeon, Clinical Recovery & Real Astronaut Health App

> **ASTRIS-Bio** (*Autonomous Extraterrestrial Telemetry, Risk Intelligence & Space Medicine Guidance System*) is a production-grade digital health application and autonomous bio-sentinel built for long-duration deep space exploration.
>
> Developed for the **NASA International Space Apps Challenge 2026** under the theme:  
> **"Health Monitoring Software for Astronauts on Space Missions: Autonomous Care & Clinical Recovery Beyond Earth's Reach."**

---

## 👨‍⚕️ The Autonomous Flight Surgeon & Medical Recovery Suite

When astronauts are tens of millions of kilometers from Earth with radio delays exceeding 20 minutes round-trip, an automated software system must act with the diagnostic acumen, authority, and bedside manner of a seasoned **Chief Aerospace Medical Officer**.

### 1. Interactive Flight Surgeon Clinical Consultation ("Doctor's Clinical Rounds")
- **Conversational Doctor AI**: **Dr. ASTRIS, MD** conducts active morning rounds and acute trauma consultations.
- **Bedside Manner & Clinical Triage**: Directly interviews astronauts, analyzes live bio-telemetry, performs triage, provides reassurance, and issues personalized recovery prescriptions.
- **Quick-Intake Symptom Assessment Chips**:
  - 🦴 *"Severe lower back compression pain from deceleration"* (Evaluates lumbar compressive fracture risk, locks couch in 75° transverse position, prescribes Teriparatide 20mcg SQ).
  - ⚡ *"Nausea & exhaustion after radiation surge"* (Tolerates prodromal ARS, orders sublingual Ondansetron 8mg ODT + Filgrastim 300mcg SQ + hydration).
  - 👁️ *"Retro-orbital pressure & blurry vision (SANS)"* (Measures ONSD, schedules 120-min LBNP session at -20 mmHg, prescribes Acetazolamide 250mg BID).
  - 🌌 *"Feeling isolated, anxious & disconnected from Earth"* (Diagnoses Earth-Out-Of-View anxiety, initiates biophilic VR nature immersion and vagal breathing).
  - 🩺 *"Feeling nominal, run daily recovery prescription"* (Reviews full morning EHR and exercise targets).
- **Free-Form Patient Chat**: Astronauts can type custom symptoms or questions and receive structured clinical answers.

### 2. Patient Electronic Health Record (EHR) & SOAP Clinical Notes
- **Live Vitals Dashboard**: Blood Pressure, Mean Arterial Pressure (MAP), Heart Rate, SpO2, Optic Nerve Sheath Diameter (ONSD), and Lumbar BMD Loss %.
- **SOAP Encounter Note Generator**: Dynamically authors standard clinical notes:
  - **S**ubjective (Patient symptoms and complaints)
  - **O**bjective (Biometrics, ECG rhythm, dosimeter rates)
  - **A**ssessment (Clinical diagnoses and priority risks)
  - **P**lan (Pharmacology, physical therapy, and countermeasures)
- **One-Click Clinical Summary Export**: Generates and downloads a medical discharge summary and flight certificate (`.txt` / `.json`).

### 3. Daily Spaceflight Medication Dispenser & Adherence Log
- **Interactive Pharmacopeia**:
  - `Teriparatide (Forteo) 20 mcg SubQ`: Active trabecular bone remineralization.
  - `Cholecalciferol (Vitamin D3) 2000 IU PO`: Calcium balance & immune activation.
  - `Isotonic Electrolyte Oral Rehydration (1.2L Saline)`: Restores plasma volume.
  - `Filgrastim (G-CSF) 300 mcg SQ (PRN)`: Hematopoietic bone marrow rescue.
  - `Ondansetron 8 mg ODT`: Rapid sublingual antiemetic for radiation sickness.
  - `Acetazolamide (Diamox) 250 mg PO BID`: CSF reduction for acute SANS.
- **Live Adherence Calculator**: Tracks percentage compliance and logs administration events into the audit trail.

### 4. Guided Biofeedback Vagal Breathing Recovery Coach
- **Animated Box Breathing Visual Pacer**: 4s Inhale, 4s Hold, 4s Exhale, 4s Hold.
- **Harmonic Audio Pulses**: Synthesizes soft sine frequencies via Web Audio API to rhythmically pace breathing.
- **Autonomic Tone Normalization**: Elevates parasympathetic Heart Rate Variability (HRV - RMSSD $>45\text{ ms}$) to down-regulate sympathetic fight-or-flight stress.

---

## 🚀 Key Modules Across the Complete Suite

1. **👨‍⚕️ Flight Surgeon Recovery Clinic**: Interactive doctor chat, SOAP notes, medication dispenser, and vagal breathing coach.
2. **🫀 Physiology & "Bone Crushing" Fracture Risk**: 1000 Hz Lead-II ECG and PPG wave oscilloscopes, interactive G-load slider ($1.0\text{G}$ to $10.0\text{G}$), axial compression force vs failure strength ($0.78\text{ kN}$ to $6.4\text{ kN}$), and $75^\circ$ transverse seating protection.
3. **🌌 Behavioral, Confinement & Isolation**: "Earth-Out-Of-View" pale blue dot visualizer, acoustic voice stress biomarker, biophilic VR nature audio (rainforest, ocean, wind), and NASA 3-minute Psychomotor Vigilance Test (PVT-B).
4. **☢️ Space Radiation Tissue Penetration & Overdose**: Bragg-peak depth ionization model (Skin, Lens, CNS, Marrow, GI), Acute Radiation Syndrome (ARS) progress tracker, and compartment shielding heatmap.
5. **🛰️ Distance from Earth & Emergency Abort Engine**: Orbital astrodynamics model (LEO, Gateway, Mars Transit, Mars Orbit), One-Way Light Time comm delay calculator, Trans-Earth Injection (TEI $\Delta v = 1,420\text{ m/s}$) abort burn, and Pacific recovery coordinates ($14^\circ\text{N}, 168^\circ\text{W}$).
6. **📋 7 Actionable Medical Guidance Protocols**: Step-by-step checklists with countdown timers for SPE shelters, emergency landing aborts, spinal compression mitigation, SANS decompression, hypoxia, arrhythmias, and isolation resets.
7. **📚 NASA Space Apps Challenge 2026 Hub**: Complete evidence base referencing NASA-STD-3001, NCRP Report 153, and HRP clinical guidelines.

---

## 🛠️ How to Launch the Application

The web app is completely self-contained using modern HTML5, CSS3, ES6 JavaScript, HTML5 Canvas, and the Web Audio API with **zero external server or build dependencies**.

### Direct File Launch
Open directly in any modern browser (Chrome, Edge, Brave):
```
file:///C:/Users/Admin/.gemini/antigravity/scratch/astrohealth-monitor/index.html
```

### Active Workspace Recommendation
Set your Antigravity IDE active workspace to:
```
C:\Users\Admin\.gemini\antigravity\scratch\astrohealth-monitor
```

---

## 📁 File Manifest
- `index.html`: Complete NASA/Space Apps HUD interface layout and interactive panels.
- `styles.css`: High-contrast dark space glassmorphic styling, responsive grid, doctor clinic themes, and animations.
- `app.js`: Real-time telemetry, procedural Web Audio synthesizer, canvas oscilloscopes, G-load fracture math, doctor consultation engine, EHR, and protocols.
- `README.md`: Technical documentation and NASA Space Apps Challenge 2026 innovation brief.
