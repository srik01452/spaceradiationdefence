// ========================================================
// ASTRIS-BIO: ORBITAL LAUNCH & FLIGHT DECK ENGINE
// ========================================================

let currentFlightRegime = 'orbit';
let orbitalAnimationId = null;
let orbitAngle = 0;

function bindOrbitalLaunchControls() {
  const launchBtns = ['btn-trigger-launch', 'btn-strip-launch'];
  launchBtns.forEach(id => {
    const b = document.getElementById(id);
    if (b) {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        triggerOrbitalLaunchSequence();
      });
    }
  });

  const engageBtn = document.getElementById('btn-engage-dashboard');
  const overlay = document.getElementById('orbital-launch-overlay');
  if (engageBtn) {
    engageBtn.addEventListener('click', () => {
      if (overlay) overlay.classList.add('hidden');
      if (window.synth) synth.playChime(true);
      if (window.logEvent) logEvent('NOMINAL', 'Orbital health console fully engaged.');
    });
  }
}

function triggerOrbitalLaunchSequence() {
  const overlay = document.getElementById('orbital-launch-overlay');
  if (!overlay) return;

  overlay.classList.remove('hidden');
  if (window.synth) {
    synth.init();
    synth.playChime(true);
  }

  const countdownEl = document.getElementById('olo-countdown');
  const streamEl = document.getElementById('olo-status-stream');
  const progressFill = document.getElementById('olo-progress-fill');

  let secondsLeft = 3;
  if (countdownEl) countdownEl.textContent = 'T - 00:00:03';
  if (progressFill) progressFill.style.width = '20%';

  if (streamEl) {
    streamEl.innerHTML = `
      <div class="olo-stream-line">[MCC-H] Ignition sequence start. Liquid hydrogen / LOX flow nominal.</div>
      <div class="olo-stream-line highlight-cyan">[MCC-H] All 6 Scientist telemetry biosensors synced at 1000 Hz.</div>
    `;
  }

  const timer = setInterval(() => {
    secondsLeft--;
    if (countdownEl) countdownEl.textContent = 'T - 00:00:0' + secondsLeft;
    if (progressFill) progressFill.style.width = Math.min(100, 20 + (3 - secondsLeft) * 28) + '%';

    if (secondsLeft === 2 && streamEl) {
      streamEl.innerHTML += '<div class="olo-stream-line">[MCC-H] Maximum Dynamic Pressure (Max-Q). Transverse G-force: 3.8G.</div>';
      streamEl.scrollTop = streamEl.scrollHeight;
      if (window.synth) synth.playHeartbeat();
    } else if (secondsLeft === 1 && streamEl) {
      streamEl.innerHTML += '<div class="olo-stream-line">[MCC-H] Staging complete. Orbital insertion burn in progress (Δv: 1,840 m/s).</div>';
      streamEl.scrollTop = streamEl.scrollHeight;
    } else if (secondsLeft <= 0) {
      clearInterval(timer);
      if (countdownEl) countdownEl.textContent = 'T + 00:08:42 (ORBIT)';
      if (progressFill) progressFill.style.width = '100%';
      if (streamEl) {
        streamEl.innerHTML += '<div class="olo-stream-line highlight-green"><strong>[MCC-H] SECO CONFIRMED. ORBITAL INSERTION ACHIEVED. MICROGRAVITY FLOAT NOMINAL.</strong></div>';
        streamEl.scrollTop = streamEl.scrollHeight;
      }
      if (window.synth) synth.playChime(true);
      if (window.logEvent) logEvent('NOMINAL', 'Orbital Launch Sequence Completed: LEO Microgravity Float Achieved.');

      setTimeout(() => {
        if (overlay && !overlay.classList.contains('hidden')) {
          overlay.classList.add('hidden');
        }
      }, 1800);
    }
  }, 900);
}

function setFlightRegime(regime) {
  currentFlightRegime = regime;
  document.querySelectorAll('.btn-regime').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-regime') === regime);
  });

  const regimeEl = document.getElementById('ofd-regime');
  const altVelEl = document.getElementById('ofd-alt-vel');
  const gVectorEl = document.getElementById('ofd-g-vector');
  const saaEl = document.getElementById('ofd-saa-status');

  if (window.synth) synth.playChime(true);

  if (regime === 'ascent') {
    if (regimeEl) regimeEl.textContent = 'POWERED LAUNCH ASCENT (3.8G MAX-Q)';
    if (altVelEl) altVelEl.textContent = '148.0 km · 3.42 km/s (Mach 10.4)';
    if (gVectorEl) gVectorEl.textContent = '3.80G (Axial Compressive)';
    if (saaEl) saaEl.textContent = 'SUB-ORBITAL TRAJECTORY';

    if (window.currentGload !== undefined) window.currentGload = 3.8;
    if (window.currentAstro) {
      currentAstro.hr = Math.min(140, currentAstro.hr + 35);
      currentAstro.bp = '142/90';
      currentAstro.resp = 22;
    }
    if (window.updateBoneCrushCalculations) updateBoneCrushCalculations();
    if (window.updateVitalsDisplay) updateVitalsDisplay();
    if (window.appendDoctorMessage) appendDoctorMessage('Flight Surgeon Alert: Powered launch ascent phase. Astronaut heart rate elevated to ' + currentAstro.hr + ' BPM. Anti-G muscular strain maneuver active.');
    if (window.logEvent) logEvent('WARNING', 'Flight Regime: Powered Launch Ascent (3.8G). High cardiovascular acceleration load.');

  } else if (regime === 'reentry') {
    if (regimeEl) regimeEl.textContent = 'BALLISTIC RE-ENTRY (6.8G ENTRY CORRIDOR)';
    if (altVelEl) altVelEl.textContent = '68.5 km · 7.20 km/s (Ionization)';
    if (gVectorEl) gVectorEl.textContent = '6.80G (Extreme Bone Strain)';
    if (saaEl) saaEl.textContent = 'PLASMA BLACKOUT (LOS)';

    if (window.currentGload !== undefined) window.currentGload = 6.8;
    if (window.currentAstro) {
      currentAstro.hr = Math.min(155, currentAstro.hr + 50);
      currentAstro.bp = '158/98';
      currentAstro.resp = 26;
    }
    if (window.updateBoneCrushCalculations) updateBoneCrushCalculations();
    if (window.updateVitalsDisplay) updateVitalsDisplay();
    if (window.appendDoctorMessage) appendDoctorMessage('CRITICAL FLIGHT SURGEON DIRECTIVE: Atmospheric entry deceleration at 6.8G. Axial compressive load on demineralized lumbar spine is critical. Lock anti-G contour couch to 75° transverse angle (+Gx).');
    if (window.logEvent) logEvent('CRITICAL', 'Flight Regime: Atmospheric Re-Entry (6.8G). High skeletal fracture risk.');

  } else {
    // Nominal Orbit
    if (regimeEl) regimeEl.textContent = 'ORBITAL CRUISE (0.0G FREE FLOAT)';
    if (altVelEl) altVelEl.textContent = '418.4 km · 7.66 km/s (Mach 23.4)';
    if (gVectorEl) gVectorEl.textContent = '0.00001g (Micro-G Float)';
    if (saaEl) saaEl.textContent = 'SAA CLEAR (0.038 mSv/h)';

    if (window.currentGload !== undefined) window.currentGload = 1.0;
    if (window.currentAstro) {
      currentAstro.hr = currentAstro.hrRange ? currentAstro.hrRange[0] + 4 : 72;
      currentAstro.bp = currentAstro.id === 'astro-02' ? '124/82' : '118/76';
      currentAstro.resp = 14;
    }
    if (window.updateBoneCrushCalculations) updateBoneCrushCalculations();
    if (window.updateVitalsDisplay) updateVitalsDisplay();
    if (window.appendDoctorMessage) appendDoctorMessage('Flight Surgeon: Spacecraft established in stable orbital cruise at 418 km. Microgravity cephalad fluid shifts active. Daily 150-min ARED workout required.');
    if (window.logEvent) logEvent('NOMINAL', 'Flight Regime: Orbital Cruise established at 418 km altitude.');
  }
}

function toggleOrbitalGroundMap() {
  const card = document.getElementById('card-orbital-ground-map');
  if (!card) return;
  const isHidden = card.style.display === 'none' || !card.style.display;
  card.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    drawOrbitalGroundMap();
  }
}

function drawOrbitalGroundMap() {
  const canvas = document.getElementById('orbital-ground-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  function render() {
    const mapCard = document.getElementById('card-orbital-ground-map');
    if (!mapCard || mapCard.style.display === 'none') return;

    ctx.fillStyle = '#030814';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(70, 110, 160, 0.18)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(20, 45, 90, 0.35)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(120, 50); ctx.lineTo(240, 50); ctx.lineTo(230, 110); ctx.lineTo(190, 120); ctx.lineTo(130, 80); ctx.closePath();
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(210, 130); ctx.lineTo(260, 150); ctx.lineTo(240, 220); ctx.lineTo(210, 210); ctx.closePath();
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(420, 45); ctx.lineTo(480, 50); ctx.lineTo(470, 90); ctx.lineTo(430, 90); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(430, 100); ctx.lineTo(490, 110); ctx.lineTo(470, 200); ctx.lineTo(420, 140); ctx.closePath();
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(520, 40); ctx.lineTo(720, 60); ctx.lineTo(700, 120); ctx.lineTo(540, 110); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(680, 160); ctx.lineTo(760, 170); ctx.lineTo(740, 220); ctx.lineTo(670, 200); ctx.closePath();
    ctx.fill(); ctx.stroke();

    const saaX = 280;
    const saaY = 165;
    const saaGrad = ctx.createRadialGradient(saaX, saaY, 0, saaX, saaY, 45);
    saaGrad.addColorStop(0, 'rgba(255, 145, 0, 0.5)');
    saaGrad.addColorStop(0.6, 'rgba(255, 23, 68, 0.25)');
    saaGrad.addColorStop(1, 'rgba(255, 23, 68, 0)');
    ctx.fillStyle = saaGrad;
    ctx.beginPath();
    ctx.arc(saaX, saaY, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff9100';
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillText('SAA RADIATION ANOMALY', saaX - 45, saaY - 20);

    const stations = [
      { name: 'GOLDSTONE 🇺🇸', x: 160, y: 80 },
      { name: 'MADRID 🇪🇸', x: 435, y: 82 },
      { name: 'CANBERRA 🇦🇺', x: 740, y: 195 }
    ];

    stations.forEach(st => {
      ctx.fillStyle = '#00e676';
      ctx.beginPath();
      ctx.arc(st.x, st.y, 3, 0, Math.PI * 2);
      ctx.fill();

      const pulse = (performance.now() * 0.003) % 1;
      ctx.strokeStyle = `rgba(0, 230, 118, ${1 - pulse})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(st.x, st.y, 4 + pulse * 14, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#c7d8ed';
      ctx.font = '7.5px "JetBrains Mono", monospace';
      ctx.fillText(st.name, st.x + 6, st.y + 2);
    });

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    for (let x = 0; x < w; x += 4) {
      const y = h / 2 + Math.sin((x / w) * Math.PI * 2 + 0.5) * (h * 0.38);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    orbitAngle = (orbitAngle + 0.003) % (Math.PI * 2);
    const scX = (orbitAngle / (Math.PI * 2)) * w;
    const scY = h / 2 + Math.sin((scX / w) * Math.PI * 2 + 0.5) * (h * 0.38);

    let nearestSt = stations[0];
    let minDist = 999999;
    stations.forEach(st => {
      const d = Math.hypot(st.x - scX, st.y - scY);
      if (d < minDist) { minDist = d; nearestSt = st; }
    });

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(scX, scY);
    ctx.lineTo(nearestSt.x, nearestSt.y);
    ctx.stroke();

    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.arc(scX, scY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(scX, scY, 9, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(6, 14, 30, 0.9)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
    ctx.lineWidth = 1;
    const boxW = 150;
    const boxH = 34;
    const boxX = Math.min(w - boxW - 10, Math.max(10, scX - 70));
    const boxY = scY > h / 2 ? scY - boxH - 12 : scY + 14;

    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px "JetBrains Mono", monospace';
    ctx.fillText('ASTRIS (SC-01) · 418.4 km', boxX + 6, boxY + 12);
    ctx.fillStyle = '#00e676';
    ctx.font = '7.5px "JetBrains Mono", monospace';
    const astroName = window.currentAstro ? currentAstro.name : 'Crew';
    const astroHr = window.currentAstro ? currentAstro.hr : 72;
    const astroSpo2 = window.currentAstro ? currentAstro.spo2 : 98.4;
    ctx.fillText(astroName + ': ' + astroHr + ' BPM | ' + astroSpo2 + '%', boxX + 6, boxY + 24);

    orbitalAnimationId = requestAnimationFrame(render);
  }

  if (orbitalAnimationId) cancelAnimationFrame(orbitalAnimationId);
  orbitalAnimationId = requestAnimationFrame(render);
}

window.triggerOrbitalLaunchSequence = triggerOrbitalLaunchSequence;
window.setFlightRegime = setFlightRegime;
window.toggleOrbitalGroundMap = toggleOrbitalGroundMap;

window.addEventListener('DOMContentLoaded', () => {
  bindOrbitalLaunchControls();
});
