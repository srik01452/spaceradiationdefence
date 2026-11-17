/**
 * ASTRIS-Bio: Deep Space Autonomous Health & Medical Guidance System
 * NASA Space Apps Challenge 2026 Innovation Architecture
 * Autonomous Flight Surgeon, Clinical Rounds, EHR, Biofeedback & Recovery
 */

// ========================================================
// 1. DATA STATE & CREW ROSTER
// ========================================================

const CREW_DATA = [
  {
    id: 'astro-01',
    name: 'CDR Srikanth',
    role: 'Commander / Astrobiology Lead',
    initials: 'SK',
    status: 'NOMINAL',
    hr: 72,
    hrRange: [68, 76],
    bp: '118/76',
    map: 90,
    spo2: 98.6,
    temp: 37.1,
    icp: 14.0,
    onsd: 5.1,
    resp: 14,
    cumDose: 34.2,
    doseRate: 0.038,
    protonFlux: 0.42,
    bmdLoss: 1.48,
    voiceStress: 12,
    pvtBest: 212,
    pvtMean: 236,
    pvtLapses: 0,
    pvtReadiness: 'PRIME FOR MISSION'
  },
  {
    id: 'astro-02',
    name: 'PLT Sersan',
    role: 'Pilot / Orbital Flight Engineer',
    initials: 'SE',
    status: 'NOMINAL',
    hr: 74,
    hrRange: [70, 78],
    bp: '120/78',
    map: 92,
    spo2: 98.4,
    temp: 37.2,
    icp: 14.5,
    onsd: 5.2,
    resp: 15,
    cumDose: 32.1,
    doseRate: 0.036,
    protonFlux: 0.42,
    bmdLoss: 1.62,
    voiceStress: 15,
    pvtBest: 220,
    pvtMean: 245,
    pvtLapses: 0,
    pvtReadiness: 'FLIGHT READY'
  },
  {
    id: 'astro-03',
    name: 'MS Surya',
    role: 'Mission Specialist / Radiation Physicist',
    initials: 'SU',
    status: 'CAUTION',
    hr: 70,
    hrRange: [66, 74],
    bp: '116/74',
    map: 88,
    spo2: 98.8,
    temp: 37.0,
    icp: 15.2,
    onsd: 5.3,
    resp: 14,
    cumDose: 35.8,
    doseRate: 0.040,
    protonFlux: 0.42,
    bmdLoss: 1.35,
    voiceStress: 22,
    pvtBest: 228,
    pvtMean: 258,
    pvtLapses: 1,
    pvtReadiness: 'MILD FATIGUE'
  },
  {
    id: 'astro-04',
    name: 'SO Siva',
    role: 'Science Officer / Neuro-Physiology Lead',
    initials: 'SI',
    status: 'NOMINAL',
    hr: 68,
    hrRange: [64, 72],
    bp: '114/72',
    map: 86,
    spo2: 99.1,
    temp: 36.9,
    icp: 13.8,
    onsd: 4.9,
    resp: 13,
    cumDose: 29.7,
    doseRate: 0.035,
    protonFlux: 0.42,
    bmdLoss: 1.20,
    voiceStress: 10,
    pvtBest: 204,
    pvtMean: 225,
    pvtLapses: 0,
    pvtReadiness: 'OPTIMAL COGNITION'
  },
  {
    id: 'astro-05',
    name: 'PS Vishal',
    role: 'Payload Specialist / Aerospace Systems',
    initials: 'VI',
    status: 'NOMINAL',
    hr: 76,
    hrRange: [72, 80],
    bp: '122/80',
    map: 94,
    spo2: 98.2,
    temp: 37.2,
    icp: 14.8,
    onsd: 5.2,
    resp: 15,
    cumDose: 30.5,
    doseRate: 0.037,
    protonFlux: 0.42,
    bmdLoss: 1.55,
    voiceStress: 16,
    pvtBest: 218,
    pvtMean: 242,
    pvtLapses: 0,
    pvtReadiness: 'PRIME FOR EVA'
  },
  {
    id: 'astro-06',
    name: 'FMO Sabari',
    role: 'Flight Medical Officer / Bio-Technologist',
    initials: 'SA',
    status: 'NOMINAL',
    hr: 69,
    hrRange: [65, 73],
    bp: '115/75',
    map: 88,
    spo2: 98.8,
    temp: 37.0,
    icp: 13.9,
    onsd: 5.0,
    resp: 14,
    cumDose: 28.9,
    doseRate: 0.034,
    protonFlux: 0.42,
    bmdLoss: 1.28,
    voiceStress: 11,
    pvtBest: 210,
    pvtMean: 232,
    pvtLapses: 0,
    pvtReadiness: 'MEDICAL CHIEF READY'
  }
];

// Trajectory Profiles
const TRAJECTORY_MODELS = {
  leo: {
    name: 'LEO (Space Station)',
    km: 408,
    au: '0.0000027 AU',
    owltSec: 0.00136,
    owltText: '00m 00.001s',
    markerPct: '5%',
    transitDays: '3.5 Hours'
  },
  moon: {
    name: 'Cislunar / Artemis Gateway',
    km: 384400,
    au: '0.00257 AU',
    owltSec: 1.282,
    owltText: '00m 01.28s',
    markerPct: '15%',
    transitDays: '4.2 Days'
  },
  mars_transit: {
    name: 'Mars Transit Deep Space',
    km: 56420800,
    au: '0.3771 AU',
    owltSec: 188.2,
    owltText: '03m 08s',
    markerPct: '45%',
    transitDays: '38 Days (Emergency Fast Burn)'
  },
  mars_orbit: {
    name: 'Mars Arrival Orbit',
    km: 225100000,
    au: '1.5047 AU',
    owltSec: 750.8,
    owltText: '12m 31s',
    markerPct: '90%',
    transitDays: '142 Days (Opposition Return)'
  }
};

let currentAstro = CREW_DATA[0];
window.currentAstro = currentAstro;
window.CREW_DATA = CREW_DATA;
let currentPhaseKey = 'mars_transit';
let currentCrisis = 'nominal';
let audioEnabled = true;
let isAlarmSounding = false;
let currentGload = 1.0;
let breathingInterval = null;
let breathingPhase = 0; // 0=inhale, 1=hold1, 2=exhale, 3=hold2

// ========================================================
// 2. PROCEDURAL SOUND SYNTHESIZER (WEB AUDIO API)
// ========================================================

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.alarmInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playHeartbeat() {
    if (!audioEnabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playChime(nominal = true) {
    if (!audioEnabled) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      if (nominal) {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      } else {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(349.23, now + 0.15);
      }

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playCautionBeep() {
    if (!audioEnabled) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.2);
    } catch (e) {
      console.warn(e);
    }
  }

  startCriticalKlaxon() {
    if (!audioEnabled || isAlarmSounding) return;
    this.init();
    isAlarmSounding = true;

    const playTone = () => {
      if (!isAlarmSounding || !audioEnabled) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(960, now);
      osc.frequency.setValueAtTime(1280, now + 0.25);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.48);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.5);
    };

    playTone();
    this.alarmInterval = setInterval(playTone, 750);
  }

  stopCriticalKlaxon() {
    isAlarmSounding = false;
    if (this.alarmInterval) {
      clearInterval(this.alarmInterval);
      this.alarmInterval = null;
    }
  }

  playBiophilicNature(type) {
    if (!audioEnabled) return;
    this.init();
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = type === 'rain' ? 600 : (type === 'waves' ? 350 : 250);
      filter.Q.value = 1.2;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();

      setTimeout(() => {
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
        setTimeout(() => noise.stop(), 1600);
      }, 5000);
    } catch (e) {
      console.warn(e);
    }
  }

  playBreathTone(freq) {
    if (!audioEnabled) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.8);
    } catch (e) {
      console.warn(e);
    }
  }
}

const synth = new SoundSynthesizer();

// ========================================================
// 3. FLIGHT SURGEON INTERACTIVE DOCTOR CLINIC (NEW)
// ========================================================

// ========================================================
// 2. SPEECH SYNTHESIS ENGINE (DR. ASTRIS FLIGHT SURGEON VOICE)
// ========================================================
let doctorVoiceEnabled = true;
let currentUtterance = null;

function initDoctorSpeech() {
  if (!('speechSynthesis' in window)) {
    console.warn('Web Speech API not supported in this environment.');
    const toggleBtn = document.getElementById('btn-toggle-doctor-voice');
    if (toggleBtn) toggleBtn.style.display = 'none';
    const stopBtn = document.getElementById('btn-stop-doctor-speech');
    if (stopBtn) stopBtn.style.display = 'none';
    return;
  }
  // Pre-load voices if supported
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
  updateDoctorVoiceButtonUI();
}

function stopDoctorSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  setDoctorSpeakingVisual(false);
}

function toggleDoctorVoice() {
  doctorVoiceEnabled = !doctorVoiceEnabled;
  if (!doctorVoiceEnabled) {
    stopDoctorSpeech();
  }
  updateDoctorVoiceButtonUI();
  if (doctorVoiceEnabled) {
    speakDoctor("Doctor voice guidance active. Flight surgeon medical channel is online and standing by.", false);
  }
}

function updateDoctorVoiceButtonUI() {
  const btn = document.getElementById('btn-toggle-doctor-voice');
  const icon = document.getElementById('voice-icon');
  const lbl = document.getElementById('voice-label');
  if (!btn) return;
  if (doctorVoiceEnabled) {
    btn.className = 'btn btn-sm btn-voice-active';
    if (icon) icon.innerHTML = '&#128266;';
    if (lbl) lbl.textContent = 'Doctor Voice: ON';
  } else {
    btn.className = 'btn btn-sm btn-voice-muted';
    if (icon) icon.innerHTML = '&#128263;';
    if (lbl) lbl.textContent = 'Doctor Voice: MUTED';
  }
}

function setDoctorSpeakingVisual(isSpeaking) {
  const rings = document.querySelectorAll('.doc-avatar-ring, #doc-avatar-ring');
  rings.forEach(ring => {
    if (isSpeaking) ring.classList.add('doc-speaking');
    else ring.classList.remove('doc-speaking');
  });
}

function stripHtmlForSpeech(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const lis = tmp.querySelectorAll('li');
  lis.forEach(li => {
    li.textContent = '. ' + li.textContent;
  });
  let text = tmp.textContent || tmp.innerText || '';
  text = text.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();
  text = text.replace(/mSv\/h/gi, ' millisieverts per hour ');
  text = text.replace(/mSv/gi, ' millisieverts ');
  text = text.replace(/BPM/gi, ' beats per minute ');
  text = text.replace(/mmHg/gi, ' millimeters of mercury ');
  text = text.replace(/SpO2/gi, ' blood oxygen ');
  text = text.replace(/ONSD/gi, ' optic nerve sheath diameter ');
  text = text.replace(/ICP/gi, ' intracranial pressure ');
  text = text.replace(/LBNP/gi, ' lower body negative pressure ');
  text = text.replace(/ARED/gi, ' advanced resistive exercise ');
  text = text.replace(/CDR/gi, 'Commander');
  text = text.replace(/PLT/gi, 'Pilot');
  text = text.replace(/MS/gi, 'Mission Specialist');
  text = text.replace(/SO/gi, 'Science Officer');
  text = text.replace(/PS/gi, 'Payload Specialist');
  text = text.replace(/FMO/gi, 'Flight Medical Officer');
  text = text.replace(/(\d+)\/(\d+)/g, '$1 over $2');
  return text;
}

// ========================================================
// 2B. AUTONOMOUS HANDS-FREE VOICE & CLINICAL PRECAUTIONS ENGINE
// ========================================================
// doctorVoiceEnabled & currentUtterance declared in Section 2 above
let activeDoctorAdviceText = '';
let activeDoctorAdviceHtml = '';
let isHandsFreeListening = true;
let speechRecognizer = null;

function getFlightSurgeonFemaleVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Prioritize authentic female English flight surgeon voices
  const preferredFemale = voices.find(v => 
    v.lang.startsWith('en') && (
      v.name.toLowerCase().includes('female') ||
      v.name.toLowerCase().includes('zira') ||
      v.name.toLowerCase().includes('samantha') ||
      v.name.toLowerCase().includes('victoria') ||
      v.name.toLowerCase().includes('karen') ||
      v.name.toLowerCase().includes('moira') ||
      v.name.toLowerCase().includes('hazel') ||
      v.name.toLowerCase().includes('catherine') ||
      v.name.toLowerCase().includes('google uk english female') ||
      v.name.toLowerCase().includes('natural')
    )
  );

  return preferredFemale || voices.find(v => v.lang.startsWith('en')) || voices[0];
}

function updateHandsFreeStatus(statusText) {
  const el = document.getElementById('hfd-voice-status');
  if (el) el.textContent = statusText;
}

function showVoiceToast(msg) {
  const existing = document.querySelector('.voice-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'voice-toast';
  toast.innerHTML = `<span>&#127908;</span> <span>${escapeHtml(msg)}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function speakDoctor(textOrHtml, interrupt = true) {
  if (!doctorVoiceEnabled) return;
  if (!('speechSynthesis' in window)) return;

  const plainText = stripHtmlForSpeech(textOrHtml);
  if (!plainText) return;

  if (interrupt) {
    window.speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(plainText);
  currentUtterance = utterance;
  utterance.rate = 0.93; // Measured flight surgeon cadence
  utterance.pitch = 1.05; // Calm, authoritative female tone
  utterance.lang = 'en-US';

  const femaleVoice = getFlightSurgeonFemaleVoice();
  if (femaleVoice) utterance.voice = femaleVoice;

  utterance.onstart = () => {
    setDoctorSpeakingVisual(true);
    updateHandsFreeStatus('Dr. ASTRIS is speaking advice & precautions...');
  };
  utterance.onend = () => {
    setDoctorSpeakingVisual(false);
    updateHandsFreeStatus('Hands-Free Listening Active... Speak a command or use simulation pills');
  };
  utterance.onerror = (e) => {
    console.warn('Speech synthesis event:', e);
    setDoctorSpeakingVisual(false);
    updateHandsFreeStatus('Hands-Free Listening Active... Speak a command');
  };

  window.speechSynthesis.speak(utterance);
}

function stopDoctorSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    setDoctorSpeakingVisual(false);
    updateHandsFreeStatus('Doctor speech muted.');
  }
}

function toggleDoctorVoice() {
  doctorVoiceEnabled = !doctorVoiceEnabled;
  const label = document.getElementById('voice-label');
  const icon = document.getElementById('voice-icon');
  const btn = document.getElementById('btn-toggle-doctor-voice');

  if (doctorVoiceEnabled) {
    if (label) label.textContent = 'Doctor Voice: ON';
    if (icon) icon.innerHTML = '&#128266;';
    if (btn) btn.className = 'btn btn-sm btn-voice-active';
    speakDoctor(`Flight Surgeon Dr. ASTRIS voice active. All medical advice and precautions are delivered by voice and message.`);
  } else {
    stopDoctorSpeech();
    if (label) label.textContent = 'Doctor Voice: OFF';
    if (icon) icon.innerHTML = '&#128263;';
    if (btn) btn.className = 'btn btn-sm btn-outline';
  }
}

function toggleHandsFreeMic() {
  isHandsFreeListening = !isHandsFreeListening;
  const btn = document.getElementById('btn-toggle-handsfree-mic');
  if (isHandsFreeListening) {
    if (btn) btn.textContent = '🎙️ Voice Mic: ON';
    if (btn) btn.className = 'btn btn-sm btn-outline';
    initHandsFreeVoiceRecognition();
    showVoiceToast('Hands-Free Voice Recognition Activated');
    speakDoctor('Hands-free microphone listener online. Speak commands out loud.');
  } else {
    if (btn) btn.textContent = '🔇 Voice Mic: OFF';
    if (btn) btn.className = 'btn btn-sm btn-outline';
    if (speechRecognizer) {
      try { speechRecognizer.stop(); } catch (e) {}
    }
    updateHandsFreeStatus('Voice recognition paused. Use simulation pills.');
    showVoiceToast('Voice Mic Deactivated');
  }
}

function initHandsFreeVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn("Web Speech Recognition not supported in this browser.");
    updateHandsFreeStatus("Voice recognition not supported in browser. Use Hands-Free Simulation Pills below.");
    return;
  }

  try {
    if (speechRecognizer) {
      try { speechRecognizer.stop(); } catch (e) {}
    }

    speechRecognizer = new SpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = false;
    speechRecognizer.lang = 'en-US';

    speechRecognizer.onstart = () => {
      isHandsFreeListening = true;
      updateHandsFreeStatus("🎙️ LISTENING FOR VOICE DIRECTIVES (Zero-Touch Active)...");
    };

    speechRecognizer.onresult = (event) => {
      const lastIndex = event.results.length - 1;
      const transcript = event.results[lastIndex][0].transcript.trim().toLowerCase();
      console.log("Astronaut voice heard:", transcript);
      handleVoiceCommand(transcript);
    };

    speechRecognizer.onerror = (e) => {
      console.warn("Speech recognition error:", e);
      if (e.error === 'not-allowed') {
        updateHandsFreeStatus("Microphone permission denied. Use 1-Click Simulation Pills below.");
      }
    };

    speechRecognizer.onend = () => {
      if (isHandsFreeListening) {
        try { speechRecognizer.start(); } catch (err) {}
      }
    };

    speechRecognizer.start();
  } catch (err) {
    console.warn("Could not start speech recognition:", err);
  }
}

function handleVoiceCommand(cmd) {
  const c = cmd.toLowerCase();
  showVoiceToast(`Voice Recognized: "${cmd}"`);

  if (c.includes('repeat') || c.includes('again')) {
    repeatActiveDoctorPrecautions();
  } else if (c.includes('next') || c.includes('step')) {
    speakDoctor(`Next clinical precaution for ${currentAstro.name}: Verifying autoinjector drug uptake and monitoring cardiac output. Sabari and Surya are confirming your stabilization.`);
  } else if (c.includes('radiation') || c.includes('rad') || c.includes('storm')) {
    switchTab('tab-radiation');
    speakDoctor("Autonomous Hands-Free Navigation: Switching to Radiation Penetration console. Shielding status online.");
  } else if (c.includes('physiology') || c.includes('bone') || c.includes('body')) {
    switchTab('tab-physiology');
    speakDoctor("Autonomous Hands-Free Navigation: Switching to Physiology & Bone Fracture console.");
  } else if (c.includes('trajectory') || c.includes('abort') || c.includes('orbit') || c.includes('earth')) {
    switchTab('tab-trajectory');
    speakDoctor("Autonomous Hands-Free Navigation: Switching to Distance from Earth & Emergency Abort Trajectory console.");
  } else if (c.includes('guidance') || c.includes('protocol') || c.includes('emergency')) {
    switchTab('tab-guidance');
    speakDoctor("Autonomous Hands-Free Navigation: Switching to Emergency Guidance Clinical Protocols.");
  } else if (c.includes('resources') || c.includes('hub') || c.includes('paper') || c.includes('challenge')) {
    switchTab('tab-resources');
    speakDoctor("Autonomous Hands-Free Navigation: Switching to NASA Space Apps 2026 Challenge Hub.");
  } else if (c.includes('behavioral') || c.includes('sleep') || c.includes('mind') || c.includes('isolation')) {
    switchTab('tab-behavioral');
    speakDoctor("Autonomous Hands-Free Navigation: Switching to Behavioral & Deep Space Isolation console.");
  } else if (c.includes('doctor') || c.includes('recovery') || c.includes('clinic') || c.includes('astris') || c.includes('vitals') || c.includes('help')) {
    switchTab('tab-recovery');
    speakDoctor(`Dr. ASTRIS Flight Surgeon standing by on voice, ${currentAstro.name}. Resting heart rate is ${currentAstro.hr} BPM, blood oxygen is ${currentAstro.spo2}%, cumulative radiation is ${currentAstro.cumDose.toFixed(1)} mSv. I am watching over you continuously.`);
  } else if (c.includes('acknowledge') || c.includes('okay') || c.includes('copy')) {
    speakDoctor(`Acknowledged, ${currentAstro.name}. Patient vocal confirmation verified. Electronic Health Record updated with clinical response.`);
    updateSoapNote(`Patient acknowledged hands-free directives verbally.`, `Vocal response clear. Telemetry stabilizing.`);
  } else {
    speakDoctor(`Voice directive received: "${cmd}". Standing by for further hands-free instructions, ${currentAstro.name}.`);
  }
}
window.simulateVoiceCommand = handleVoiceCommand;

// ========================================================
// 2C. FLIGHT SURGEON PRECAUTIONS DISPATCH (VOICE + TEXT)
// ========================================================

function dispatchSpokenAdvice(key) {
  let docSpeech = '';
  let docHtml = '';
  const astro = currentAstro;

  if (key === 'critical_incapacitation') {
    docSpeech = `Emergency Medical Override. ${astro.name} is in critical physiological collapse. Your limbs are immobilized in microgravity and high-G deceleration, and you cannot touch console tabs. I am Dr. ASTRIS, your Chief Flight Surgeon. I have assumed remote control of your clinical countermeasures. Listen closely to my voice and follow these four emergency precautions: Precaution one: Recline immediately into seventy-five degree transverse posture. Lock couch harness to prevent axial spinal fracture under deceleration. Precaution two: Autonomous autoinjector primed. Administering sublingual Ondansetron eight milligrams and subcutaneous Teriparatide twenty micrograms now. Precaution three: Cabin oxygen partial pressure raised to twenty-eight kilopascals; storm shelter water walls locked to maximum density. Precaution four: Crew assistance dispatch: Pilot Sersan, hold spacecraft attitude. Radiation Physicist Surya, verify hull shielding. Flight Medical Officer Sabari, deploy bedside emergency trauma pack to station ${astro.name} immediately. Remain still. Houston and I have you in full clinical focus.`;

    docHtml = `
      <div class="emergency-advice-card">
        <div class="eac-header">
          <span class="badge-critical-pulse">&#128680; CRITICAL HANDS-FREE PROTOCOL ACTIVE</span>
          <span class="eac-tag font-mono">AUTONOMOUS FLIGHT SURGEON OVERRIDE</span>
        </div>
        <h3 class="eac-title">Emergency Medical Directive for ${astro.name} (${astro.role})</h3>
        <p class="eac-alert-text"><strong>Patient Incapacitation Notice:</strong> Astronaut is physically immobilized in anti-G couch. Limb motor control compromised. <em>Console touch input prohibited.</em> Dr. ASTRIS has seized remote telemetry control.</p>
        
        <div class="eac-vitals-strip font-mono">
          <span>HR: <strong class="highlight-red">${astro.hr} BPM</strong></span>
          <span>BP: <strong class="highlight-red">${astro.bp} mmHg</strong></span>
          <span>SpO2: <strong class="highlight-cyan">${astro.spo2}%</strong></span>
          <span>ONSD: <strong class="highlight-yellow">${astro.onsd} mm</strong></span>
          <span>DOSE: <strong class="highlight-orange">${astro.cumDose.toFixed(1)} mSv</strong></span>
        </div>

        <div class="eac-precautions-list">
          <div class="eac-precaution-item">
            <span class="ep-num">1</span>
            <div class="ep-desc">
              <strong>Mechanical Posture &amp; Spinal Lockdown:</strong>
              <p>Recline anti-G couch to 75° transverse (+Gx) orientation. Secure 5-point harness immediately to distribute compressive deceleration across rib cage and shield vulnerable L1-L5 lumbar vertebrae.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">2</span>
            <div class="ep-desc">
              <strong>Autonomous Pharmacological Autoinjection:</strong>
              <p>Autoinjector activated: <strong>Ondansetron 8mg ODT</strong> sublingual (blocks visceral vomiting reflex) + <strong>Teriparatide (PTH 1-34) 20mcg SQ</strong> (accelerates osteoblast remineralization).</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">3</span>
            <div class="ep-desc">
              <strong>Life Support &amp; Environmental Pressure Override:</strong>
              <p>Cabin pO2 increased from 21.3 to 28.0 kPa. Water-wall storm shelter secondary barriers sealed to 38 g/cm² to arrest solar proton flux.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">4</span>
            <div class="ep-desc">
              <strong>Crew Assistance Dispatch (Zero-Touch Crew Action):</strong>
              <p><strong>PLT Sersan:</strong> Maintain orbital attitude hold.<br>
              <strong>MS Surya:</strong> Monitor dosimeter threshold at storm shelter.<br>
              <strong>SO Siva:</strong> Monitor neuro-cognitive telemetry.<br>
              <strong>PS Vishal:</strong> Lock ECLSS scrubber pressure.<br>
              <strong>FMO Sabari:</strong> Report to ${astro.name}'s station with portable ultrasound and trauma pack immediately.</p>
            </div>
          </div>
        </div>
        <div class="eac-footer">
          <button type="button" class="btn btn-sm btn-outline" onclick="repeatActiveDoctorPrecautions()">&#128266; Repeat Audio Directives</button>
          <span class="eac-status font-mono">&#128483;&#65039; Dr. ASTRIS Audio Broadcasting</span>
        </div>
      </div>
    `;

    updateSoapNote(`CRITICAL PHYSIOLOGICAL COLLAPSE for ${astro.name}. Incapacitated in couch.`, `Autonomous Hands-Free Medical Intervention launched. Autoinjector Ondansetron 8mg + Teriparatide 20mcg. Crew mobilized.`);
  }
  else if (key === 'radiation_precautions') {
    docSpeech = `Doctor clinical precautions for radiation storm exposure, ${astro.name}: Precaution one: Ingress immediately to the central water wall storm shelter. Do not linger in outer modules. Precaution two: Dissolve one Ondansetron eight milligram tablet sublingually right now to stop acute radiation nausea. Ingest antioxidant cocktail: Vitamin E four hundred units and N-acetylcysteine six hundred milligrams. Precaution three: If cumulative dose rate exceeds ten millisieverts per hour, prepare Filgrastim three hundred micrograms subcutaneous at eighteen hundred hours to preserve your bone marrow leukocytes. Precaution four: Surya and Sabari have verified storm shelter shielding reduces proton penetration by ninety-nine point seven percent. Drink five hundred milliliters of chilled electrolyte water and remain shielded.`;

    docHtml = `
      <div class="emergency-advice-card radiation-card">
        <div class="eac-header">
          <span class="badge-accent">&#9762;&#65039; SOLAR RADIATION &amp; CME PROTOCOL</span>
          <span class="eac-tag font-mono">FLIGHT SURGEON PRECAUTIONS</span>
        </div>
        <h3 class="eac-title">Radiation Defense &amp; Countermeasures for ${astro.name}</h3>
        <div class="eac-precautions-list">
          <div class="eac-precaution-item">
            <span class="ep-num">1</span>
            <div class="ep-desc">
              <strong>Immediate Shelter Ingress:</strong>
              <p>Move inside the central water-wall storm shelter. 38 g/cm² hydrogenous mass attenuates solar proton flux by 99.7%.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">2</span>
            <div class="ep-desc">
              <strong>Antiemetic &amp; Radioprotectant Cocktail:</strong>
              <p>Take <strong>Ondansetron 8mg ODT</strong> sublingual immediately + <strong>Vitamin E (400 IU)</strong> + <strong>N-Acetylcysteine (600mg)</strong> to scavenge ionizing free radicals.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">3</span>
            <div class="ep-desc">
              <strong>Bone Marrow &amp; Hematopoietic Rescue:</strong>
              <p>If solar particle flux breaches 10 mSv/h, administer <strong>Filgrastim (G-CSF) 300mcg SQ</strong> at 18:00 MET to protect absolute neutrophil count.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">4</span>
            <div class="ep-desc">
              <strong>Hydration &amp; Dosimeter Verification:</strong>
              <p>Sip 500 mL electrolyte fluid loading. MS Surya and FMO Sabari are cross-checking active silicon dosimeter telemetry.</p>
            </div>
          </div>
        </div>
        <div class="eac-footer">
          <button type="button" class="btn btn-sm btn-outline" onclick="repeatActiveDoctorPrecautions()">&#128266; Repeat Audio Directives</button>
          <span class="eac-status font-mono">&#128483;&#65039; Dr. ASTRIS Audio Broadcasting</span>
        </div>
      </div>
    `;

    updateSoapNote(`Solar Particle Event / CME Radiation Precautions dispatched.`, `Administered Ondansetron 8mg ODT, Antioxidant cocktail, Filgrastim queued. Water shelter verified.`);
  }
  else if (key === 'bone_crush_precautions') {
    docSpeech = `Flight surgeon precautions for spinal bone crush and high-G deceleration, ${astro.name}: Precaution one: Recline seat to seventy-five degrees transverse orientation. Never sit upright or lean forward during engine burns. Precaution two: Microgravity has reduced your lumbar trabecular bone density by ${astro.bmdLoss} percent. Self-administer Teriparatide twenty micrograms subcutaneous to stimulate rapid osteoblast bone mineralization. Precaution three: Switch on seat paraspinal heating element to forty degrees Celsius to relieve muscular splinting. Precaution four: Pilot Sersan will maintain acceleration throttling below three Gs to protect your lumbar spine. Houston and I are tracking your spinal load sensor in real time.`;

    docHtml = `
      <div class="emergency-advice-card bone-card">
        <div class="eac-header">
          <span class="badge-accent">&#129460; BIOMECHANICS &amp; BONE PRECAUTIONS</span>
          <span class="eac-tag font-mono">FLIGHT SURGEON DIRECTIVE</span>
        </div>
        <h3 class="eac-title">Spinal Deconditioning &amp; Crush Prevention for ${astro.name}</h3>
        <div class="eac-precautions-list">
          <div class="eac-precaution-item">
            <span class="ep-num">1</span>
            <div class="ep-desc">
              <strong>Transverse Seating (+Gx):</strong>
              <p>Recline couch to 75°. Compressive G-forces are transferred through the sternum, reducing lumbar axial load by 74%.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">2</span>
            <div class="ep-desc">
              <strong>Osteoblast Deposition Therapy:</strong>
              <p>Administer <strong>Teriparatide (recombinant PTH 1-34) 20mcg SQ</strong> daily. Combined with 150min ARED resistive exercises to counter -${astro.bmdLoss}% bone mineral density loss.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">3</span>
            <div class="ep-desc">
              <strong>Paraspinal Thermal Therapy:</strong>
              <p>Activate couch heating pad at 40°C for 30 minutes to reduce erector spinae hypertonicity and reflex muscle guarding.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">4</span>
            <div class="ep-desc">
              <strong>G-Load Acceleration Limiting:</strong>
              <p>PLT Sersan notified to shape burn trajectory vectors with acceleration rates strictly limited under 2.8G.</p>
            </div>
          </div>
        </div>
        <div class="eac-footer">
          <button type="button" class="btn btn-sm btn-outline" onclick="repeatActiveDoctorPrecautions()">&#128266; Repeat Audio Directives</button>
          <span class="eac-status font-mono">&#128483;&#65039; Dr. ASTRIS Audio Broadcasting</span>
        </div>
      </div>
    `;

    updateSoapNote(`Biomechanics & Lumbar Deconditioning Precautions dispatched.`, `75° couch lockdown, Teriparatide 20mcg SQ, 40°C thermal pad, G-load capped at 2.8G.`);
  }
  else if (key === 'sans_precautions') {
    docSpeech = `Flight surgeon precautions for Spaceflight-Associated Neuro-ocular Syndrome, ${astro.name}: Your optic nerve sheath diameter is measured at ${astro.onsd} millimeters. Precaution one: Schedule a one-hundred-twenty-minute Lower Body Negative Pressure chamber session at minus twenty millimeters of mercury to pull cranial venous blood back to your legs. Precaution two: Take Acetazolamide two hundred fifty milligrams orally twice daily to decrease cerebrospinal fluid production. Precaution three: Wear venous thigh choke cuffs set to thirty-five millimeters of mercury during sleep. Precaution four: Dial your adjustable fluid eyeglasses to plus zero point five zero Diopters to correct hyperopic globe flattening. Siva and I are monitoring your visual field.`;

    docHtml = `
      <div class="emergency-advice-card sans-card">
        <div class="eac-header">
          <span class="badge-accent">&#128065;&#65039; NEURO-OCULAR &amp; SANS PROTOCOL</span>
          <span class="eac-tag font-mono">FLIGHT SURGEON DIRECTIVE</span>
        </div>
        <h3 class="eac-title">Optic Nerve &amp; Intracranial Decompression for ${astro.name}</h3>
        <div class="eac-precautions-list">
          <div class="eac-precaution-item">
            <span class="ep-num">1</span>
            <div class="ep-desc">
              <strong>Lower Body Negative Pressure (LBNP):</strong>
              <p>120-minute chamber ingress at <strong>-20 mmHg</strong> to relocate 1.5L cephalad venous blood into lower extremities.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">2</span>
            <div class="ep-desc">
              <strong>Cerebrospinal Fluid Suppression:</strong>
              <p>Ingest <strong>Acetazolamide 250mg PO BID</strong> (carbonic anhydrase inhibitor) to suppress choroid plexus CSF secretion.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">3</span>
            <div class="ep-desc">
              <strong>Venous Occlusion Thigh Cuffs:</strong>
              <p>Apply calibrated thigh cuffs at 35 mmHg during sleep periods to prevent nocturnal cephalic blood pooling.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">4</span>
            <div class="ep-desc">
              <strong>Variable-Focus Corrective Optics:</strong>
              <p>Dial adjustable fluid eyeglass membranes to +0.50 D to eliminate globe-flattening hyperopic blurring.</p>
            </div>
          </div>
        </div>
        <div class="eac-footer">
          <button type="button" class="btn btn-sm btn-outline" onclick="repeatActiveDoctorPrecautions()">&#128266; Repeat Audio Directives</button>
          <span class="eac-status font-mono">&#128483;&#65039; Dr. ASTRIS Audio Broadcasting</span>
        </div>
      </div>
    `;

    updateSoapNote(`SANS & Optic Sheath Congestion Precautions dispatched.`, `120min LBNP at -20mmHg, Acetazolamide 250mg BID, thigh cuffs 35mmHg, +0.50D optics.`);
  }
  else if (key === 'hypoxia_precautions') {
    docSpeech = `Emergency clinical precautions for hypoxia and cabin pressure loss, ${astro.name}: Precaution one: Don positive-pressure one hundred percent oxygen masks immediately. Precaution two: Automated micro-valves have isolated the breach. Do not exert yourself. Precaution three: Take Dexamethasone eight milligrams to prevent high-altitude cerebral edema. Precaution four: Payload Specialist Vishal is verifying atmospheric scrubbers and Nitrogen bleed pressure. Sabari is standing by with emergency hyperbaric bag.`;

    docHtml = `
      <div class="emergency-advice-card hypoxia-card">
        <div class="eac-header">
          <span class="badge-critical-pulse">&#128168; HYPOXIA &amp; PRESSURE LOSS PROTOCOL</span>
          <span class="eac-tag font-mono">FLIGHT SURGEON DIRECTIVE</span>
        </div>
        <h3 class="eac-title">Cabin Pressure Emergency for ${astro.name}</h3>
        <div class="eac-precautions-list">
          <div class="eac-precaution-item">
            <span class="ep-num">1</span>
            <div class="ep-desc">
              <strong>Emergency 100% O2 Mask:</strong>
              <p>Don positive-pressure mask immediately at 40 kPa pressure. Minimize physical exertion to conserve oxygen.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">2</span>
            <div class="ep-desc">
              <strong>Compartment Isolation:</strong>
              <p>Autonomous hatch valves closed. Habitat volume isolated to stop atmospheric bleed.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">3</span>
            <div class="ep-desc">
              <strong>Neuro-Protective Pharmacology:</strong>
              <p>Administer <strong>Dexamethasone 8mg IV/IM</strong> to protect cerebral capillary integrity and prevent HACE.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">4</span>
            <div class="ep-desc">
              <strong>ECLSS Scrubber Balancing:</strong>
              <p>PS Vishal locking CO2 scrubbers; FMO Sabari prepping portable hyperbaric recovery bag.</p>
            </div>
          </div>
        </div>
        <div class="eac-footer">
          <button type="button" class="btn btn-sm btn-outline" onclick="repeatActiveDoctorPrecautions()">&#128266; Repeat Audio Directives</button>
          <span class="eac-status font-mono">&#128483;&#65039; Dr. ASTRIS Audio Broadcasting</span>
        </div>
      </div>
    `;

    updateSoapNote(`Hypoxia / Cabin Depressurization Precautions dispatched.`, `100% O2 mask donned, Dexamethasone 8mg, compartment isolated, ECLSS secured.`);
  }
  else if (key === 'isolation_precautions') {
    docSpeech = `Flight surgeon psychological precautions for deep space isolation, ${astro.name}: Looking out at Earth as a tiny pale blue dot creates profound disorientation. Precaution one: Activate your twenty-minute Biophilic Virtual Reality nature immersion right now. Listen to the rainforest acoustic pink noise. Precaution two: Practice four-four-four-four box breathing to activate your parasympathetic vagus nerve and slow your heart rate. Precaution three: I have loaded your family's unread audio message in the communication queue. Precaution four: Gather tonight for communal mess hall dinner with all five crewmates: Sersan, Surya, Siva, Vishal, and Sabari. You are an extraordinary, unified team.`;

    docHtml = `
      <div class="emergency-advice-card isolation-card">
        <div class="eac-header">
          <span class="badge-accent">&#129496; BEHAVIORAL HEALTH &amp; ISOLATION</span>
          <span class="eac-tag font-mono">FLIGHT SURGEON DIRECTIVE</span>
        </div>
        <h3 class="eac-title">Psychological Grounding &amp; Resilience for ${astro.name}</h3>
        <div class="eac-precautions-list">
          <div class="eac-precaution-item">
            <span class="ep-num">1</span>
            <div class="ep-desc">
              <strong>Biophilic VR Grounding:</strong>
              <p>Don VR headset for 20-minute Pacific Rainforest simulation with 480Hz acoustic pink noise to restore sensory grounding.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">2</span>
            <div class="ep-desc">
              <strong>Autonomic Box Breathing:</strong>
              <p>Follow visual pacer: 4s inhale, 4s hold, 4s exhale, 4s hold. Lowers sympathetic tone and cortisol within 3 minutes.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">3</span>
            <div class="ep-desc">
              <strong>Earth Voice Buffer Downlink:</strong>
              <p>Play queued audio letters from family scheduled during evening relaxation window.</p>
            </div>
          </div>
          <div class="eac-precaution-item">
            <span class="ep-num">4</span>
            <div class="ep-desc">
              <strong>Crew Solidarity &amp; Communal Dining:</strong>
              <p>Shared mess hall meal scheduled with Sersan, Surya, Siva, Vishal, and Sabari. High interpersonal cohesion maintained.</p>
            </div>
          </div>
        </div>
        <div class="eac-footer">
          <button type="button" class="btn btn-sm btn-outline" onclick="repeatActiveDoctorPrecautions()">&#128266; Repeat Audio Directives</button>
          <span class="eac-status font-mono">&#128483;&#65039; Dr. ASTRIS Audio Broadcasting</span>
        </div>
      </div>
    `;

    updateSoapNote(`Behavioral Health & Earth-Out-Of-View Isolation Precautions dispatched.`, `Biophilic VR immersion, box breathing, family audio buffer, communal crew dining.`);
  }

  activeDoctorAdviceText = docSpeech;
  activeDoctorAdviceHtml = docHtml;

  // Append formatted message to chat
  appendDoctorMessage(docHtml, false);

  // Speak through female voice
  speakDoctor(docSpeech);

  // Show hands-free directive HUD
  const hfd = document.getElementById('handsfree-directive-hud');
  if (hfd) hfd.classList.remove('hidden');
}
window.dispatchSpokenAdvice = dispatchSpokenAdvice;

function repeatActiveDoctorPrecautions() {
  if (activeDoctorAdviceText) {
    speakDoctor(activeDoctorAdviceText);
  } else {
    speakDoctor(`Chief Flight Surgeon Dr. ASTRIS standing by on voice for ${currentAstro.name}. Resting heart rate is ${currentAstro.hr} BPM, blood oxygen is ${currentAstro.spo2} percent. Select any precaution dispatch to hear full audio directives.`);
  }
}
window.repeatActiveDoctorPrecautions = repeatActiveDoctorPrecautions;

function triggerCriticalEmergencyHandsFree(targetId) {
  let astro = currentAstro;
  if (targetId) {
    const found = CREW_DATA.find(a => a.id === targetId);
    if (found) {
      currentAstro = found;
  window.currentAstro = currentAstro;
      window.currentAstro = currentAstro;
      astro = found;
    }
  }

  astro.status = 'CRITICAL';
  astro.hr = 138;
  astro.bp = '154/98';
  astro.map = 116;
  astro.spo2 = 91.2;
  astro.icp = 23.4;
  astro.onsd = 6.2;

  // 1. Autonomous screen switch without touching tabs!
  switchTab('tab-recovery');

  // 2. Show emergency banner with hands-free tag
  const banner = document.getElementById('emergency-banner');
  if (banner) {
    banner.classList.remove('hidden');
    const titleEl = document.getElementById('emergency-title');
    const descEl = document.getElementById('emergency-desc');
    if (titleEl) titleEl.textContent = `CRITICAL EMERGENCY: ${astro.name.toUpperCase()} INCAPACITATED`;
    if (descEl) descEl.textContent = `Acute high-G spinal compression and SANS intracranial spike detected! Scientist immobilized in anti-G couch. Manual console touch impossible. Autonomous Hands-Free Medical Intervention activated.`;
  }

  // 3. Show hands-free HUD in Doctor clinic
  const hfd = document.getElementById('handsfree-directive-hud');
  if (hfd) hfd.classList.remove('hidden');

  // 4. Update crew rosters and vitals
  renderCrewRoster();
  renderAllCrewMatrix();
  updateVitalsDisplay();
  updateEhrDisplays();

  // 5. Dispatch spoken advice & formatted message
  dispatchSpokenAdvice('critical_incapacitation');

  // 6. Initialize hands-free voice recognition if not started
  if (!speechRecognizer) {
    initHandsFreeVoiceRecognition();
  }

  logEvent('CRITICAL', `AUTONOMOUS HANDS-FREE OVERRIDE: ${astro.name} incapacitated in anti-G couch. Voice & message precautions active.`);
}
window.triggerCriticalEmergencyHandsFree = triggerCriticalEmergencyHandsFree;
window.toggleHandsFreeMic = toggleHandsFreeMic;


// ========================================================
// 3. DOCTOR CLINICAL ROUNDS, EHR & CONFIDENCE ENGINE
// ========================================================

function bindDoctorClinic() {
  const handsFreeMicBtn = document.getElementById('btn-toggle-handsfree-mic');
  if (handsFreeMicBtn) {
    handsFreeMicBtn.addEventListener('click', toggleHandsFreeMic);
  }
  const sendBtn = document.getElementById('btn-send-patient-msg');
  const inputEl = document.getElementById('chat-patient-input');
  const chipBtns = document.querySelectorAll('.btn-symptom-chip');
  const consultTopBtn = document.getElementById('btn-open-doctor-consult');
  const exportEhrBtn = document.getElementById('btn-export-ehr');
  const breathingBtn = document.getElementById('btn-toggle-breathing');
  const voiceToggleBtn = document.getElementById('btn-toggle-doctor-voice');
  const stopSpeechBtn = document.getElementById('btn-stop-doctor-speech');

  if (sendBtn && inputEl) {
    sendBtn.addEventListener('click', () => {
      const text = inputEl.value.trim();
      if (text) {
        handlePatientMessage(text);
        inputEl.value = '';
      }
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendBtn.click();
      }
    });
  }

  chipBtns.forEach(chip => {
    chip.addEventListener('click', () => {
      const symptomKey = chip.getAttribute('data-symptom');
      handleSymptomChipClick(symptomKey);
    });
  });

  if (consultTopBtn) {
    consultTopBtn.addEventListener('click', () => {
      switchTab('tab-recovery');
      appendDoctorMessage(`Dr. ASTRIS standing by on clinical audio, ${currentAstro.name}. I am reviewing your live vitals. What is your primary operational or medical concern right now?`);
    });
  }

  if (voiceToggleBtn) {
    voiceToggleBtn.addEventListener('click', toggleDoctorVoice);
  }

  if (stopSpeechBtn) {
    stopSpeechBtn.addEventListener('click', stopDoctorSpeech);
  }

  if (exportEhrBtn) {
    exportEhrBtn.addEventListener('click', exportEhrSummary);
  }

  if (breathingBtn) {
    breathingBtn.addEventListener('click', toggleGuidedBreathing);
  }

  bindMedicationCheckboxes();
  updateEhrDisplays();
  initDoctorSpeech();
}

function handlePatientMessage(userText) {
  appendPatientMessage(userText);
  synth.playChime(true);

  // Generate Doctor's clinical response
  setTimeout(() => {
    const docReply = generateClinicalDoctorResponse(userText);
    appendDoctorMessage(docReply);
    synth.playChime(true);
  }, 600);
}

function appendPatientMessage(text) {
  const feed = document.getElementById('doctor-chat-feed');
  if (!feed) return;

  const now = new Date();
  const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}]`;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message patient-msg';
  msgDiv.innerHTML = `
    <div class="cm-avatar">${currentAstro.initials}</div>
    <div class="cm-body">
      <div class="cm-sender">${currentAstro.name} <span class="cm-time font-mono">${timeStr}</span></div>
      <div class="cm-text">${escapeHtml(text)}</div>
    </div>
  `;
  feed.appendChild(msgDiv);
  feed.scrollTop = feed.scrollHeight;
}

function appendDoctorMessage(htmlContent, shouldSpeak = true) {
  const feed = document.getElementById('doctor-chat-feed');
  if (!feed) return;

  const now = new Date();
  const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}]`;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message doc-msg';
  msgDiv.innerHTML = `
    <div class="cm-avatar">&#128104;&#8205;&#9877;&#65039;</div>
    <div class="cm-body">
      <div class="cm-sender">Dr. ASTRIS, MD <span class="cm-time font-mono">[Flight Surgeon] ${timeStr}</span></div>
      <div class="cm-text">${htmlContent}</div>
    </div>
  `;
  feed.appendChild(msgDiv);
  feed.scrollTop = feed.scrollHeight;

  if (shouldSpeak) {
    speakDoctor(htmlContent);
  }
}

function handleSymptomChipClick(symptomKey) {
  let patientTxt = '';
  let docTxt = '';

  if (symptomKey === 'doctor_confidence') {
    patientTxt = "Doctor, give me a confidence check. We are millions of kilometers from Earth in deep space. I need clinical reassurance for myself and our crew.";
    docTxt = `
      <p><strong>${currentAstro.name}, listen closely to my voice: You are extraordinarily capable, highly trained, and fully prepared for this mission.</strong></p>
      <p>Every single biometric channel on my flight surgeon console indicates that you and your crew — <strong>Sersan, Surya, Siva, Vishal, and Sabari</strong> — are in exceptional operational health. Here is why you can proceed with total confidence:</p>
      <ul>
        <li><strong>Physiological Reserve:</strong> Your cardiovascular tone is rock solid at ${currentAstro.hr} BPM with oxygen saturation at ${currentAstro.spo2}%. Your heart and lungs are adapting with remarkable biological resilience.</li>
        <li><strong>Spacecraft Shielding & Safety:</strong> Our central storm shelter and secondary water walls attenuate solar proton flux by 99.7%. Surya is monitoring dosimeters and Sabari has the medical pharmacy fully secured.</li>
        <li><strong>Autonomous Flight Medicine:</strong> Even when light-speed comms delay Houston by minutes or hours, ASTRIS-Bio provides instant, 24/7 flight surgeon diagnosis, prescriptive countermeasures, and automated clinical guidance.</li>
        <li><strong>Crew Synergy:</strong> Sersan has orbital guidance locked, Siva is guarding neuro-cognitive focus, Vishal maintains environmental life support, and Sabari is keeping your biochemistry optimized. You are not alone. You are an elite, cohesive team.</li>
      </ul>
      <p>Take one deep breath. Stand tall in your mission role. We have your back on every kilometer of this voyage. You are going to accomplish this mission successfully.</p>
    `;
    updateSoapNote(`Psychological grounding & confidence consultation for ${currentAstro.name}.`, `Delivered flight surgeon reassurance, crew solidarity protocol, and cognitive resilience validation.`);
  }
  else if (symptomKey === 'vitals_safety') {
    patientTxt = "Doctor, please verify my complete vitals panel and confirm my safety margin.";
    docTxt = `
      <p><strong>Comprehensive Telemetry Clearance for ${currentAstro.name}:</strong></p>
      <ul>
        <li><strong>Cardiovascular:</strong> Heart rate is ${currentAstro.hr} BPM (nominal range), Blood Pressure is ${currentAstro.bp} mmHg (Mean Arterial Pressure: ${currentAstro.map} mmHg). Cardiac output and systemic perfusion are pristine.</li>
        <li><strong>Oxygenation & Respiratory:</strong> Blood oxygen is ${currentAstro.spo2}% with respiratory rate at ${currentAstro.resp} breaths/min. Cabin oxygen partial pressure is nominal at 21.3 kPa.</li>
        <li><strong>Neuro-Ocular (SANS):</strong> Intracranial Pressure is ${currentAstro.icp} mmHg, ONSD is ${currentAstro.onsd} mm. Well below clinical threshold.</li>
        <li><strong>Radiation Dosimetry:</strong> Cumulative mission dose is ${currentAstro.cumDose.toFixed(1)} mSv. That is only ${((currentAstro.cumDose / 250) * 100).toFixed(1)}% of your permissible exposure limit.</li>
      </ul>
      <p><strong>Clinical Verdict:</strong> You are fully cleared and in optimal physical readiness. Continue your daily regimen with total peace of mind.</p>
    `;
    updateSoapNote(`Comprehensive vitals and safety audit for ${currentAstro.name}.`, `All primary biometrics within nominal flight envelope. Cleared for flight deck duty.`);
  }
  else if (symptomKey === 'crew_morale') {
    patientTxt = "Doctor, how is our full 6-scientist crew doing overall? I want a crew morale and readiness boost.";
    docTxt = `
      <p><strong>Full Crew Health Assessment from Flight Surgeon Console:</strong></p>
      <p>Commander, your crew is functioning at peak operational cohesion. Here is the status across all 6 stations:</p>
      <ul>
        <li><strong>CDR Srikanth:</strong> Astrobiology lead and command telemetry nominal. Leading by example with flawless biological discipline.</li>
        <li><strong>PLT Sersan:</strong> Flight engineering systems nominal. Pilot reaction times in PVT testing are sharp at 220 ms.</li>
        <li><strong>MS Surya:</strong> Radiation physicist station alert. Managing storm shelter protocol with high diligence.</li>
        <li><strong>SO Siva:</strong> Neuro-physiology telemetry prime. Cognitive load scores remain well within green parameters.</li>
        <li><strong>PS Vishal:</strong> Aerospace systems payload operations nominal. Environmental life support balance at 100%.</li>
        <li><strong>FMO Sabari:</strong> Flight medical officer inventories secured. Bio-technological diagnostic packs ready for any scenario.</li>
      </ul>
      <p>Interpersonal crew cohesion is measured at <strong>92% (Optimal)</strong>. You have built an extraordinary team of scientists. Keep up the high morale and mutual trust!</p>
    `;
    updateSoapNote(`Crew cohesion and morale audit conducted.`, `All 6 scientist stations operating nominally. Interpersonal cohesion 92%. Morale high.`);
  }
  else if (symptomKey === 'spine_crush') {
    patientTxt = "Doctor, I'm experiencing lower back pain and spinal stiffness after the deceleration maneuver. It feels like my lumbar vertebrae are compressed.";
    docTxt = `
      <p><strong>${currentAstro.name}, stay calm and remain seated in your anti-G couch.</strong> I am looking at your biomechanical telemetry now.</p>
      <p>Because microgravity has reduced your lumbar bone mineral density by <strong>-${currentAstro.bmdLoss}%</strong>, high-G deceleration placed substantial compressive axial force on your L1-L5 lumbar vertebrae. Here is our immediate recovery action plan:</p>
      <ul>
        <li><strong>Immobilize Axial Spine:</strong> Lock your 5-point harness in the 75° transverse (+Gx) position. Avoid any forward spinal flexion or twisting.</li>
        <li><strong>Analgesia & Bone Remineralization:</strong> I have authorized <strong>Teriparatide 20mcg SubQ</strong> to stimulate osteoblast bone deposition, along with acetaminophen for analgesia.</li>
        <li><strong>Thermal Pad Activation:</strong> Turn on seat lumbar heating element to 40°C to relieve paraspinal muscular splinting.</li>
      </ul>
      <p>I have updated your Electronic Health Record. Take slow breaths and let the heating pad work.</p>
    `;
    updateSoapNote('Acute lumbar compressive strain post-deceleration.', 'Prescribed Teriparatide 20mcg SQ, 75° couch lockdown, and paraspinal heat therapy.');
  } 
  else if (symptomKey === 'rad_nausea') {
    patientTxt = "Doctor, I feel nauseated and fatigued after the heliospheric solar radiation surge.";
    docTxt = `
      <p><strong>You are safe inside the central water wall storm shelter right now, ${currentAstro.name}.</strong> The 38 g/cm² shielding has already cut incoming proton flux by 99.7%.</p>
      <p>Your nausea is a classic prodromal Acute Radiation Syndrome (ARS) response to free radical oxidative stress in your visceral endothelial cells. Let's treat this aggressively:</p>
      <ul>
        <li><strong>Antiemetic Relief:</strong> Dissolve one <strong>Ondansetron 8mg ODT</strong> tablet sublingually immediately. Nausea will resolve within 15 minutes.</li>
        <li><strong>Cellular Rescue:</strong> Self-administer the <strong>Radioprotectant Cocktail</strong> (Vitamin E 400 IU + NAC 600mg + Vitamin C 1000mg).</li>
        <li><strong>Bone Marrow Prophylaxis:</strong> If dose rate breached 10 mSv/h, we will administer <strong>Filgrastim (G-CSF) 300mcg SQ</strong> at 18:00 MET to protect your white blood cell count.</li>
      </ul>
      <p>Drink 500 mL of chilled electrolyte water and rest. Surya and Sabari have verified your dosimeter readings are safe.</p>
    `;
    updateSoapNote('Prodromal ARS nausea secondary to CME proton surge.', 'Administered Ondansetron 8mg ODT, antioxidant cocktail, and hydration.');
  }
  else if (symptomKey === 'sans_headache') {
    patientTxt = "Doctor, I have a dull retro-orbital headache behind my eyes, and my close-up display reading is getting blurry.";
    docTxt = `
      <p><strong>I see this clearly on your bio-sensors, ${currentAstro.name}.</strong> Your Optic Nerve Sheath Diameter is measured at <strong>${currentAstro.onsd} mm</strong>, and your estimated intracranial pressure is elevated at <strong>${currentAstro.icp} mmHg</strong>.</p>
      <p>This is SANS (Spaceflight-Associated Neuro-ocular Syndrome) caused by headward fluid shift engorging your optic nerve sheath. Here is your medical recovery protocol:</p>
      <ul>
        <li><strong>LBNP Decompression Session:</strong> Ingress the Lower Body Negative Pressure chamber set to <strong>-20 mmHg for 120 minutes</strong> to draw 1.5L of cranial fluid back down to your legs.</li>
        <li><strong>Venous Thigh Cuffs:</strong> Don thigh choke cuffs set to 35 mmHg during your upcoming sleep cycle.</li>
        <li><strong>Pharmacology:</strong> Take <strong>Acetazolamide (Diamox) 250mg PO BID</strong> to reduce cerebrospinal fluid secretion.</li>
        <li><strong>Corrective Optics:</strong> Dial your adjustable fluid eyeglasses to <strong>+0.50 Diopters</strong> for mission console reading.</li>
      </ul>
    `;
    updateSoapNote('Acute SANS exacerbation with optic nerve sheath enlargement.', 'Ordered 120-min LBNP session at -20 mmHg, Acetazolamide 250mg BID, and thigh cuffs.');
  }
  else if (symptomKey === 'isolation_anxiety') {
    patientTxt = "Doctor, looking out the cupola at Earth reduced to a tiny pale blue dot makes me feel intensely isolated. I'm feeling disconnected from home.";
    docTxt = `
      <p><strong>${currentAstro.name}, what you are feeling is completely natural and deeply human.</strong> In aerospace psychology, this is known as the <em>'Earth-Out-Of-View' phenomenon</em>. Every explorer who has traveled 56 million kilometers into the void experiences this shock.</p>
      <p>You are not alone out here. Your crew — Sersan, Surya, Siva, Vishal, and Sabari — is with you, and our medical team at Houston is with you on every heartbeat of this downlink. Let's do a reset right now:</p>
      <ul>
        <li><strong>Biophilic Nature Immersion:</strong> Don your VR headset and start the <strong>20-minute Pacific Rainforest simulation</strong> with 480Hz acoustic pink noise. It will restore familiar sensory biophilic grounding.</li>
        <li><strong>Box Breathing Recovery:</strong> Click the <strong>'Start Paced Breathing'</strong> coach below and follow the 4-4-4-4 visual pacer to restore parasympathetic tone.</li>
        <li><strong>Family Voice Buffer:</strong> I have cued an unread audio message from your family in the communications queue for your evening meal.</li>
      </ul>
      <p>Take three deep breaths with me right now. You are doing a magnificent job leading this mission.</p>
    `;
    updateSoapNote('Acute confinement strain & Earth-Out-Of-View emotional detachment.', 'Prescribed Biophilic VR immersion, box breathing coach, and asynchronous family comms buffer.');
  }
  else if (symptomKey === 'nominal_check') {
    patientTxt = "Doctor, I'm feeling nominal today. Can you run my daily medical rounds review and recovery plan?";
    docTxt = `
      <p><strong>Affirmative, ${currentAstro.name}.</strong> Here is your Day 42 Flight Surgeon Morning Rounds Summary:</p>
      <ul>
        <li><strong>Vitals Status:</strong> Blood pressure ${currentAstro.bp} mmHg (MAP ${currentAstro.map} mmHg), resting HR ${currentAstro.hr} BPM, SpO2 ${currentAstro.spo2}%. Euvolemic and normothermic.</li>
        <li><strong>Musculoskeletal:</strong> Lumbar retention 98.2%. Complete your scheduled 150-minute ARED session (focus on axial heel raises and deadlifts).</li>
        <li><strong>Radiation Budget:</strong> Cumulative dose is ${currentAstro.cumDose.toFixed(1)} mSv (14% of career PEL limit). Well within safety margins.</li>
        <li><strong>Recovery Medication:</strong> Teriparatide 20mcg SQ and Vitamin D3 verified taken. Drink your afternoon electrolyte rehydration pack at 14:00 MET.</li>
      </ul>
      <p>You are fully cleared for nominal duty and critical flight console operations.</p>
    `;
    updateSoapNote('Routine flight surgeon medical rounds: Patient nominal.', 'Cleared for mission duty. Continue ARED 150-min exercise and oral electrolyte hydration.');
  }

  appendPatientMessage(patientTxt);
  synth.playChime(true);
  setTimeout(() => {
    appendDoctorMessage(docTxt);
    synth.playChime(true);
  }, 600);
}

function generateClinicalDoctorResponse(input) {
  const lower = input.toLowerCase();

  if (lower.includes('confidence') || lower.includes('afraid') || lower.includes('scared') || lower.includes('fear') || lower.includes('courage') || lower.includes('believe') || lower.includes('morale') || lower.includes('boost')) {
    updateSoapNote('Patient consultation: Confidence & Psychological Grounding Request.', 'Provided flight surgeon affirmation, resilience protocols, and crew cohesion reinforcement.');
    return `
      <p><strong>${currentAstro.name}, have complete faith in yourself, your crew, and this spacecraft.</strong></p>
      <p>You and your fellow scientists — <strong>Sersan, Surya, Siva, Vishal, and Sabari</strong> — represent the very pinnacle of human ingenuity and spaceflight training. Your physiological reserve is robust (Resting HR: ${currentAstro.hr} BPM, SpO2: ${currentAstro.spo2}%), your ship systems are in prime nominal health, and I am watching over you 24 hours a day.</p>
      <p>Take pride in the extraordinary mission you are undertaking for humanity. Breathe steadily, trust your training, and move forward with unwavering confidence. You are fully capable and protected.</p>
    `;
  } else if (lower.includes('back') || lower.includes('spine') || lower.includes('bone') || lower.includes('crush') || lower.includes('fracture')) {
    updateSoapNote('Patient query: Spinal / lumbar compression concern.', 'Advised anti-G couch transverse posture, Teriparatide, and paraspinal heat therapy.');
    return `
      <p><strong>Regarding your spinal concern, ${currentAstro.name}:</strong> In microgravity, loss of hydrostatic loading thins trabecular bone by ~1.5%/month, making vertebrae vulnerable to acute compressive crushing under acceleration.</p>
      <p><strong>Clinical Plan:</strong> Recline to 75° transverse (+Gx) seating immediately. I have verified your prescription for Teriparatide 20mcg SQ to accelerate osteoblast bone remineralization. Avoid spinal flexion and report any radiating numbness in your legs.</p>
    `;
  } else if (lower.includes('nausea') || lower.includes('radiation') || lower.includes('vomit') || lower.includes('sick')) {
    updateSoapNote('Patient query: Nausea / radiation symptoms.', 'Ordered sublingual Ondansetron 8mg ODT and hydration.');
    return `
      <p><strong>For acute nausea and radiation exposure, ${currentAstro.name}:</strong> Take Ondansetron 8mg ODT sublingually right now. It directly blocks 5-HT3 visceral serotonin receptors and stops vomiting within minutes.</p>
      <p>Ensure you are inside the water-wall storm shelter. Sip 500 mL of isotonic electrolyte water and ingest the oral antioxidant cocktail (Vitamin E + NAC). Surya and Sabari have confirmed the shielding integrity.</p>
    `;
  } else if (lower.includes('headache') || lower.includes('eye') || lower.includes('vision') || lower.includes('blur') || lower.includes('sans')) {
    updateSoapNote('Patient query: SANS visual distortion / retro-orbital headache.', 'Initiated LBNP session and Acetazolamide 250mg BID.');
    return `
      <p><strong>Evaluating your visual symptoms, ${currentAstro.name}:</strong> Cephalic fluid shift is elevating your optic nerve sheath diameter (currently ${currentAstro.onsd} mm). This causes globe flattening and hyperopic blurring.</p>
      <p><strong>Clinical Plan:</strong> Begin your scheduled 120-minute Lower Body Negative Pressure (LBNP) session at -20 mmHg to draw cranial fluid caudal. I have ordered Acetazolamide 250mg PO BID to decrease CSF production.</p>
    `;
  } else if (lower.includes('lonely') || lower.includes('anxious') || lower.includes('anxiety') || lower.includes('isolate') || lower.includes('earth') || lower.includes('depress')) {
    updateSoapNote('Patient query: Deep space isolation & emotional fatigue.', 'Prescribed VR biophilic nature immersion and box breathing.');
    return `
      <p><strong>I hear you, ${currentAstro.name}.</strong> The isolation of deep space is the greatest psychological challenge humanity has ever faced. Looking back at Earth as a pale blue dot is deeply humbling and destabilizing.</p>
      <p><strong>Recovery Step:</strong> Activate your 20-minute Biophilic VR Nature Immersion (Pacific rainforest with gentle rain sounds). Click the Guided Breathing Coach below and take 3 minutes of paced vagal breaths. Your crew (Sersan, Surya, Siva, Vishal, Sabari) and I are right here with you.</p>
    `;
  } else {
    updateSoapNote(`Patient consultation: "${input.substring(0, 40)}..."`, 'Reviewed clinical telemetry. Formulated personalized spaceflight recovery recommendations.');
    return `
      <p><strong>Flight Surgeon Assessment for ${currentAstro.name}:</strong> I have reviewed your live telemetry in relation to your concern: Heart rate is ${currentAstro.hr} BPM, blood pressure is ${currentAstro.bp} mmHg, SpO2 is ${currentAstro.spo2}%, and cumulative radiation is ${currentAstro.cumDose.toFixed(1)} mSv.</p>
      <p>Your physiological baseline remains resilient and strong. Ensure strict compliance with your daily 150-minute ARED workout, maintain your 2.5L electrolyte fluid loading, and reach out to me immediately if acute symptoms escalate. You have full clinical clearance and my absolute support.</p>
    `;
  }
}


function updateSoapNote(assessmentAddition, planAddition) {
  const soapS = document.getElementById('soap-S');
  const soapO = document.getElementById('soap-O');
  const soapA = document.getElementById('soap-A');
  const soapP = document.getElementById('soap-P');

  if (soapS) soapS.textContent = `Patient encountered Dr. ASTRIS. Active mission conditions reviewed for ${currentAstro.name}.`;
  if (soapO) soapO.textContent = `BP ${currentAstro.bp}, HR ${currentAstro.hr} bpm, SpO2 ${currentAstro.spo2}%, ONSD ${currentAstro.onsd}mm, Radiation ${currentAstro.cumDose.toFixed(1)} mSv.`;
  if (soapA) soapA.textContent = assessmentAddition || `Cardiovascular tone stable. SANS low-moderate. Bone deconditioning ongoing (-${currentAstro.bmdLoss}%).`;
  if (soapP) soapP.textContent = planAddition || `150min ARED, 2.5L hydration, LBNP 20mmHg x2h, Teriparatide + Vitamin D3.`;

  const soapEl = document.getElementById('soap-content');
  if (soapEl) {
    soapEl.textContent = `[S] Active mission conditions.\n[O] BP ${currentAstro.bp}, HR ${currentAstro.hr}\n[A] ${assessmentAddition}\n[P] ${planAddition}`;
  }
}

function updateEhrDisplays() {
  document.getElementById('ehr-patient-title').textContent = `${currentAstro.name} | Active Clinical Record`;
  document.getElementById('ehr-bp').textContent = currentAstro.bp;
  document.getElementById('ehr-map').textContent = currentAstro.map + ' mmHg';
  document.getElementById('ehr-hr').textContent = currentAstro.hr + ' bpm';
  document.getElementById('ehr-spo2').textContent = currentAstro.spo2 + '%';
  document.getElementById('ehr-onsd').textContent = currentAstro.onsd + ' mm';
  document.getElementById('ehr-bmd').textContent = `-${currentAstro.bmdLoss}%`;
}

function bindMedicationCheckboxes() {
  const chks = document.querySelectorAll('.med-chk');
  chks.forEach(chk => {
    chk.addEventListener('change', () => {
      const parent = chk.closest('.med-item');
      if (parent) {
        parent.classList.toggle('completed', chk.checked);
        if (chk.checked) {
          synth.playChime(true);
          const name = parent.querySelector('.med-name').textContent;
          logEvent('NOMINAL', `Medication administered: ${name} to ${currentAstro.name}`);
        }
      }
      updateMedicationAdherence();
    });
  });
  updateMedicationAdherence();
}

function updateMedicationAdherence() {
  const total = document.querySelectorAll('.med-chk').length;
  const checked = document.querySelectorAll('.med-chk:checked').length;
  const pct = Math.round((checked / total) * 100);

  const el = document.getElementById('med-adherence-pct');
  if (el) {
    el.textContent = `ADHERENCE: ${pct}%`;
    el.className = pct >= 75 ? 'mdb-adherence font-mono highlight-green' : 'mdb-adherence font-mono highlight-yellow';
  }
}

function toggleGuidedBreathing() {
  const btn = document.getElementById('btn-toggle-breathing');
  const circle = document.getElementById('breathing-circle');
  const cue = document.getElementById('breathing-cue');
  const tone = document.getElementById('autonomic-tone-val');

  if (breathingInterval) {
    // Stop
    clearInterval(breathingInterval);
    breathingInterval = null;
    circle.className = 'breathing-circle-pacer';
    cue.textContent = 'INHALE (4s)';
    tone.textContent = 'RESTING';
    btn.textContent = 'Start 3-Min Paced Breathing';
    logEvent('NOMINAL', 'Vagal biofeedback breathing session completed.');
  } else {
    // Start
    btn.textContent = 'Stop Breathing Coach';
    tone.textContent = 'VAGAL RESTORATION ACTIVE';
    synth.playBreathTone(260);

    const steps = [
      { text: 'INHALE (4s)', cls: 'breathing-circle-pacer inhale', freq: 330 },
      { text: 'HOLD (4s)', cls: 'breathing-circle-pacer inhale hold', freq: 392 },
      { text: 'EXHALE (4s)', cls: 'breathing-circle-pacer exhale', freq: 260 },
      { text: 'HOLD (4s)', cls: 'breathing-circle-pacer exhale hold', freq: 220 }
    ];

    let stepIdx = 0;
    const runStep = () => {
      const cur = steps[stepIdx];
      cue.textContent = cur.text;
      circle.className = cur.cls;
      synth.playBreathTone(cur.freq);
      stepIdx = (stepIdx + 1) % steps.length;
    };

    runStep();
    breathingInterval = setInterval(runStep, 4000);
    logEvent('NOMINAL', 'Vagal box breathing recovery started (4-4-4-4).');
  }
}

function exportEhrSummary() {
  const text = `===================================================================
ASTRIS-BIO CLINICAL MEDICAL RECORD & DISCHARGE SUMMARY
NASA HUMAN RESEARCH PROGRAM & SPACE MEDICINE DIVISION
MISSION: ARTEMIS MARS TRANSIT-1 (MET: ${document.getElementById('hud-met').textContent})
PATIENT: ${currentAstro.name} (${currentAstro.role})
===================================================================

VITALS & BIOMETRICS:
- Blood Pressure: ${currentAstro.bp} mmHg (MAP: ${currentAstro.map} mmHg)
- Resting Heart Rate: ${currentAstro.hr} BPM (Normal Sinus Rhythm)
- Oxygen Saturation (SpO2): ${currentAstro.spo2}% (Cabin pO2: 21.3 kPa)
- Core Body Temperature: ${currentAstro.temp} °C
- Optic Nerve Sheath Diameter: ${currentAstro.onsd} mm (SANS Risk Grade: Nominal)
- Estimated Intracranial Pressure: ${currentAstro.icp} mmHg
- Cumulative Radiation Dose: ${currentAstro.cumDose.toFixed(2)} mSv (14% Career PEL)
- Lumbar Bone Density Retention: -${currentAstro.bmdLoss}% loss

SOAP ENCOUNTER RECORD:
${document.getElementById('soap-content') ? document.getElementById('soap-content').textContent : ('S: ' + (document.getElementById('soap-S') ? document.getElementById('soap-S').textContent : '') + '\nO: ' + (document.getElementById('soap-O') ? document.getElementById('soap-O').textContent : '') + '\nA: ' + (document.getElementById('soap-A') ? document.getElementById('soap-A').textContent : '') + '\nP: ' + (document.getElementById('soap-P') ? document.getElementById('soap-P').textContent : ''))}

PRESCRIPTION RECOVERY ADHERENCE:
${document.getElementById('med-adherence-pct').textContent}

CERTIFIED BY:
Flight Surgeon Dr. ASTRIS, MD
Chief Aerospace Medical Officer, NASA Johnson Space Center
===================================================================`;

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ASTRIS_EHR_${currentAstro.id.toUpperCase()}_SUMMARY.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  synth.playChime(true);
  logEvent('NOMINAL', `Electronic Health Record downloaded for ${currentAstro.name}.`);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========================================================
// 4. CONTINUOUS WAVEFORM OSCILLOSCOPES (ECG & PPG)
// ========================================================

class WaveformEngine {
  constructor() {
    this.ecgCanvases = [
      document.getElementById('ecg-canvas'),
      document.getElementById('ecg-canvas-phys')
    ].filter(Boolean);

    this.ppgCanvases = [
      document.getElementById('ppg-canvas'),
      document.getElementById('ppg-canvas-phys')
    ].filter(Boolean);

    if (this.ecgCanvases.length === 0 || this.ppgCanvases.length === 0) return;

    this.ecgItems = this.ecgCanvases.map(c => ({ canvas: c, ctx: c.getContext('2d'), w: c.width, h: c.height, lastY: null }));
    this.ppgItems = this.ppgCanvases.map(c => ({ canvas: c, ctx: c.getContext('2d'), w: c.width, h: c.height, lastY: null }));

    this.width = this.ecgCanvases[0].width;
    this.speed = 2.2;
    this.ecgX = 0;
    this.ppgX = 0;
    this.ecgPhase = 0;
    this.ppgPhase = 0;
    this.lastTime = performance.now();
    this.requestFrameId = null;

    this.initGrids();
    this.startLoop();
  }

  initGrids() {
    this.ecgItems.forEach(item => {
      item.ctx.fillStyle = '#030710';
      item.ctx.fillRect(0, 0, item.w, item.h);
      this.drawGrid(item.ctx, item.w, item.h);
    });
    this.ppgItems.forEach(item => {
      item.ctx.fillStyle = '#030710';
      item.ctx.fillRect(0, 0, item.w, item.h);
      this.drawGrid(item.ctx, item.w, item.h);
    });
  }

  drawGrid(ctx, width, height) {
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.07)';
    ctx.lineWidth = 1;
    const step = 20;

    ctx.beginPath();
    for (let x = 0; x < width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  getEcgSample(phase, height) {
    const p = phase % 1.0;
    const midY = height * 0.58;
    let val = (Math.random() - 0.5) * 1.5;

    if (p > 0.12 && p < 0.22) {
      const t = (p - 0.12) / 0.1;
      val += Math.sin(t * Math.PI) * (height * 0.15); // P wave
    } else if (p >= 0.28 && p < 0.31) {
      const t = (p - 0.28) / 0.03;
      val -= Math.sin(t * Math.PI) * (height * 0.13); // Q wave
    } else if (p >= 0.31 && p < 0.36) {
      const t = (p - 0.31) / 0.05;
      val += (t < 0.5 ? t * 2 : (1 - (t - 0.5) * 2)) * (height * 0.85); // R spike
    } else if (p >= 0.36 && p < 0.40) {
      const t = (p - 0.36) / 0.04;
      val -= Math.sin(t * Math.PI) * (height * 0.25); // S wave
    } else if (p >= 0.52 && p < 0.72) {
      const t = (p - 0.52) / 0.2;
      val += Math.sin(t * Math.PI) * (height * 0.22); // T wave
    }

    return midY - val;
  }

  getPpgSample(phase, height) {
    const p = phase % 1.0;
    const midY = height * 0.75;
    let val = 0;

    if (p < 0.3) {
      val = Math.sin((p / 0.3) * (Math.PI / 2)) * (height * 0.48);
    } else if (p < 0.48) {
      const t = (p - 0.3) / 0.18;
      val = (height * 0.48) - t * (height * 0.18);
    } else if (p < 0.6) {
      const t = (p - 0.48) / 0.12;
      val = (height * 0.30) + Math.sin(t * Math.PI) * (height * 0.08);
    } else {
      const t = (p - 0.6) / 0.4;
      val = (height * 0.30) * (1 - t);
    }

    return midY - val;
  }

  startLoop() {
    const loop = (now) => {
      const dt = (now - this.lastTime) / 1000;
      this.lastTime = now;

      const hr = currentAstro.hr;
      const freq = hr / 60;
      const phaseDelta = freq * dt;

      const oldPhase = this.ecgPhase % 1.0;
      this.ecgPhase += phaseDelta;
      const newPhase = this.ecgPhase % 1.0;
      if (oldPhase < 0.33 && newPhase >= 0.33) {
        synth.playHeartbeat();
      }

      this.ppgPhase += phaseDelta;

      this.stepWaveforms();
      this.requestFrameId = requestAnimationFrame(loop);
    };

    this.requestFrameId = requestAnimationFrame(loop);
  }

  stepWaveforms() {
    const clearWidth = 14;

    this.ecgItems.forEach(item => {
      const ecgNextY = this.getEcgSample(this.ecgPhase, item.h);
      item.ctx.fillStyle = '#030710';
      item.ctx.fillRect(this.ecgX, 0, clearWidth, item.h);

      item.ctx.strokeStyle = '#00e676';
      item.ctx.lineWidth = 1.8;
      item.ctx.shadowColor = '#00e676';
      item.ctx.shadowBlur = 6;

      item.ctx.beginPath();
      item.ctx.moveTo(this.ecgX - this.speed, item.lastY || ecgNextY);
      item.ctx.lineTo(this.ecgX, ecgNextY);
      item.ctx.stroke();
      item.lastY = ecgNextY;
    });

    this.ppgItems.forEach(item => {
      const ppgNextY = this.getPpgSample(this.ppgPhase, item.h);
      item.ctx.fillStyle = '#030710';
      item.ctx.fillRect(this.ppgX, 0, clearWidth, item.h);

      item.ctx.strokeStyle = '#00f0ff';
      item.ctx.lineWidth = 1.6;
      item.ctx.shadowColor = '#00f0ff';
      item.ctx.shadowBlur = 5;

      item.ctx.beginPath();
      item.ctx.moveTo(this.ppgX - this.speed, item.lastY || ppgNextY);
      item.ctx.lineTo(this.ppgX, ppgNextY);
      item.ctx.stroke();
      item.lastY = ppgNextY;
    });

    this.ecgX += this.speed;
    this.ppgX += this.speed;

    if (this.ecgX >= this.width) {
      this.ecgX = 0;
      this.ecgItems.forEach(i => { i.lastY = null; });
    }
    if (this.ppgX >= this.width) {
      this.ppgX = 0;
      this.ppgItems.forEach(i => { i.lastY = null; });
    }
  }
}

// ========================================================
// 5. "BONE CRUSHING" RE-ENTRY G-LOAD CALCULATOR
// ========================================================

function bindBoneCrushCalculator() {
  const sliders = ['gload-slider', 'gload-slider-phys']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  sliders.forEach(slider => {
    slider.addEventListener('input', (e) => {
      currentGload = parseFloat(e.target.value);
      // Synchronize both sliders
      sliders.forEach(s => { if (s !== e.target) s.value = currentGload; });
      updateBoneCrushCalculations();
    });
  });

  updateBoneCrushCalculations();
}

function updateBoneCrushCalculations() {
  const gloadStr = `${currentGload.toFixed(1)} G (${currentGload === 1 ? 'Earth Normal' : (currentGload > 6 ? 'Extreme Ballistic Abort' : 'Atmospheric Deceleration')})`;

  const setAllText = (ids, val) => {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
  };

  const setAllClass = (ids, cls) => {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.className = cls;
    });
  };

  setAllText(['gload-val-text', 'gload-val-text-phys'], gloadStr);

  const baseMass = 80; // kg
  const gAcc = 9.81;
  const rawForceKN = (baseMass * gAcc * currentGload) / 1000;
  setAllText(['calc-axial-force', 'calc-axial-force-phys'], `${rawForceKN.toFixed(2)} kN`);

  const bmdLoss = currentAstro.bmdLoss;
  setAllText(['calc-bmd-loss', 'calc-bmd-loss-phys'], `-${bmdLoss.toFixed(2)}% Lumbar Loss`);

  const degradedThreshold = 5.2 - (bmdLoss * 0.4);
  let fractureRiskPct = 0;

  if (rawForceKN < 2.0) {
    fractureRiskPct = (rawForceKN / 2.0) * 1.5;
  } else if (rawForceKN < degradedThreshold) {
    fractureRiskPct = 2.0 + Math.pow((rawForceKN - 2.0) / (degradedThreshold - 2.0), 2) * 35;
  } else {
    fractureRiskPct = Math.min(98.5, 40 + ((rawForceKN - degradedThreshold) / 2.5) * 58);
  }

  const riskLabel = `${fractureRiskPct.toFixed(1)}% (${fractureRiskPct > 40 ? 'CRITICAL BONE CRUSH' : (fractureRiskPct > 15 ? 'MODERATE FRACTURE HAZARD' : 'SAFE')})`;
  setAllText(['calc-fracture-risk', 'calc-fracture-risk-phys'], riskLabel);

  if (fractureRiskPct > 40) {
    setAllClass(['calc-fracture-risk', 'calc-fracture-risk-phys'], 'fm-val font-mono highlight-red');
    setAllText(['bone-hazard-status', 'bone-hazard-status-phys'], 'HIGH SKELETAL FRACTURE RISK');
    setAllClass(['bone-hazard-status', 'bone-hazard-status-phys'], 'font-mono highlight-red');
    setAllText(['calc-couch-posture', 'calc-couch-posture-phys'], '75° Transverse (+Gx) Chest In ONLY');
  } else if (fractureRiskPct > 15) {
    setAllClass(['calc-fracture-risk', 'calc-fracture-risk-phys'], 'fm-val font-mono highlight-orange');
    setAllText(['bone-hazard-status', 'bone-hazard-status-phys'], 'MODERATE COMPRESSION STRAIN');
    setAllClass(['bone-hazard-status', 'bone-hazard-status-phys'], 'font-mono highlight-orange');
    setAllText(['calc-couch-posture', 'calc-couch-posture-phys'], 'Contoured Anti-G Recline + PAGS Active');
  } else {
    setAllClass(['calc-fracture-risk', 'calc-fracture-risk-phys'], 'fm-val font-mono highlight-green');
    setAllText(['bone-hazard-status', 'bone-hazard-status-phys'], 'NOMINAL SKELETAL TOLERANCE');
    setAllClass(['bone-hazard-status', 'bone-hazard-status-phys'], 'font-mono highlight-green');
    setAllText(['calc-couch-posture', 'calc-couch-posture-phys'], 'Transverse (+Gx) Chest In');
  }
}

// ========================================================
// 6. DISTANCE FROM EARTH & ORBITAL DYNAMICS ENGINE
// ========================================================

function bindTrajectoryModule() {
  const phaseSelect = document.getElementById('mission-phase-select');
  if (phaseSelect) {
    phaseSelect.addEventListener('change', (e) => {
      setTrajectoryPhase(e.target.value);
    });
  }

  const armAbortBtn = document.getElementById('btn-arm-abort');
  const bannerAbortBtn = document.getElementById('btn-banner-abort');
  const cancelAbortBtn = document.getElementById('btn-cancel-abort');

  if (armAbortBtn) armAbortBtn.addEventListener('click', triggerImmediateAbortLanding);
  if (bannerAbortBtn) bannerAbortBtn.addEventListener('click', () => {
    switchTab('tab-trajectory');
    triggerImmediateAbortLanding();
  });
  if (cancelAbortBtn) cancelAbortBtn.addEventListener('click', cancelAbortSequence);

  setTrajectoryPhase('mars_transit');
}

function setTrajectoryPhase(phaseKey) {
  currentPhaseKey = phaseKey;
  const model = TRAJECTORY_MODELS[phaseKey];
  if (!model) return;

  const formattedKm = Number(model.km).toLocaleString('en-US') + ' km';
  document.getElementById('hud-earth-dist').textContent = `${formattedKm} (${model.au})`;
  document.getElementById('hud-comm-delay').textContent = model.owltText;
  document.getElementById('foot-earth-dist').textContent = formattedKm;

  document.getElementById('calc-earth-km').textContent = formattedKm;
  document.getElementById('calc-owlt').textContent = model.owltText;
  document.getElementById('abort-transit-days').textContent = model.transitDays;

  // Master Health Dashboard updates
  const dashDist = document.getElementById('dash-dist');
  if (dashDist) dashDist.textContent = formattedKm;
  const dashDelay = document.getElementById('dash-delay');
  if (dashDelay) dashDelay.textContent = model.owltText;
  const dashIsoDist = document.getElementById('dash-iso-dist');
  if (dashIsoDist) dashIsoDist.textContent = formattedKm;
  const dashIsoDelay = document.getElementById('dash-iso-delay');
  if (dashIsoDelay) dashIsoDelay.textContent = model.owltText;

  const marker = document.getElementById('sc-marker');
  if (marker) {
    marker.style.left = model.markerPct;
    marker.querySelector('.sc-label').textContent = `ASTRIS (${model.au})`;
  }

  logEvent('NOMINAL', `Astrodynamics: Phase set to ${model.name}. Distance: ${formattedKm}`);
}

function triggerImmediateAbortLanding() {
  synth.init();
  synth.startCriticalKlaxon();

  const terminal = document.getElementById('abort-terminal-output');
  const readiness = document.getElementById('abort-readiness');
  readiness.textContent = 'BURNING TEI-ABORT (ΔV: 1,420 m/s)';
  readiness.className = 'font-mono highlight-red';

  terminal.innerHTML = `
    [EMERGENCY ABORT INITIATED]
    > RE-ENTRY TRAJECTORY SOLUTION: COMPLETED.
    > ΔV REQUIRED: 1,420 m/s (HYPERGOLIC SERVICE MODULE OMS BURN).
    > FAST HYPERBOLIC EARTH RETURN DURATION: ${TRAJECTORY_MODELS[currentPhaseKey].transitDays}.
    > RE-ENTRY DECELERATION G-LOAD: 6.8G (BALLISTIC DIRECT CORRIDOR).
    > CONTIGENCY SKELETAL MITIGATION: ANTI-G COUCH TRANSVERSE POSTURE LOCKED.
    > PACIFIC OCEAN RECOVERY TASK FORCE 71 ALERTED AT 14°N, 168°W.
  `;

  logEvent('CRITICAL', 'EMERGENCY ABORT COMMAND: Autonomous Immediate Earth Landing trajectory executed.');
  loadProtocol('emergency_abort');
  switchTab('tab-guidance');
}

function cancelAbortSequence() {
  synth.stopCriticalKlaxon();
  const terminal = document.getElementById('abort-terminal-output');
  const readiness = document.getElementById('abort-readiness');
  readiness.textContent = 'ABORT ARMED (STANDBY)';
  readiness.className = 'font-mono highlight-cyan';

  terminal.textContent = '[SYSTEM STANDBY] Emergency abort trajectory solutions synchronized with DSN navigation state vectors.';
  logEvent('CAUTION', 'Abort sequence disarmed. Spacecraft resumed nominal cruise telemetry.');
}

// ========================================================
// 7. ISOLATION & BIOPHILIC VR TOOLS
// ========================================================

function bindIsolationTools() {
  const vrBtn = document.getElementById('btn-start-vr');
  const envBtns = document.querySelectorAll('.btn-env');

  if (vrBtn) {
    vrBtn.addEventListener('click', () => {
      synth.playChime(true);
      const activeEnv = document.querySelector('.btn-env.active');
      const soundType = activeEnv ? activeEnv.getAttribute('data-sound') : 'rain';
      synth.playBiophilicNature(soundType);

      vrBtn.disabled = true;
      vrBtn.textContent = 'VR Session Active (Audio Stream ON)';
      logEvent('NOMINAL', `Astronaut initiated 20-min Biophilic Nature Immersion (${soundType}).`);

      setTimeout(() => {
        vrBtn.disabled = false;
        vrBtn.textContent = 'Start 20-Min VR Session';
      }, 6000);
    });
  }

  envBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      envBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      synth.playBiophilicNature(btn.getAttribute('data-sound'));
    });
  });
}

// ========================================================
// 8. COMPREHENSIVE MEDICAL PROTOCOLS DATA
// ========================================================

const MEDICAL_PROTOCOLS = {
  spe_shelter: {
    code: 'PROTOCOL ALPHA',
    name: 'Solar Particle Event (SPE) Shelter Retreat & Acute Radioprotection',
    severity: 'CRITICAL RADIATION THREAT',
    severityClass: 'critical-badge',
    timeMinutes: 15,
    summary: 'Coronal Mass Ejection (CME) shock front detected. Heavy proton flux > 100 MeV incoming. Radiation dose in unshielded compartments will surge > 10 mSv/h. Immediate shelter ingress and cellular prophylaxis required.',
    steps: [
      { id: 'spe-1', order: '01', title: 'Abort EVA & Sound All-Hands Sanctuary Retreat', rationale: 'Cease any active Extravehicular Activity immediately. Ingress airlock and seal inner hatch.' },
      { id: 'spe-2', order: '02', title: 'Ingress Central Water Wall Storm Shelter (Module 3)', rationale: 'Relocate all 4 crew members into the central compartment surrounded by 38 g/cm² water tanks and dense food pack walls.' },
      { id: 'spe-3', order: '03', title: 'Administer Oral Radioprotectant Cocktail', rationale: 'Take 400 IU Vitamin E, 1000mg Ascorbic Acid, and N-acetylcysteine (NAC) 600mg to scavenge reactive oxygen species (ROS).' },
      { id: 'spe-4', order: '04', title: 'Deploy Borated Polyethylene Secondary Curtains', rationale: 'Unroll internal hydrogen-rich flexible borated polyethylene mats across shelter hatches to absorb secondary spallation neutrons.' },
      { id: 'spe-5', order: '05', title: 'Power Down Non-Essential Avionics & Exterior Cameras', rationale: 'Shed electrical bus loads to protect sensitive microchips from single-event upset (SEU) latch-ups.' },
      { id: 'spe-6', order: '06', title: 'Synchronize Dosimetry Downlink with Space Radiation Analysis Group (SRAG)', rationale: 'Transmit active personal dosimeter (APD) telemetry to Johnson Space Center SRAG flight surgeons.' }
    ]
  },
  emergency_abort: {
    code: 'PROTOCOL ZETA',
    name: 'Immediate Emergency Landing & Earth Return Abort',
    severity: 'LIFE-CRITICAL ABORT SEQUENCE',
    severityClass: 'critical-badge',
    timeMinutes: 30,
    summary: 'Catastrophic health emergency or lethal heliospheric radiation overdose (>2.5 Gy) mandates immediate spacecraft abort trajectory. Execute hypergolic Trans-Earth Injection burn and prep direct atmospheric ballistic landing.',
    steps: [
      { id: 'ab-1', order: '01', title: 'Confirm Abort Vector & Load TEI Trajectory Solution', rationale: 'Execute autonomous onboard flight computer calculation for 1,420 m/s retrograde burn.' },
      { id: 'ab-2', order: '02', title: 'Crew Strapped into Custom Form-Fitting Anti-G Couches', rationale: 'Position all crew members in 75° transverse chest-first orientation (+Gx) to eliminate axial spinal crush.' },
      { id: 'ab-3', order: '03', title: 'Arm Emergency Atmospheric Entry Heat Shield Pyros', rationale: 'Activate thermal protection system backup power and align entry interface corridor.' },
      { id: 'ab-4', order: '04', title: 'Activate Pneumatic Anti-G Suits (PAGS) to 50 mmHg', rationale: 'Prevent re-entry orthostatic cerebral ischemia and syncope during 6.8G deceleration.' },
      { id: 'ab-5', order: '05', title: 'Transmit Automated SBAR Recovery Beacon to US Navy Task Force', rationale: 'Broadcast coordinates 14°N, 168°W with onboard medical triage status.' }
    ]
  },
  bone_crush: {
    code: 'PROTOCOL ETA',
    name: 'Re-entry High-G Spine Compression & Fracture Mitigation',
    severity: 'SKELETAL INTEGRITY THREAT',
    severityClass: 'critical-badge',
    timeMinutes: 45,
    summary: 'Microgravity-induced osteopenia (-1.5% lumbar BMD loss) severely elevates vertebral compression fracture and pelvic crush risk during entry deceleration. Enact skeletal posture dampening.',
    steps: [
      { id: 'bc-1', order: '01', title: 'Recline Anti-G Couch to Strict 75° Transverse (+Gx) Angle', rationale: 'Directs heavy deceleration loads into ribcage and pectorals, sparing fragile osteopenic lumbar vertebrae L1-L5.' },
      { id: 'bc-2', order: '02', title: 'Tighten 5-Point Full Torso Axial Restraint Harness', rationale: 'Eliminates spinal flexion or lateral shear forces that trigger wedge fractures during parachute deployment shocks.' },
      { id: 'bc-3', order: '03', title: 'Administer Calcitonin / Teriparatide Analgesia if Lumbalgia Present', rationale: 'Mitigate acute bone pain and stabilize osteoblast signaling before high-impact touchdown.' },
      { id: 'bc-4', order: '04', title: 'Engage Hydraulic Seat Attenuation Dampers', rationale: 'Ensure landing impact impulse does not exceed 2.5 kN peak spine loading.' }
    ]
  },
  sans_decompression: {
    code: 'PROTOCOL BRAVO',
    name: 'Acute SANS & Intracranial Hypertensive Relief Protocol',
    severity: 'HIGH PRIORITY CLINICAL RISK',
    severityClass: 'critical-badge',
    timeMinutes: 120,
    summary: 'Cephalic microgravity fluid shift has caused significant rise in estimated Intracranial Pressure (ICP > 22 mmHg) and Optic Nerve Sheath Diameter (ONSD > 6.0 mm). Lower body negative pressure and pharmacological pressure reduction indicated.',
    steps: [
      { id: 'sans-1', order: '01', title: 'Immediate Patient Assessment & OCT Retinal Scan', rationale: 'Perform fundoscopy and Optical Coherence Tomography (OCT) to quantify optic disc swelling.' },
      { id: 'sans-2', order: '02', title: 'Lower Body Negative Pressure (LBNP) Chamber Session', rationale: 'Place astronaut in LBNP device at -20 mmHg for 120 minutes to draw 1500 mL of fluid caudally.' },
      { id: 'sans-3', order: '03', title: 'Deploy Venoconstrictive Thigh Cuffs', rationale: 'Fit graduated thigh compression cuffs set to 30-35 mmHg during rest cycles.' },
      { id: 'sans-4', order: '04', title: 'Administer Carbonic Anhydrase Inhibitor (Acetazolamide)', rationale: 'Administer Acetazolamide 250 mg PO BID to inhibit choroid plexus CSF production.' }
    ]
  },
  hypoxia_emergency: {
    code: 'PROTOCOL CHARLIE',
    name: 'Acute Hypoxia & Cabin Decompression / Hypercapnia Response',
    severity: 'LIFE-CRITICAL ATMOSPHERIC EMERGENCY',
    severityClass: 'critical-badge',
    timeMinutes: 10,
    summary: 'Partial pressure of oxygen (pO2) dropped below critical limit (<16 kPa). Execute emergency breathing and atmospheric isolation.',
    steps: [
      { id: 'hyp-1', order: '01', title: 'Don Emergency Oxygen Masks (Quick-Don PBBA)', rationale: 'Crew immediately dons positive-pressure 100% O2 masks.' },
      { id: 'hyp-2', order: '02', title: 'Isolate Depressurizing Compartment via Hatch Seals', rationale: 'Check ultrasonic leak detector; seal bulkheads.' },
      { id: 'hyp-3', order: '03', title: 'Initiate High-Pressure Oxygen Buffer Injection', rationale: 'Command ECLSS to dump high-pressure O2 bank into cabin atmosphere.' }
    ]
  },
  arrhythmia_syncope: {
    code: 'PROTOCOL DELTA',
    name: 'Ventricular Arrhythmia & Orthostatic Syncope Stabilization',
    severity: 'ACUTE CARDIOVASCULAR COLLAPSE',
    severityClass: 'critical-badge',
    timeMinutes: 30,
    summary: 'Sudden onset ventricular tachycardia or orthostatic collapse following high-strain EVA and plasma volume loss.',
    steps: [
      { id: 'arr-1', order: '01', title: 'Place Patient in Restraint & Attach Defibrillator (AED)', rationale: 'Secure astronaut to medical restraint board.' },
      { id: 'arr-2', order: '02', title: 'Establish IV Access & Administer 1000 mL Normal Saline Bolus', rationale: 'Expand central blood volume.' },
      { id: 'arr-3', order: '03', title: 'Inflate Anti-G Compression Garment', rationale: 'Pressurize lower body garment to 40 mmHg.' }
    ]
  },
  isolation_reset: {
    code: 'PROTOCOL THETA',
    name: 'Severe Isolation Psychosis & Earth-Out-Of-View Reset',
    severity: 'BEHAVIORAL EMERGENCY',
    severityClass: 'critical-badge',
    timeMinutes: 60,
    summary: 'Astronaut experiencing severe isolation-induced detachment, emotional withdrawal, and Earth-out-of-view existential anxiety. Implement autonomous cognitive restorative suite.',
    steps: [
      { id: 'iso-1', order: '01', title: 'Initiate 20-Minute Biophilic Nature Immersion (VR + 480Hz Audio)', rationale: 'Saturates sensory pathways with familiar terrestrial forest stimuli to alleviate deprivation.' },
      { id: 'iso-2', order: '02', title: 'Administer Asynchronous Family Video/Voice Uplink Buffer', rationale: 'Re-establishes socio-emotional grounding despite deep space radio latency.' },
      { id: 'iso-3', order: '03', title: 'Autonomous AI Cognitive-Behavioral Sounding Board Session', rationale: 'Guided structured therapeutic reframing for acute mission confinement stress.' }
    ]
  }
};

let activeProtocolKey = 'spe_shelter';
let activeProtocolTimerSeconds = 15 * 60;
let protocolTimerInterval = null;

function loadProtocol(key) {
  const protocol = MEDICAL_PROTOCOLS[key];
  if (!protocol) return;

  activeProtocolKey = key;
  activeProtocolTimerSeconds = (protocol.timeMinutes || 15) * 60;
  if (protocolTimerInterval) {
    clearInterval(protocolTimerInterval);
    protocolTimerInterval = null;
  }

  const codeEl = document.getElementById('protocol-code');
  const severityEl = document.getElementById('protocol-severity');
  const summaryEl = document.getElementById('protocol-summary');
  const timerEl = document.getElementById('protocol-timer');
  const timerBtn = document.getElementById('btn-start-timer');
  const selectEl = document.getElementById('protocol-select');
  const stepsContainer = document.getElementById('protocol-steps-list');
  const progressBar = document.getElementById('protocol-progress-bar');
  const completeBtn = document.getElementById('btn-complete-protocol');

  if (codeEl) codeEl.textContent = protocol.code;
  if (severityEl) {
    severityEl.textContent = protocol.severity;
    severityEl.className = `ap-severity-badge ${protocol.severityClass || 'critical-badge'}`;
  }
  if (summaryEl) summaryEl.textContent = protocol.summary;
  if (timerEl) {
    const mins = Math.floor(activeProtocolTimerSeconds / 60);
    const secs = activeProtocolTimerSeconds % 60;
    timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} REMAINING`;
  }
  if (timerBtn) timerBtn.textContent = 'Start Timer';
  if (selectEl && selectEl.value !== key) {
    selectEl.value = key;
  }

  if (stepsContainer) {
    stepsContainer.innerHTML = '';
    protocol.steps.forEach((step, idx) => {
      const stepItem = document.createElement('div');
      stepItem.className = 'protocol-step-item';
      stepItem.id = `step-${step.id}`;
      stepItem.innerHTML = `
        <input type="checkbox" class="step-checkbox" id="check-${step.id}" data-step-id="${step.id}">
        <div class="step-content">
          <div class="step-title-line">
            <span class="step-order font-mono">${step.order || (idx + 1).toString().padStart(2, '0')}</span>
            <label for="check-${step.id}" class="step-action-text">${step.title}</label>
          </div>
          <div class="step-rationale">${step.rationale}</div>
        </div>
      `;
      stepsContainer.appendChild(stepItem);
    });

    const checkboxes = stepsContainer.querySelectorAll('.step-checkbox');
    checkboxes.forEach(chk => {
      chk.addEventListener('change', () => {
        const item = chk.closest('.protocol-step-item');
        if (item) item.classList.toggle('completed', chk.checked);

        const checkedCount = stepsContainer.querySelectorAll('.step-checkbox:checked').length;
        const totalCount = checkboxes.length;
        const pct = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

        if (progressBar) {
          progressBar.style.width = `${pct}%`;
        }
        if (completeBtn) {
          completeBtn.disabled = checkedCount < totalCount;
        }

        try {
          if (audioEnabled && synth) synth.playBreathTone(chk.checked ? 440 : 330);
        } catch (e) {}
      });
    });
  }

  if (progressBar) progressBar.style.width = '0%';
  if (completeBtn) completeBtn.disabled = true;
}

function bindProtocolEngine() {
  const selectEl = document.getElementById('protocol-select');
  if (selectEl) {
    selectEl.addEventListener('change', (e) => {
      loadProtocol(e.target.value);
    });
  }

  const timerBtn = document.getElementById('btn-start-timer');
  const timerEl = document.getElementById('protocol-timer');
  if (timerBtn && timerEl) {
    timerBtn.addEventListener('click', () => {
      if (protocolTimerInterval) {
        clearInterval(protocolTimerInterval);
        protocolTimerInterval = null;
        timerBtn.textContent = 'Resume Timer';
      } else {
        timerBtn.textContent = 'Pause Timer';
        protocolTimerInterval = setInterval(() => {
          if (activeProtocolTimerSeconds > 0) {
            activeProtocolTimerSeconds--;
            const m = Math.floor(activeProtocolTimerSeconds / 60);
            const s = activeProtocolTimerSeconds % 60;
            timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} REMAINING`;
          } else {
            clearInterval(protocolTimerInterval);
            protocolTimerInterval = null;
            timerEl.textContent = '00:00 EXPIRED';
            timerBtn.textContent = 'Timer Expired';
            try {
              if (audioEnabled && synth) synth.playCautionBeep();
            } catch (e) {}
            logEvent('WARNING', `Protocol timer expired for ${activeProtocolKey}. Verify all countermeasures executed.`);
          }
        }, 1000);
      }
    });
  }

  const completeBtn = document.getElementById('btn-complete-protocol');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      try {
        if (audioEnabled && synth) synth.playChime(true);
      } catch (e) {}
      const protocol = MEDICAL_PROTOCOLS[activeProtocolKey];
      const protocolName = protocol ? protocol.name : activeProtocolKey;
      logEvent('NOMINAL', `PROTOCOL COMPLETE: [${activeProtocolKey.toUpperCase()}] ${protocolName} successfully verified.`);
      alert(`PROTOCOL VERIFIED & LOGGED:\n\nAll actionable countermeasures for ${protocolName} have been performed and downlink timestamp recorded.`);

      const sbarEl = document.getElementById('sbar-text');
      if (sbarEl) {
        sbarEl.value += `\n[PROTOCOL EXECUTED: ${protocol ? protocol.code : ''} - ${protocolName} completed at ${new Date().toISOString()}]\n`;
      }
    });
  }

  const resetBtn = document.getElementById('btn-reset-protocol');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      loadProtocol(activeProtocolKey);
    });
  }

  loadProtocol('spe_shelter');
}

// ========================================================
// 9. PSYCHOMOTOR VIGILANCE TEST (PVT) ENGINE
// ========================================================

class PVTEngine {
  constructor() {
    this.state = 'idle';
    this.timeoutId = null;
    this.intervalId = null;
    this.startTime = 0;
    this.bestScore = null;
    this.results = [];
    this.lapses = 0;

    this.screenEl = document.getElementById('pvt-screen-area');
    this.statusEl = document.getElementById('pvt-screen-status');
    this.timerEl = document.getElementById('pvt-timer-val');
    this.feedbackEl = document.getElementById('pvt-feedback-msg');
    this.startBtn = document.getElementById('btn-pvt-start');
    this.triggerBtn = document.getElementById('btn-pvt-trigger');
    this.resetBtn = document.getElementById('btn-pvt-reset');

    this.initEvents();
  }

  initEvents() {
    if (!this.startBtn) return;
    this.startBtn.addEventListener('click', () => this.startTest());
    this.triggerBtn.addEventListener('click', () => this.triggerHit());
    this.resetBtn.addEventListener('click', () => this.resetTest());

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && (this.state === 'waiting' || this.state === 'active')) {
        e.preventDefault();
        this.triggerHit();
      }
    });
  }

  startTest() {
    synth.init();
    this.state = 'waiting';
    this.screenEl.className = 'pvt-screen';
    this.statusEl.textContent = 'STANDBY... WAIT FOR FLASH';
    this.timerEl.textContent = '000.0 ms';
    this.feedbackEl.textContent = 'Keep finger on trigger or SPACEBAR...';
    this.startBtn.disabled = true;
    this.triggerBtn.disabled = false;

    const delay = Math.floor(1500 + Math.random() * 3000);
    this.timeoutId = setTimeout(() => {
      this.activateTimer();
    }, delay);
  }

  activateTimer() {
    this.state = 'active';
    this.screenEl.classList.add('ready-flash');
    this.statusEl.textContent = 'REACT NOW!';
    synth.playCautionBeep();
    this.startTime = performance.now();

    this.intervalId = setInterval(() => {
      const elapsed = performance.now() - this.startTime;
      this.timerEl.textContent = elapsed.toFixed(1) + ' ms';
      if (elapsed > 500) {
        this.feedbackEl.textContent = 'WARNING: Cognitive Lapse (>500ms)';
      }
    }, 16);
  }

  triggerHit() {
    if (this.state === 'waiting') {
      clearTimeout(this.timeoutId);
      this.state = 'idle';
      this.statusEl.textContent = 'FALSE START!';
      this.timerEl.textContent = 'ERR: EARLY';
      this.feedbackEl.textContent = 'Penalty: Triggered before visual stimulus.';
      this.startBtn.disabled = false;
      this.triggerBtn.disabled = true;
      synth.playChime(false);
      logEvent('CAUTION', 'PVT false start detected on ' + currentAstro.name);
      return;
    }

    if (this.state === 'active') {
      clearInterval(this.intervalId);
      const reactionTime = Math.round(performance.now() - this.startTime);
      this.state = 'finished';
      this.screenEl.className = 'pvt-screen hit-success';
      this.statusEl.textContent = 'REACTION LOGGED';
      this.timerEl.textContent = reactionTime + ' ms';
      synth.playChime(true);

      const isLapse = reactionTime > 500;
      if (isLapse) {
        this.lapses++;
        this.feedbackEl.textContent = 'ATTENTION LAPSE: Reaction exceeded 500ms!';
        logEvent('WARNING', 'PVT Cognitive lapse (' + reactionTime + ' ms) on ' + currentAstro.name);
      } else {
        this.feedbackEl.textContent = 'Nominal Psychomotor Reflex: ' + reactionTime + ' ms';
        logEvent('NOMINAL', 'PVT Test completed: ' + reactionTime + ' ms (' + currentAstro.name + ')');
      }

      this.results.push(reactionTime);
      this.updateStats(reactionTime);

      this.startBtn.disabled = false;
      this.triggerBtn.disabled = true;
    }
  }

  updateStats(latestRt) {
    if (!this.bestScore || latestRt < this.bestScore) {
      this.bestScore = latestRt;
    }
    const sum = this.results.reduce((a, b) => a + b, 0);
    const mean = Math.round(sum / this.results.length);

    document.getElementById('pvt-best').textContent = this.bestScore + ' ms';
    document.getElementById('pvt-mean').textContent = mean + ' ms';
    document.getElementById('pvt-lapses').textContent = this.lapses;

    const readinessEl = document.getElementById('pvt-readiness');
    if (this.lapses > 2 || mean > 400) {
      readinessEl.textContent = 'COGNITIVE FATIGUE';
      readinessEl.className = 'pr-val font-mono highlight-red';
    } else if (mean > 300) {
      readinessEl.textContent = 'MODERATE STRAIN';
      readinessEl.className = 'pr-val font-mono highlight-yellow';
    } else {
      readinessEl.textContent = 'PRIME FOR EVA';
      readinessEl.className = 'pr-val font-mono highlight-green';
    }
  }

  resetTest() {
    clearTimeout(this.timeoutId);
    clearInterval(this.intervalId);
    this.state = 'idle';
    this.screenEl.className = 'pvt-screen';
    this.statusEl.textContent = 'TEST IDLE';
    this.timerEl.textContent = '000.0 ms';
    this.feedbackEl.textContent = 'Awaiting test start';
    this.startBtn.disabled = false;
    this.triggerBtn.disabled = true;
  }
}

// ========================================================
// 10. NASA SPACE APPS 2026 & HRP RESOURCE ARTICLES
// ========================================================

const RESOURCE_DATABASE = {
  'res-spaceapps': {
    title: 'NASA Space Apps Challenge 2026: Autonomous Deep Space Health Architecture',
    meta: 'CHALLENGE BRIEF: HEALTH MONITORING SOFTWARE FOR ASTRONAUTS ON LONG-DURATION MISSIONS',
    html: `
      <div class="res-spaceapps-hero">
        <span class="rash-badge">NASA SPACE APPS CHALLENGE 2026 INNOVATION</span>
        <h3 class="rash-title">Autonomous Medical Intelligence for Deep Space Exploration</h3>
        <p class="rash-desc">
          When humanity ventures toward Mars, Earth will become a distant pale blue dot, and light-time communication delays will exceed 20 to 40 minutes round-trip. ASTRIS-Bio solves this grand challenge by providing an autonomous Edge-AI clinical intelligence suite that functions entirely independently of Earth-based mission control.
        </p>
      </div>

      <h3>1. Challenge Problem Statement</h3>
      <p>Traditional space operations rely heavily on Houston Mission Control and the Space Medicine Operations Division (SMOD) to monitor telemetry and dictate clinical countermeasures in real-time. For Mars transit and planetary surface missions, radio latency makes tele-surgery or real-time diagnostic guidance physically impossible. Astronauts face lethal risks without immediate support: solar particle events, high-G bone fractures from microgravity osteopenia, acute SANS intracranial hypertension, and extreme confinement psychosis.</p>

      <h3>2. Key Innovations in ASTRIS-Bio</h3>
      <ul>
        <li><strong>Continuous Multi-Sensor Biometric Fusion:</strong> 1000 Hz Lead-II ECG and PPG plethysmograms for real-time arrhythmia, fluid shift, and autonomic tone detection.</li>
        <li><strong>Skeletal "Bone Crushing" G-Force Hazard Predictor:</strong> Computes compressive loads on demineralized lumbar vertebrae and prescribes contoured transverse couch angles to prevent wedge collapse.</li>
        <li><strong>Heliospheric Dosimetry & Organ Tissue Penetration:</strong> Bragg-peak ionization modeling across skin, eyes, CNS, and bone marrow with acute overdose triage.</li>
        <li><strong>Immediate Emergency Landing & Abort Trajectory Engine:</strong> Autonomous Trans-Earth Injection (TEI) calculations with landing recovery coordinates.</li>
        <li><strong>Zero-Dependency Procedural Audio Synthesizer:</strong> Generates auditory klaxons, cardiac telemetry pulses, and biophilic nature audio entirely within the browser via Web Audio API.</li>
      </ul>
    `
  },
  'res-abort': {
    title: 'Autonomous Immediate Emergency Landing & Return Abort Trajectories',
    meta: 'GUIDANCE DIRECTIVE: DEEP SPACE CREW CONTINGENCY ABORT (NASA HRP-EA-01)',
    html: `
      <h3>1. Emergency Abort Triggers</h3>
      <p>Immediate abort return is triggered when onboard autonomous diagnostics identify irreversible lethal conditions: cumulative acute radiation exceeding 2.0 Gy with prodromal collapse, unrecoverable life support hull breach, or hemodynamically unstable cardiovascular collapse.</p>

      <h3>2. Trans-Earth Injection (TEI) Burn Dynamics</h3>
      <p>The spacecraft utilizes its hypergolic bipropellant orbital maneuvering system (OMS) to execute a high-thrust retrograde impulse (&Delta;v = 1,420 m/s), converting an outward Hohmann transfer arc into an accelerated hyperbolic Earth-intersecting corridor.</p>

      <div class="table-wrapper">
        <table class="res-table">
          <thead>
            <tr><th>Mission Phase</th><th>Distance from Earth</th><th>Emergency Return Duration</th><th>Landing Profile</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Cislunar / Gateway</strong></td><td>384,400 km</td><td>4.2 Days (Free-Return)</td><td>Direct Pacific Ocean Splashdown</td></tr>
            <tr><td><strong>Early Mars Transit</strong></td><td>15,200,000 km</td><td>21.5 Days (Hyperbolic Burn)</td><td>Ballistic Aerocapture (7.5G Peak)</td></tr>
            <tr><td><strong>Mid Mars Transit</strong></td><td>56,420,000 km</td><td>38.0 Days (High-Energy TEI)</td><td>Steep Direct Atmosphere Entry</td></tr>
          </tbody>
        </table>
      </div>
    `
  },
  'res-bone-crush': {
    title: 'Skeletal Deconditioning & "Bone Crushing" High-G Fracture Hazards',
    meta: 'EVIDENCE BASE: HRP OSTEOLOGY & MECHANICAL DECELERATION HAZARDS',
    html: `
      <h3>1. Microgravity Bone Demineralization</h3>
      <p>In weightless microgravity, osteoclast resorption outpaces osteoblast bone matrix formation. Astronauts lose approximately 1.0% to 1.5% of bone mineral density (BMD) per month in axial weight-bearing structures: lumbar vertebrae (L1-L5), pelvis, and femoral necks. Cortical thickness thins, and trabecular pore volume increases by over 12%.</p>

      <h3>2. The "Bone Crushing" Deceleration Hazard</h3>
      <p>Upon re-entering Earth's atmosphere, spacecraft experience severe deceleration forces ranging from 3.5G (nominal lifting entry) to 8.2G (ballistic abort trajectory). In an 80kg astronaut, 8G produces over 6.2 kN of compressive force down the vertical spinal column. In osteopenic spaceflight bone, ultimate compressive failure occurs between 4.8 and 5.5 kN, creating high risk for catastrophic <strong>vertebral compression fractures ("bone crushing")</strong>, spinal cord injury, or permanent disability.</p>

      <h3>3. Critical Countermeasure: Transverse (+Gx) Seating Orientation</h3>
      <p>By reclining astronauts into a 75° to 80° transverse position (+Gx - chest inward), deceleration loads are redirected through the broad anterior-posterior chest and pelvis, entirely bypassing the fragile axial spinal column.</p>
    `
  },
  'res-isolation': {
    title: 'Deep Space Confinement, Isolation & "Earth-Out-Of-View"',
    meta: 'EVIDENCE BASE: BEHAVIORAL HEALTH & PERFORMANCE (BHP) ELEMENT',
    html: `
      <h3>1. The "Earth-Out-Of-View" Phenomenon</h3>
      <p>On past missions in Low Earth Orbit (Apollo, Skylab, ISS), astronauts could always look out the cupola to see the vibrant blue orb of Earth. In deep space, Earth shrinks to a tiny, pale blue speck (angular diameter &lt; 0.015°). Behavioral researchers have identified this transition as a profound psychological stressor, generating existential disorientation, loneliness, and emotional friction with ground control.</p>

      <h3>2. Autonomous Psychological Countermeasures</h3>
      <ul>
        <li><strong>Biophilic Virtual Reality (VR):</strong> High-fidelity 4K terrestrial simulations of pine forests, ocean shorelines, and gentle rainstorms paired with 480Hz acoustic pink noise to alleviate habitat sensory monotony.</li>
        <li><strong>Cognitive-Behavioral Sounding Board:</strong> Onboard AI chat companion providing confidential psychological check-ins without Earth latency.</li>
      </ul>
    `
  },
  'res-tissue-rad': {
    title: 'Radiation Penetration into Human Organs & Bragg-Peak Bio-Deposition',
    meta: 'EVIDENCE BASE: NASA SRAG & NCRP RADIATION BIOPHYSICS DIRECTIVE',
    html: `
      <h3>1. Penetration Dynamics of Cosmic Rays</h3>
      <p>Galactic Cosmic Rays (GCR) consist of relativistic heavy ions (HZE nuclei such as <sup>56</sup>Fe) moving at near light speed. These particles slice through shielding and deposit dense linear energy transfer (LET) ion tracks through human tissues.</p>

      <h3>2. Organ-Specific Pathologies</h3>
      <ul>
        <li><strong>Ocular Lens:</strong> High LET tracks induce posterior subcapsular cataracts; astronauts report cosmic ray phosphene "light flashes" inside the vitreous body.</li>
        <li><strong>Bone Marrow:</strong> Destroys hematopoietic stem cells, causing acute lymphopenia, granulocytopenia, and severe immunosuppression.</li>
        <li><strong>Central Nervous System (CNS):</strong> Heavy ion tracks cause neuronal dendritic pruning and persistent spatial working memory deficits.</li>
      </ul>
    `
  },
  'res-sans': {
    title: 'Spaceflight-Associated Neuro-ocular Syndrome (SANS)',
    meta: 'EVIDENCE BASE: NASA-STD-3001 | ISS EXPEDITIONS 1-72 DATA',
    html: `
      <h3>1. Clinical Overview</h3>
      <p>Cephalad fluid shift of 1.5L triggers jugular venous engorgement and elevated intracranial pressure (ICP), causing posterior ocular globe flattening, choroidal folds, and hyperopic refractive shifts.</p>
      <h3>2. Treatment</h3>
      <p>Lower Body Negative Pressure (LBNP) chamber sessions at -20 mmHg for 2 hours daily, venous thigh cuffs, and acetazolamide.</p>
    `
  },
  'res-pharma': {
    title: 'Microgravity Pharmacokinetics & Drug Degradation',
    meta: 'EVIDENCE BASE: NASA PHARMACOPEIA STABILITY DIRECTIVE',
    html: `
      <h3>1. Accelerated API Breakdown</h3>
      <p>Space radiation and microgravity accelerate chemical degradation of solid oral medications. Antibiotics, epinephrine, and sedatives lose potency 30% faster in deep space than on Earth.</p>
    `
  }
};

// ========================================================
// 11. SBAR CLINICAL DOWNLINK & EVENT LOG
// ========================================================

function bindSbarDownlink() {
  ['btn-copy-sbar', 'btn-copy-sbar-guidance'].forEach(id => {
    const copyBtn = document.getElementById(id);
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const textarea = document.getElementById('sbar-text') || document.getElementById('sbar-text-guidance');
        if (textarea) {
          textarea.select();
          navigator.clipboard.writeText(textarea.value).then(() => {
            copyBtn.textContent = 'Copied to Clipboard!';
            setTimeout(() => copyBtn.textContent = 'Copy Downlink Report', 2000);
          });
        }
      });
    }
  });

  ['btn-generate-sbar', 'btn-generate-sbar-guidance'].forEach(id => {
    const transmitBtn = document.getElementById(id);
    if (transmitBtn) {
      transmitBtn.addEventListener('click', () => {
        const model = TRAJECTORY_MODELS[currentPhaseKey];
        const latencySec = model.owltSec;
        transmitBtn.disabled = true;
        transmitBtn.textContent = `Transmitting via DSN (${model.owltText} light delay)...`;

        setTimeout(() => {
          transmitBtn.disabled = false;
          transmitBtn.textContent = 'Transmit Downlink SBAR to CapCom';
          synth.playChime(true);
          logEvent('NOMINAL', `SBAR Clinical Downlink received by Houston Flight Surgeon.`);
          alert(`DOWNLINK TRANSMISSION COMPLETE: Deep Space Network confirmed delivery across ${Number(model.km).toLocaleString()} km.`);
        }, Math.min(latencySec * 1000, 4000));
      });
    }
  });

  ['btn-clear-logs', 'btn-clear-logs-guidance'].forEach(id => {
    const clearLogBtn = document.getElementById(id);
    if (clearLogBtn) {
      clearLogBtn.addEventListener('click', () => {
        ['event-log-list', 'event-log-list-guidance'].forEach(logId => {
          const el = document.getElementById(logId);
          if (el) el.innerHTML = '';
        });
        logEvent('NOMINAL', 'Audit log cleared.');
      });
    }
  });

  generateSbarReport();
}

function generateSbarReport() {
  const model = TRAJECTORY_MODELS[currentPhaseKey];
  const formattedKm = Number(model.km).toLocaleString('en-US') + ' km';

  let situationText = 'Telemetry nominal across cardiovascular, SANS, and behavioral domains.';
  const riskEl = document.getElementById('calc-fracture-risk') || document.getElementById('calc-fracture-risk-phys');
  const riskText = riskEl ? riskEl.textContent : '0.4% (Safe)';
  let assessmentText = `Cardiovascular tone stable (HR: ${currentAstro.hr} bpm, MAP: ${currentAstro.map} mmHg). ONSD: ${currentAstro.onsd} mm. Radiation: ${currentAstro.cumDose.toFixed(1)} mSv. Bone crushing fracture risk: ${riskText}.`;
  let recText = 'Maintain routine 2.5h ARED resistive exercise session, 2.5L oral hydration, and scheduled circadian light cycling.';

  if (currentCrisis === 'spe_solar_flare') {
    situationText = 'CRITICAL SPE: Severe Solar Particle Event in progress. Radiation dose elevated to 14.2 mSv/h.';
    assessmentText = `Acute radiation risk critical. Proton flux exceeds 12,000 pfu. Astronauts sequestered in central storm shelter.`;
    recText = 'Execute Protocol ALPHA and prepare Protocol ZETA (Immediate Emergency Landing Abort).';
  } else if (currentCrisis === 'bone_crush_gload') {
    situationText = 'SKELETAL HAZARD: High-G re-entry deceleration creating dangerous axial compressive load on demineralized spine.';
    assessmentText = `Current G-force: ${currentGload}G. Lumbar load exceeds osteopenic failure strength. Vertebral collapse risk acute.`;
    recText = 'Execute Protocol ETA: Recline anti-G couch to 75° transverse angle (+Gx) and pressurize pneumatic suit to 50 mmHg.';
  } else if (currentCrisis === 'isolation_psychosis') {
    situationText = 'BEHAVIORAL WARNING: Astronaut reports acute isolation detachment and Earth-out-of-view existential anxiety.';
    assessmentText = `Acoustic voice stress elevated to ${currentAstro.voiceStress}/100. Sensory deprivation high.`;
    recText = 'Initiate Protocol THETA: 20-minute Biophilic VR Nature session and asynchronous family voice buffer.';
  }

  const metEl = document.getElementById('hud-met');
  const metStr = metEl ? metEl.textContent : '042d 18h 44m 12s';

  const report = `[ASTRIS-BIO CLINICAL DOWNLINK TRANSMISSION]
MET: ${metStr} | DSN MADRID
PATIENT: ${currentAstro.name} (ID: ${currentAstro.id.toUpperCase()})
DISTANCE: ${formattedKm} (${model.au}) | 1-WAY COMM DELAY: ${model.owltText}

SITUATION:
${situationText}

BACKGROUND:
Long-duration space mission day 42. Active microgravity fluid shift. Lumbar bone loss: -${currentAstro.bmdLoss}%.

ASSESSMENT:
${assessmentText}

RECOMMENDATION:
${recText}`;

  ['sbar-text', 'sbar-text-guidance'].forEach(id => {
    const textarea = document.getElementById(id);
    if (textarea) textarea.value = report;
  });
}

function logEvent(severity, message) {
  const lists = ['event-log-list', 'event-log-list-guidance']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (lists.length === 0) return;

  const now = new Date();
  const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
  const badgeClass = severity === 'CRITICAL' ? 'tag-crit' : (severity === 'WARNING' ? 'tag-warn' : 'tag-nom');

  lists.forEach(list => {
    const entry = document.createElement('div');
    entry.className = `log-entry log-${severity.toLowerCase()}`;
    entry.innerHTML = `
      <span class="log-time font-mono">${timeStr}</span>
      <span class="log-badge-tag ${badgeClass}">${severity}</span>
      <span class="log-msg">${message}</span>
    `;
    list.insertBefore(entry, list.firstChild);
  });
}

// ========================================================
// 12. CRISIS SIMULATOR & EMERGENCY ALERTS
// ========================================================

function bindSimControls() {
  const triggerBtn = document.getElementById('btn-trigger-sim');
  const resetBtn = document.getElementById('btn-reset-nominal');
  const select = document.getElementById('sim-scenario-select');

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      const scenario = select.value;
      if (scenario && scenario !== 'nominal') triggerCrisisScenario(scenario);
    });
  }

  if (resetBtn) resetBtn.addEventListener('click', resetToNominal);

  const silenceBtn = document.getElementById('btn-silence-alarm');
  if (silenceBtn) silenceBtn.addEventListener('click', () => synth.stopCriticalKlaxon());

  const guidanceBtn = document.getElementById('btn-banner-guidance');
  if (guidanceBtn) guidanceBtn.addEventListener('click', () => switchTab('tab-guidance'));
}

function triggerCrisisScenario(scenarioKey) {
  currentCrisis = scenarioKey;
  synth.init();

  const banner = document.getElementById('emergency-banner');
  const titleEl = document.getElementById('emergency-title');
  const descEl = document.getElementById('emergency-desc');
  const globalText = document.getElementById('global-triage-text');
  banner.classList.remove('hidden');

  if (scenarioKey === 'spe_solar_flare') {
    document.body.className = 'theme-space alert-critical';
    globalText.textContent = 'CRITICAL SPE';
    titleEl.textContent = 'CRITICAL EMERGENCY: LETHAL SOLAR PARTICLE EVENT (SPE) SURGE';
    descEl.textContent = 'Extreme Coronal Mass Ejection detected! Proton flux exceeded 100 MeV threshold (>12,400 pfu). Dose rate surged to 14.2 mSv/h. Immediate shelter ingress or Earth return abort mandated.';

    currentAstro.status = 'CRITICAL';
    currentAstro.doseRate = 14.2;
    currentAstro.protonFlux = 12400.0;
    document.getElementById('dose-cmd').textContent = '14.20 mSv/h';
    document.getElementById('dose-hab').textContent = '5.80 mSv/h';
    document.getElementById('dose-shelter').textContent = '0.042 mSv/h';
    document.getElementById('ars-progress').style.width = '78%';
    document.getElementById('ars-alert-pill').textContent = 'PRODROMAL TOXICITY WARNING';
    document.getElementById('ars-alert-pill').className = 'badge-live-emergency';

    synth.startCriticalKlaxon();
    loadProtocol('spe_shelter');
    logEvent('CRITICAL', 'SOLAR PARTICLE SURGE: Dose rate 14.2 mSv/h. Immediate shelter ingress mandated.');
  }
  else if (scenarioKey === 'bone_crush_gload') {
    document.body.className = 'theme-space alert-critical';
    globalText.textContent = 'BONE CRUSH HAZARD';
    titleEl.textContent = 'CRITICAL HAZARD: BALLISTIC RE-ENTRY DECELERATION & BONE CRUSH';
    descEl.textContent = 'Re-entry G-load surged to 8.2G! Compressive axial loads on osteopenic lumbar vertebrae L1-L5 exceed 6.4 kN (Fracture collapse probability: 84%).';

    const slider = document.getElementById('gload-slider');
    slider.value = 8.2;
    currentGload = 8.2;
    updateBoneCrushCalculations();

    synth.startCriticalKlaxon();
    loadProtocol('bone_crush');
    switchTab('tab-physiology');
    logEvent('CRITICAL', 'DECELERATION HAZARD: Re-entry 8.2G axial compression hazard on weakened lumbar spine.');
  }
  else if (scenarioKey === 'isolation_psychosis') {
    document.body.className = 'theme-space alert-warning';
    globalText.textContent = 'ISOLATION CRISIS';
    titleEl.textContent = 'BEHAVIORAL WARNING: DEEP SPACE ISOLATION & EARTH-OUT-OF-VIEW STRESS';
    descEl.textContent = 'Astronaut exhibits acute confinement anxiety, emotional blunting, and communication withdrawal due to deep space isolation.';

    currentAstro.status = 'CAUTION';
    currentAstro.voiceStress = 68;
    document.getElementById('iso-voice-val').textContent = '68 / 100 (Severe Stress)';
    document.getElementById('iso-voice-val').className = 'im-val font-mono highlight-red';

    synth.playCautionBeep();
    loadProtocol('isolation_reset');
    switchTab('tab-behavioral');
    logEvent('WARNING', 'BEHAVIORAL CRISIS: Deep-space confinement stress and acoustic voice anomaly.');
  }
  else if (scenarioKey === 'hypoxia_event') {
    document.body.className = 'theme-space alert-critical';
    globalText.textContent = 'HYPOXIA CRISIS';
    titleEl.textContent = 'LIFE-CRITICAL: RAPID CABIN DEPRESSURIZATION / HYPOXIA';
    descEl.textContent = 'Cabin pO2 dropped to 14.2 kPa. SpO2 plummeted to 84.1%. Acute loss of consciousness hazard.';

    currentAstro.status = 'CRITICAL';
    currentAstro.spo2 = 84.1;
    currentAstro.hr = 132;
    currentAstro.resp = 28;
    document.getElementById('foot-po2').textContent = '14.2 kPa (HYPOXIC)';
    document.getElementById('foot-po2').className = 'fs-val font-mono highlight-red';

    synth.startCriticalKlaxon();
    loadProtocol('hypoxia_emergency');
    logEvent('CRITICAL', 'CABIN DEPRESSURIZATION: SpO2 dropped to 84.1%. 100% O2 masks required.');
  }
  else if (scenarioKey === 'sans_hypertension') {
    document.body.className = 'theme-space alert-warning';
    globalText.textContent = 'SANS EMERGENCY';
    titleEl.textContent = 'CLINICAL WARNING: ACUTE SANS & INTRACRANIAL PRESSURE SPIKE';
    descEl.textContent = 'Astronaut reports acute scotoma. ICP estimated at 24.8 mmHg; ONSD enlarged to 6.3 mm (severe papilledema risk).';

    currentAstro.status = 'CAUTION';
    currentAstro.icp = 24.8;
    currentAstro.onsd = 6.3;

    synth.playCautionBeep();
    loadProtocol('sans_decompression');
    logEvent('WARNING', 'SANS INTRACRANIAL SPIKE: ICP 24.8 mmHg, ONSD 6.3mm on ' + currentAstro.name);
  }
  else if (scenarioKey === 'cardio_arrhythmia') {
    document.body.className = 'theme-space alert-critical';
    globalText.textContent = 'CARDIO ARREST';
    titleEl.textContent = 'CRITICAL WARNING: VENTRICULAR TACHYCARDIA & SYNCOPE';
    descEl.textContent = 'Sustained wide-complex ventricular tachycardia at 168 BPM. Acute cardiovascular collapse.';

    currentAstro.status = 'CRITICAL';
    currentAstro.hr = 168;
    currentAstro.bp = '82/46';
    currentAstro.map = 58;

    synth.startCriticalKlaxon();
    loadProtocol('arrhythmia_syncope');
    logEvent('CRITICAL', 'VENTRICULAR TACHYCARDIA: HR 168 BPM on ' + currentAstro.name);
  }

  renderCrewRoster();
  updateVitalsDisplay();
  updateEhrDisplays();
  generateSbarReport();
}

function resetToNominal() {
  currentCrisis = 'nominal';
  synth.stopCriticalKlaxon();
  document.body.className = 'theme-space alert-nominal';

  document.getElementById('emergency-banner').classList.add('hidden');
  document.getElementById('global-triage-text').textContent = 'NOMINAL';

  // Restore baselines
  currentAstro.status = 'NOMINAL';
  currentAstro.hr = 72;
  currentAstro.bp = '118/76';
  currentAstro.map = 90;
  currentAstro.spo2 = 98.4;
  currentAstro.icp = 14.2;
  currentAstro.onsd = 5.1;
  currentAstro.doseRate = 0.038;
  currentAstro.protonFlux = 0.42;
  currentAstro.voiceStress = 14;

  const slider = document.getElementById('gload-slider');
  if (slider) slider.value = 1.0;
  currentGload = 1.0;
  updateBoneCrushCalculations();

  document.getElementById('iso-voice-val').textContent = '14 / 100 (Nominal)';
  document.getElementById('iso-voice-val').className = 'im-val font-mono highlight-green';

  document.getElementById('foot-po2').textContent = '21.3 kPa (21.0%)';
  document.getElementById('foot-po2').className = 'fs-val font-mono highlight-green';

  document.getElementById('dose-cmd').textContent = '0.038 mSv/h';
  document.getElementById('dose-hab').textContent = '0.024 mSv/h';
  document.getElementById('dose-shelter').textContent = '0.006 mSv/h';
  document.getElementById('ars-progress').style.width = '3.5%';
  document.getElementById('ars-alert-pill').textContent = 'SAFE BACKGROUND FLUX';
  document.getElementById('ars-alert-pill').className = 'badge-nominal';

  document.getElementById('sim-scenario-select').value = 'nominal';

  renderCrewRoster();
  updateVitalsDisplay();
  updateEhrDisplays();
  generateSbarReport();
  synth.playChime(true);

  logEvent('NOMINAL', 'Emergency resolved. Telemetry reset to nominal baseline.');
}

// ========================================================
// 13. UI TABS, ROSTER & APP INIT
// ========================================================

function renderCrewRoster() {
  const container = document.getElementById('roster-container');
  if (!container) return;
  container.innerHTML = '';

  CREW_DATA.forEach(astro => {
    const card = document.createElement('div');
    card.className = `crew-card ${astro.id === currentAstro.id ? 'active' : ''}`;
    card.setAttribute('data-id', astro.id);

    const statusDotClass = astro.status === 'CRITICAL' ? 'critical' : (astro.status === 'CAUTION' ? 'warning' : '');

    card.innerHTML = `
      <div class="crew-avatar">${astro.initials}</div>
      <div class="crew-details">
        <div class="crew-name-row">
          <span class="crew-name">${astro.name}</span>
          <span class="crew-status-dot ${statusDotClass}"></span>
        </div>
        <div class="crew-role">${astro.role}</div>
        <div class="crew-stats-strip font-mono">
          <span class="cs-item">HR: <strong>${astro.hr}</strong></span>
          <span class="cs-item">RAD: <strong>${astro.cumDose} mSv</strong></span>
          <span class="cs-item">BMD: <strong>-${astro.bmdLoss}%</strong></span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      selectAstronaut(astro.id);
    });

    container.appendChild(card);
  });
}

function selectAstronaut(id) {
  const found = CREW_DATA.find(a => a.id === id);
  if (!found) return;
  currentAstro = found;
  window.currentAstro = currentAstro;
  synth.playChime(true);

  renderCrewRoster();
  renderAllCrewMatrix();
  updateVitalsDisplay();
  updateBoneCrushCalculations();
  updateEhrDisplays();
  generateSbarReport();

  if (currentAstro.status === 'CRITICAL') {
    switchTab('tab-recovery');
    dispatchSpokenAdvice('critical_incapacitation');
    return;
  }

  appendDoctorMessage(`Telemetry switched to <strong>${currentAstro.name}</strong> (${currentAstro.role}). Reviewing electronic health records and baseline vitals now.`);
  logEvent('NOMINAL', `Telemetry display focused on ${currentAstro.name}`);
}

function renderAllCrewMatrix() {
  const container = document.getElementById('all-crew-matrix-container');
  if (!container) return;
  container.innerHTML = '';

  CREW_DATA.forEach(astro => {
    const card = document.createElement('div');
    const isFocus = astro.id === currentAstro.id;
    card.className = `ac-member-card ${isFocus ? 'active-focus' : ''}`;
    card.setAttribute('data-id', astro.id);

    const statusBadgeClass = astro.status === 'CRITICAL' ? 'tag-crit' : (astro.status === 'CAUTION' ? 'tag-warn' : 'tag-nom');

    card.innerHTML = `
      <div class="ac-card-top">
        <div class="ac-avatar">${astro.initials}</div>
        <div class="ac-info">
          <div class="ac-name font-mono">${astro.name}</div>
          <div class="ac-role">${astro.role}</div>
        </div>
        <span class="ac-status-badge ${statusBadgeClass}">${astro.status}</span>
      </div>
      <div class="ac-vitals-row font-mono">
        <div class="ac-vital"><span class="lbl">HR</span><span class="val highlight-green" id="ac-hr-${astro.id}">${astro.hr} bpm</span></div>
        <div class="ac-vital"><span class="lbl">BP</span><span class="val" id="ac-bp-${astro.id}">${astro.bp}</span></div>
        <div class="ac-vital"><span class="lbl">SpO2</span><span class="val highlight-cyan" id="ac-spo2-${astro.id}">${astro.spo2}%</span></div>
        <div class="ac-vital"><span class="lbl">ONSD</span><span class="val" id="ac-onsd-${astro.id}">${astro.onsd} mm</span></div>
        <div class="ac-vital"><span class="lbl">DOSE</span><span class="val highlight-yellow" id="ac-dose-${astro.id}">${astro.cumDose.toFixed(1)} mSv</span></div>
        <div class="ac-vital"><span class="lbl">BMD</span><span class="val highlight-orange" id="ac-bmd-${astro.id}">-${astro.bmdLoss}%</span></div>
      </div>
    `;

    card.addEventListener('click', () => {
      selectAstronaut(astro.id);
    });

    container.appendChild(card);
  });
}

function updateVitalsDisplay() {
  const updateText = (ids, val) => {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
  };

  updateText(['val-hr', 'val-hr-phys'], currentAstro.hr);
  updateText(['canvas-hr-val', 'canvas-hr-val-phys'], currentAstro.hr + ' BPM');

  updateText(['val-bp', 'val-bp-phys'], currentAstro.bp);
  updateText(['val-map', 'val-map-phys'], currentAstro.map);

  updateText(['val-spo2', 'val-spo2-phys'], currentAstro.spo2);
  updateText(['canvas-spo2-val', 'canvas-spo2-val-phys'], currentAstro.spo2 + ' %');

  updateText(['val-temp', 'val-temp-phys'], currentAstro.temp);
  updateText(['val-icp', 'val-icp-phys'], currentAstro.icp);
  updateText(['val-onsd', 'val-onsd-phys'], currentAstro.onsd);
  updateText(['val-resp', 'val-resp-phys'], currentAstro.resp);

  const doseEl = document.getElementById('val-dose-rate');
  if (doseEl) doseEl.textContent = currentAstro.doseRate.toFixed(3);
  const cumEl = document.getElementById('val-cum-dose');
  if (cumEl) cumEl.textContent = currentAstro.cumDose.toFixed(1);
  const protonEl = document.getElementById('val-proton-flux');
  if (protonEl) protonEl.textContent = currentAstro.protonFlux.toFixed(2);

  // Update Master Health Dashboard items
  const dashDose = document.getElementById('dash-doserate');
  if (dashDose) dashDose.textContent = currentAstro.doseRate.toFixed(3) + ' mSv/h';
  const dashCum = document.getElementById('dash-cumdose');
  if (dashCum) dashCum.textContent = currentAstro.cumDose.toFixed(1) + ' mSv';

  const dashArsFill = document.getElementById('dash-ars-fill');
  if (dashArsFill) {
    const pct = Math.min(100, Math.max(4, (currentAstro.cumDose / 350) * 100));
    dashArsFill.style.width = pct.toFixed(1) + '%';
  }
}

function tickTelemetry() {
  if (currentCrisis === 'nominal') {
    CREW_DATA.forEach(astro => {
      const hrJitter = (Math.random() - 0.5) * 1.8;
      astro.hr = Math.round(Math.max(astro.hrRange[0], Math.min(astro.hrRange[1], astro.hr + hrJitter)));
      astro.spo2 = +(98.0 + Math.random() * 1.5).toFixed(1);
      astro.cumDose = +(astro.cumDose + 0.00002).toFixed(4);

      const hrEl = document.getElementById(`ac-hr-${astro.id}`);
      if (hrEl) hrEl.textContent = `${astro.hr} bpm`;
      const spo2El = document.getElementById(`ac-spo2-${astro.id}`);
      if (spo2El) spo2El.textContent = `${astro.spo2}%`;
      const doseEl = document.getElementById(`ac-dose-${astro.id}`);
      if (doseEl) doseEl.textContent = `${astro.cumDose.toFixed(1)} mSv`;
    });
  }
  updateVitalsDisplay();
}

function bindShareApp() {
  const shareBtn = document.getElementById('btn-share-app');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    const shareUrl = window.location.href.startsWith('file:')
      ? 'https://astris-bio-health.netlify.app'
      : window.location.href;

    const shareData = {
      title: 'ASTRIS-Bio | NASA Space Apps Astronaut Health Monitor',
      text: 'ASTRIS-Bio: Autonomous Flight Surgeon & Health Monitoring System for NASA Space Apps Challenge 2026. Monitor all crew members in real-time!',
      url: shareUrl
    };

    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData);
        logEvent('NOMINAL', 'App link shared with team members.');
        return;
      } catch (e) {}
    }

    navigator.clipboard.writeText(shareUrl).then(() => {
      shareBtn.classList.add('copied');
      const textEl = document.getElementById('share-btn-text');
      if (textEl) textEl.textContent = 'LINK COPIED!';
      synth.playChime(true);
      logEvent('NOMINAL', 'Public share link copied to clipboard for all team members.');
      alert(`[ASTRIS-BIO · TEAM SHARING READY]\n\nLink copied to clipboard:\n${shareUrl}\n\nAvailable for ALL members on iPhone, Android phone, tablet, and Windows PC!`);
      setTimeout(() => {
        shareBtn.classList.remove('copied');
        if (textEl) textEl.textContent = 'SHARE WITH TEAM';
      }, 3000);
    }).catch(() => {
      prompt('Share this link with all team members:', shareUrl);
    });
  });
}

let metSeconds = 42 * 86400 + 18 * 3600 + 44 * 60 + 12;
function tickMissionClock() {
  metSeconds++;
  const days = Math.floor(metSeconds / 86400);
  const hours = Math.floor((metSeconds % 86400) / 3600);
  const minutes = Math.floor((metSeconds % 3600) / 60);
  const seconds = metSeconds % 60;

  const pad = n => String(n).padStart(2, '0');
  const str = `${String(days).padStart(3, '0')}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  
  const metEl = document.getElementById('hud-met');
  if (metEl) metEl.textContent = str;

  const utcEl = document.getElementById('foot-utc');
  if (utcEl) {
    const d = new Date();
    utcEl.textContent = d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  }
}

// [Duplicate bindNavigationTabs removed - primary definition in Section 14]

// ========================================================
// 12. ANATOMICAL ORGAN MAP & CLINICAL DATA
// ========================================================

const ORGAN_DATA = {
  sans: {
    icon: '👁️',
    title: 'SANS (Spaceflight-Associated Neuro-ocular Syndrome)',
    tier: 'HIGH PRIORITY RISK (HRP RED)',
    pathology: 'Loss of hydrostatic pressure gradients causes chronic cephalad fluid shift, elevated jugular venous congestion, decreased CSF drainage, leading to optic disc edema, globe flattening, choroidal folds, and hyperopic refractive shift.',
    metrics: [
      { lbl: 'ONSD Diameter:', val: '5.1 mm (Norm < 5.8)' },
      { lbl: 'Estimated ICP:', val: '14.2 mmHg' },
      { lbl: 'Refractive Shift:', val: '+0.25 Diopter' },
      { lbl: 'LBNP Countermeasure:', val: 'Scheduled 14:00 MET' }
    ],
    countermeasures: [
      'Lower Body Negative Pressure (LBNP) 20 mmHg for 2 hours daily.',
      'Venous Thigh Choke Cuffs during sleep to sequester lower-limb fluid.',
      'Fundoscopy & Optical Coherence Tomography (OCT) every 14 days.',
      'Acetazolamide protocol ready if acute papilledema occurs.'
    ]
  },
  vestibular: {
    icon: '🧠',
    title: 'Vestibular & Neuro-Sensory Adaptation (Space Motion Sickness)',
    tier: 'TACTICAL MISSION RISK (HRP YELLOW)',
    pathology: 'Otolith-ocular reflex discordance in microgravity. Absence of gravitational pull on utricle and saccule leads to neuro-sensory conflict, disorientation, ataxia, and acute Space Motion Sickness (SMS) during initial 72 hours and planetary landing.',
    metrics: [
      { lbl: 'Vestibular Ataxia Score:', val: 'Grade 1 (Mild)' },
      { lbl: 'Nystagmus Slow-Phase:', val: '< 2°/sec (Nominal)' },
      { lbl: 'SMS Susceptibility:', val: 'Low (Day 48 Post-Adaptation)' },
      { lbl: 'Promethazine Status:', val: '0/25 mg Taken (Standby)' }
    ],
    countermeasures: [
      'Oral Promethazine 25mg IM/oral available for severe acute neuro-vestibular nausea.',
      'Pre-landing head movement habituation exercises in microgravity.',
      'Visual horizon anchoring and active tactile vestibular feedback suits.',
      'Post-touchdown assisted egress protocol to prevent falls during Martian/Terrestrial re-adaptation.'
    ]
  },
  cardio: {
    icon: '❤️',
    title: 'Cardiovascular Deconditioning & Cephalad Fluid Shift',
    tier: 'PRIMARY LIFE-SUPPORT RISK (HRP ORANGE)',
    pathology: 'Immediate upward cephalad fluid migration shifts ~2 liters of interstitial fluids from lower limbs into torso and head. Causes initial central hypervolemia, triggering diuresis and ~15-20% plasma volume reduction, leading to left ventricular myocardial atrophy and post-flight orthostatic intolerance.',
    metrics: [
      { lbl: 'Stroke Volume Index:', val: '42 mL/m² (Mildly reduced)' },
      { lbl: 'Plasma Volume Deficit:', val: '-14% from Pre-Flight Baseline' },
      { lbl: 'Left Ventricular Mass:', val: '94% of Baseline (Myocardial Sparing)' },
      { lbl: 'ARED High-Intensity Load:', val: '180 lbs Deadlift Achieved' }
    ],
    countermeasures: [
      'Daily 2.5-hour countermeasure regimen: ARED resistive exercise + T2 treadmill.',
      'Fluid and electrolyte loading protocol (0.9% NaCl saline + 1L water) 2 hours prior to re-entry.',
      'Active lower-body compression garments (30-40 mmHg gradient) during G-transitions.',
      'Intravenous fluid restoration capability (Colloid/Crystalloid) stocked in clinical bay.'
    ]
  },
  pulmonary: {
    icon: '🫁',
    title: 'Pulmonary Dynamics & Ventilation-Perfusion Matching',
    tier: 'HABITAT ENVIRONMENTAL RISK (HRP GREEN)',
    pathology: 'Microgravity eliminates gravity-dependent ventilation-perfusion (V/Q) gradients across apical and basilar lung zones, improving regional gas exchange efficiency. However, lack of convective air circulation in habitat pockets creates local hypercapnia (CO2 pooling) risks and increased airborne particulate inhalation.',
    metrics: [
      { lbl: 'Arterial SpO2:', val: '98.4% (Nominal)' },
      { lbl: 'End-Tidal CO2 (EtCO2):', val: '38 mmHg (Within Limits)' },
      { lbl: 'Ambient Habitat ppCO2:', val: '2.1 mmHg (Goal < 3.0 mmHg)' },
      { lbl: 'Peak Expiratory Flow:', val: '520 L/min (Nominal)' }
    ],
    countermeasures: [
      'Active cabin ventilation fans maintained at > 0.15 m/s air velocity in sleeping quarters.',
      'Dual amine scrubber beds for continuous cabin CO2 extraction.',
      '100% O2 positive-pressure mask deployment ready for acute hypoxia or depressurization.',
      'Spirometry and forced vital capacity checks performed monthly.'
    ]
  },
  immune: {
    icon: '🛡️',
    title: 'Immune Dysregulation & Latent Viral Reactivation',
    tier: 'CHRONIC MISSION RISK (HRP RED)',
    pathology: 'Synergistic stress from chronic cosmic radiation (GCR), microgravity, circadian disruption, and isolation causes T-cell suppression, reduced NK-cell cytotoxicity, altered cytokine cascades, and frequent subclinical reactivation of latent herpesviruses (EBV, CMV, VZV).',
    metrics: [
      { lbl: 'CD4/CD8 Ratio:', val: '1.4 (Slightly Reduced)' },
      { lbl: 'Latent EBV Shedding:', val: 'Negative / Below Detection Limit' },
      { lbl: 'Salivary Cortisol:', val: '0.24 ug/dL (Circadian Peak Normal)' },
      { lbl: 'High-Sensitivity CRP:', val: '0.8 mg/L (Normal Systemic Index)' }
    ],
    countermeasures: [
      'Prophylactic acyclovir / valacyclovir regimen if viral shedding is detected.',
      'Nutritional immunomodulation: Vitamin D3 (2000 IU/day), Omega-3 EPA/DHA, and Zinc.',
      'Antimicrobial surface wiping protocols and HEPA microbial filtration.',
      'Real-time biomarker monitoring via blood/saliva multiplex PCR cartridge.'
    ]
  },
  spine: {
    icon: '🦴',
    title: 'Microgravity Spinal Elongation & Bone Crushing Vulnerability',
    tier: 'DECELERATION TRAUMA RISK (HRP RED)',
    pathology: 'Spinal decompression in zero-G causes intervertebral disc hyper-hydration and expansion (+4 to 7 cm astronaut height increase), accompanied by -1.5% lumbar vertebral trabecular bone loss per month. During planetary re-entry deceleration, this drastically lowers bone fracture thresholds under axial compressive loading.',
    metrics: [
      { lbl: 'Lumbar L1-L4 BMD Loss:', val: '-4.2% Total Mission Loss' },
      { lbl: 'Spinal Height Elongation:', val: '+5.4 cm from Baseline' },
      { lbl: 'Compressive Ultimate Limit:', val: '4.8 kN (Reduced from 6.0 kN)' },
      { lbl: 'Anti-G Couch Tilt Angle:', val: '75° Transverse Orientation' }
    ],
    countermeasures: [
      'Bisphosphonates (Alendronate / Zoledronic Acid) administered pre- and mid-mission.',
      'High-impact axial loading via ARED heel-striking and squat protocols.',
      'Strict 75° transverse couch recline (+Gx) during re-entry to redirect loads away from spine.',
      'Dynamic pneumatic torso splints and post-landing rigid lumbar orthosis support.'
    ]
  },
  muscles: {
    icon: '💪',
    title: 'Musculoskeletal Deconditioning & Sarcopenia',
    tier: 'FUNCTIONAL EGRESS RISK (HRP ORANGE)',
    pathology: 'Absence of postural ground reaction forces triggers rapid atrophy of antigravity postural muscles (soleus, gastrocnemius, quadriceps, erector spinae) with transition of slow-twitch Type I oxidative fibers to fatigable fast-twitch Type IIx fibers.',
    metrics: [
      { lbl: 'Calf Muscle Cross-Section:', val: '-8.5% Volume Reduction' },
      { lbl: 'Isometric Knee Extension:', val: '88% of Baseline Strength' },
      { lbl: 'Daily Protein Intake:', val: '1.4 g/kg Body Mass' },
      { lbl: 'Caloric Intake Target:', val: '2,850 kcal/day' }
    ],
    countermeasures: [
      'Daily 45-minute cycle ergometer sessions with interval sprints.',
      'Eccentric overload exercises via flywheel resistive resistance device.',
      'Essential amino acid supplementation with Branched-Chain Amino Acids (BCAA).',
      'Electromyostimulation (EMS) neuromuscular pulsing suits during sleep.'
    ]
  }
};

function bindAnatomicalMap() {
  const nodes = document.querySelectorAll('.organ-node');
  nodes.forEach(node => {
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      const organKey = node.getAttribute('data-organ');
      selectOrgan(organKey);
    });
  });
}

function selectOrgan(key) {
  const data = ORGAN_DATA[key];
  if (!data) return;

  document.querySelectorAll('.organ-node').forEach(n => {
    n.classList.toggle('active-node', n.getAttribute('data-organ') === key);
  });

  const iconEl = document.getElementById('od-icon');
  const titleEl = document.getElementById('od-title');
  const tierEl = document.getElementById('od-tier');
  const pathEl = document.getElementById('od-pathology');
  const listEl = document.getElementById('od-countermeasures');

  if (iconEl) iconEl.textContent = data.icon;
  if (titleEl) titleEl.textContent = data.title;
  if (tierEl) tierEl.textContent = data.tier;
  if (pathEl) pathEl.textContent = data.pathology;

  for (let i = 1; i <= 4; i++) {
    const valEl = document.getElementById(`od-val${i}`);
    if (valEl && data.metrics[i - 1]) {
      valEl.textContent = data.metrics[i - 1].val;
      const lblEl = valEl.previousElementSibling;
      if (lblEl) lblEl.textContent = data.metrics[i - 1].lbl;
    }
  }

  if (listEl) {
    listEl.innerHTML = '';
    data.countermeasures.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      listEl.appendChild(li);
    });
  }

  try {
    if (audioEnabled && synth) synth.playBreathTone(520);
  } catch (e) {}
}
window.selectOrgan = selectOrgan;

// ========================================================
// 13. RADIATION TISSUE LAYERS & COMPARTMENT SHIELDING
// ========================================================

function bindTissueLayers() {
  const layerItems = document.querySelectorAll('.layer-item');
  layerItems.forEach(item => {
    item.addEventListener('click', () => {
      layerItems.forEach(l => l.classList.remove('active-layer'));
      item.classList.add('active-layer');

      const layerKey = item.getAttribute('data-layer');
      const title = item.querySelector('.layer-title') ? item.querySelector('.layer-title').textContent : layerKey;
      const dose = item.querySelector('.layer-dose') ? item.querySelector('.layer-dose').textContent : '';

      logEvent('DOSIMETRY', `Tissue depth inspection: [${title}] current ion penetration dose ${dose}.`);
      try {
        if (audioEnabled && synth) synth.playBreathTone(440);
      } catch (e) {}
    });
  });
}

function bindCompartmentCards() {
  const comps = document.querySelectorAll('.compartment');
  comps.forEach(comp => {
    comp.addEventListener('click', () => {
      comps.forEach(c => c.classList.remove('active-comp'));
      comp.classList.add('active-comp');

      const compKey = comp.getAttribute('data-comp');
      const badge = comp.querySelector('.comp-badge') ? comp.querySelector('.comp-badge').textContent : compKey;
      const shield = comp.querySelector('.comp-shield') ? comp.querySelector('.comp-shield').textContent : '';

      logEvent('NOMINAL', `Spacecraft shielding status: ${badge} | ${shield}.`);
      try {
        if (audioEnabled && synth) synth.playChime(true);
      } catch (e) {}
    });
  });
}

// ========================================================
// 14. TAB NAVIGATION & RESOURCE BROWSER ENGINE
// ========================================================

function bindNavigationTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-tab');
      switchTab(targetId);
    });
  });

  const spaceappsBtn = document.getElementById('btn-open-spaceapps');
  if (spaceappsBtn) {
    spaceappsBtn.addEventListener('click', () => {
      switchTab('tab-resources');
      selectResourceTab('res-spaceapps');
    });
  }
}

function switchTab(targetId) {
  if (!targetId) return;

  try {
    if (typeof audioEnabled !== 'undefined' && audioEnabled && window.synth) {
      synth.init();
      synth.playChime(true);
    }
  } catch (e) {
    console.warn("Audio chime suppressed:", e);
  }

  // 1. Update navigation tabs
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(t => {
    const isTarget = t.getAttribute('data-tab') === targetId;
    t.classList.toggle('active', isTarget);
    t.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // 2. Update tab panes with forced style override to defeat any CSS specificity
  const panes = document.querySelectorAll('.tab-pane');
  panes.forEach(p => {
    const isTarget = p.id === targetId;
    p.classList.toggle('active', isTarget);
    if (isTarget) {
      p.style.setProperty('display', 'block', 'important');
    } else {
      p.style.setProperty('display', 'none', 'important');
    }
  });

  // 3. Dynamic sub-engine hooks when opening specific tabs
  try {
    if (targetId === 'tab-behavioral') {
      if (window.pvt && typeof window.pvt.renderHypnogram === 'function') {
        window.pvt.renderHypnogram();
      }
    } else if (targetId === 'tab-trajectory') {
      if (typeof renderTrajectoryCanvas === 'function') {
        renderTrajectoryCanvas();
      }
    } else if (targetId === 'tab-guidance') {
      if (typeof loadProtocol === 'function' && typeof activeProtocolKey !== 'undefined') {
        loadProtocol(activeProtocolKey);
      }
    } else if (targetId === 'tab-resources') {
      const activeRes = document.querySelector('.rs-nav-item.active');
      const key = activeRes ? activeRes.getAttribute('data-res') : 'res-spaceapps';
      if (typeof loadResourceArticle === 'function') {
        loadResourceArticle(key);
      }
    }
  } catch (hookErr) {
    console.warn("Tab hook error:", hookErr);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.switchTab = switchTab;

function selectResourceTab(resKey) {
  const items = document.querySelectorAll('.rs-nav-item');
  items.forEach(i => {
    const isTarget = i.getAttribute('data-res') === resKey;
    i.classList.toggle('active', isTarget);
  });
  loadResourceArticle(resKey);
}
window.selectResourceTab = selectResourceTab;

function bindResourceBrowser() {
  const items = document.querySelectorAll('.rs-nav-item');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const resKey = item.getAttribute('data-res');
      selectResourceTab(resKey);
    });
  });

  loadResourceArticle('res-spaceapps');
}

function loadResourceArticle(key) {
  const article = RESOURCE_DATABASE[key];
  if (!article) return;

  const contentArea = document.getElementById('resource-content-area');
  if (!contentArea) return;

  contentArea.innerHTML = `
    <div class="res-article">
      <div class="res-header">
        <span class="badge-accent">NASA SPACE APPS CHALLENGE 2026 ARCHITECTURE</span>
        <h2 class="res-title">${article.title}</h2>
        <div class="res-meta font-mono">${article.meta}</div>
      </div>
      <div class="res-body">
        ${article.html}
      </div>
    </div>
  `;
}
window.loadResourceArticle = loadResourceArticle;

function bindAudioToggle() {
  const btn = document.getElementById('btn-toggle-sound');
  const text = document.getElementById('sound-status-text');

  if (btn) {
    btn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      btn.classList.toggle('active', audioEnabled);
      if (text) text.textContent = audioEnabled ? 'AUDIO ON' : 'AUDIO MUTED';
      if (!audioEnabled && synth) synth.stopCriticalKlaxon();
    });
  }
}

// ========================================================
// PALE BLUE DOT CANVAS RENDERER (DASHBOARD)
// ========================================================
function initPaleBlueDotDashboard() {
  const canvas = document.getElementById('pale-dot-canvas-dash');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  function draw() {
    ctx.fillStyle = '#020409';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    const seedStars = [
      [15, 12], [45, 42], [70, 18], [95, 52], [120, 10],
      [160, 28], [195, 48], [225, 15], [240, 58], [30, 58]
    ];
    seedStars.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 0.7, 0, Math.PI * 2);
      ctx.fill();
    });

    const rayGrad = ctx.createLinearGradient(0, 0, w, h);
    rayGrad.addColorStop(0, 'rgba(255, 220, 150, 0.0)');
    rayGrad.addColorStop(0.55, 'rgba(255, 200, 120, 0.08)');
    rayGrad.addColorStop(0.65, 'rgba(255, 180, 100, 0.15)');
    rayGrad.addColorStop(0.75, 'rgba(255, 200, 120, 0.06)');
    rayGrad.addColorStop(1, 'rgba(255, 220, 150, 0.0)');

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(110, 0);
    ctx.lineTo(190, 0);
    ctx.lineTo(250, h);
    ctx.lineTo(170, h);
    ctx.closePath();
    ctx.fillStyle = rayGrad;
    ctx.fill();
    ctx.restore();

    const earthX = 185;
    const earthY = 32;

    const earthGlow = ctx.createRadialGradient(earthX, earthY, 0, earthX, earthY, 12);
    earthGlow.addColorStop(0, 'rgba(0, 240, 255, 0.85)');
    earthGlow.addColorStop(0.4, 'rgba(0, 180, 255, 0.35)');
    earthGlow.addColorStop(1, 'rgba(0, 100, 255, 0)');

    ctx.fillStyle = earthGlow;
    ctx.beginPath();
    ctx.arc(earthX, earthY, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#c5f7ff';
    ctx.beginPath();
    ctx.arc(earthX, earthY, 1.8, 0, Math.PI * 2);
    ctx.fill();

    const now = performance.now();
    const pulseR = 5 + Math.sin(now * 0.003) * 1.5;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.55)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(earthX, earthY, pulseR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(earthX - 4, earthY - 4);
    ctx.lineTo(earthX - 25, earthY - 14);
    ctx.lineTo(earthX - 60, earthY - 14);
    ctx.stroke();

    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillStyle = '#00f0ff';
    ctx.fillText('EARTH (0.12 px)', earthX - 110, earthY - 11);

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}


// ========================================================
// INITIALIZE APPLICATION ON LOAD
// ========================================================
window.addEventListener('DOMContentLoaded', () => {
  initHandsFreeVoiceRecognition();
  renderCrewRoster();
  bindDoctorClinic();
  bindNavigationTabs();
  bindAnatomicalMap();
  bindTissueLayers();
  bindCompartmentCards();
  bindSimControls();
  bindAudioToggle();
  bindBoneCrushCalculator();
  bindTrajectoryModule();
  bindIsolationTools();
  bindProtocolEngine();
  bindResourceBrowser();
  bindSbarDownlink();
  initPaleBlueDotDashboard();
  renderAllCrewMatrix();
  bindShareApp();
  bindOrbitalLaunchControls();

  window.waveform = new WaveformEngine();
  window.pvt = new PVTEngine();

  setInterval(tickTelemetry, 1500);
  setInterval(tickMissionClock, 1000);

  logEvent('NOMINAL', 'ASTRIS-Bio Clinical Health Suite & Doctor Clinic online.');
});
