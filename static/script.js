/* MalariaScope AI — Frontend Logic */

let selectedSingleFile = null;
let selectedBatchFiles = [];

// ===========================
// TAB SWITCHING
// ===========================
function switchTab(name, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('tab-' + name).classList.add('active');

    if (name === 'history') loadHistory();
}

// ===========================
// DRAG AND DROP
// ===========================
const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleSingleFileObj(files[0]);
    }
});

// ===========================
// SINGLE FILE HANDLER
// ===========================
function handleSingleFile(input) {
    if (input.files.length === 0) return;
    handleSingleFileObj(input.files[0]);
}

function handleSingleFileObj(file) {
    selectedSingleFile = file;
    const reader = new FileReader();

    reader.onload = (e) => {
        document.getElementById('singlePreview').src = e.target.result;
        document.getElementById('previewMeta').textContent =
            `${file.name}  ·  ${(file.size / 1024).toFixed(1)} KB  ·  ${file.type || 'image'}`;
        document.getElementById('singlePreviewWrap').classList.remove('hidden');
        document.getElementById('analyzeBtn').disabled = false;
    };

    reader.readAsDataURL(file);
}

// ===========================
// SINGLE ANALYSIS
// ===========================
async function analyzeSingle() {
    if (!selectedSingleFile) return;

    const formData = new FormData();
    formData.append('image', selectedSingleFile);

    showLoading(true);
    showResult(false);
    animateLoadingSteps();

    try {
        const res = await fetch('/predict', {
            method: 'POST',
            body: formData
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        showLoading(false);
        renderResult(data);
        updateHeaderCount();

    } catch (err) {
        showLoading(false);
        alert('Analysis failed: ' + err.message);
    }
}

// ===========================
// LOADING STATE
// ===========================
function showLoading(state) {
    document.getElementById('loadingState').classList.toggle('hidden', !state);
    document.getElementById('emptyState').classList.add('hidden');
    document.getElementById('resultContent').classList.add('hidden');
    document.getElementById('analyzeBtn').disabled = state;
}

function showResult(state) {
    document.getElementById('resultContent').classList.toggle('hidden', !state);
}

let stepInterval = null;
function animateLoadingSteps() {
    const steps = ['step1', 'step2', 'step3'];
    let i = 0;
    steps.forEach(s => document.getElementById(s).classList.remove('active'));
    document.getElementById(steps[0]).classList.add('active');

    stepInterval = setInterval(() => {
        steps.forEach(s => document.getElementById(s).classList.remove('active'));
        i = Math.min(i + 1, steps.length - 1);
        document.getElementById(steps[i]).classList.add('active');
        if (i === steps.length - 1) clearInterval(stepInterval);
    }, 600);
}

// ===========================
// RENDER RESULT
// ===========================
function renderResult(data) {
    const isInfected = data.prediction === 'Parasitized';

    // Verdict banner
    const banner = document.getElementById('verdictBanner');
    banner.className = 'verdict-banner ' + (isInfected ? 'infected' : 'healthy');

    document.getElementById('verdictIcon').textContent = isInfected ? '🦟' : '✅';
    document.getElementById('verdictLabel').textContent = isInfected ? 'PARASITIZED' : 'UNINFECTED';
    document.getElementById('verdictSub').textContent = isInfected
        ? 'Malaria parasite detected'
        : 'No malaria parasite detected';

    const riskBadge = document.getElementById('riskBadge');
    riskBadge.textContent = data.risk;
    riskBadge.className = 'risk-badge risk-' + data.risk;

    // Confidence bar
    document.getElementById('confValue').textContent = data.confidence;
    const bar = document.getElementById('confBar');
    bar.style.width = data.confidence_raw + '%';
    bar.style.background = isInfected
        ? 'linear-gradient(90deg, #ff7340, #ff4560)'
        : 'linear-gradient(90deg, #00c6a0, #00e5a0)';

    // Metrics
    document.getElementById('mUncertainty').textContent = data.uncertainty;
    document.getElementById('mLatency').textContent = data.latency + 'ms';
    document.getElementById('mProb').textContent = data.prob_raw;

    // Advice
    document.getElementById('adviceText').textContent = data.advice;

    // Timestamp
    document.getElementById('resultTimestamp').textContent = data.timestamp;

    // Grad-CAM images
    if (data.heatmap) {
        document.getElementById('heatmapImg').src = 'data:image/jpeg;base64,' + data.heatmap;
    }
    if (data.original) {
        document.getElementById('origImg').src = 'data:image/jpeg;base64,' + data.original;
    }

    showResult(true);

    // Animate confidence bar in
    setTimeout(() => {
        bar.style.width = data.confidence_raw + '%';
    }, 100);
}

// ===========================
// BATCH FILE HANDLER
// ===========================
function handleBatchFiles(input) {
    if (input.files.length === 0) return;
    selectedBatchFiles = Array.from(input.files);

    const strip = document.getElementById('batchPreviewStrip');
    strip.innerHTML = '';
    strip.classList.remove('hidden');

    selectedBatchFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'batch-thumb';
            img.title = file.name;
            strip.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('batchInfo').textContent =
        `${selectedBatchFiles.length} cells selected`;
    document.getElementById('batchBtn').disabled = false;
    document.getElementById('batchResult').classList.add('hidden');
}

// ===========================
// BATCH ANALYSIS
// ===========================
async function analyzeBatch() {
    if (selectedBatchFiles.length === 0) return;

    const formData = new FormData();
    selectedBatchFiles.forEach(file => formData.append('images', file));

    document.getElementById('batchBtn').disabled = true;
    document.getElementById('batchLoadingState').classList.remove('hidden');
    document.getElementById('batchResult').classList.add('hidden');

    const loadingText = document.getElementById('batchLoadingText');
    let processed = 0;
    const total = selectedBatchFiles.length;

    const counterInterval = setInterval(() => {
        processed = Math.min(processed + 1, total - 1);
        loadingText.textContent = `Processing cell ${processed + 1} of ${total}...`;
    }, 300);

    try {
        const res = await fetch('/predict-batch', { method: 'POST', body: formData });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();

        clearInterval(counterInterval);
        document.getElementById('batchLoadingState').classList.add('hidden');
        document.getElementById('batchBtn').disabled = false;

        renderBatchResult(data);
        updateHeaderCount();

    } catch (err) {
        clearInterval(counterInterval);
        document.getElementById('batchLoadingState').classList.add('hidden');
        document.getElementById('batchBtn').disabled = false;
        alert('Batch analysis failed: ' + err.message);
    }
}

// ===========================
// RENDER BATCH RESULT
// ===========================
function renderBatchResult(data) {
    document.getElementById('bmTotal').textContent = data.total;
    document.getElementById('bmInfected').textContent = data.infected;
    document.getElementById('bmHealthy').textContent = data.uninfected;
    document.getElementById('bmParasitemia').textContent = data.parasitemia;
    document.getElementById('bmSeverity').textContent = data.severity;

    // Parasitemia bar (max display at 30%)
    const pct = Math.min((data.parasitemia_raw / 30) * 100, 100);
    document.getElementById('paraFill').style.left = `calc(${pct}% - 2px)`;

    // Per-cell detail
    const list = document.getElementById('batchDetailList');
    list.innerHTML = '';
    (data.results || []).forEach((r, i) => {
        const isInf = r.prediction === 'Parasitized';
        const row = document.createElement('div');
        row.className = 'batch-detail-row ' + (isInf ? 'infected-row' : 'healthy-row');
        row.innerHTML = `
            <span class="bdr-name">${i + 1}. ${r.name || 'cell_' + (i + 1)}</span>
            <div class="bdr-result">
                <span class="${isInf ? 'tag-infected' : 'tag-healthy'}">${r.prediction}</span>
                <span class="bdr-conf">${r.confidence}</span>
            </div>
        `;
        list.appendChild(row);
    });

    document.getElementById('batchResult').classList.remove('hidden');
}

// ===========================
// HISTORY
// ===========================
async function loadHistory() {
    // Load session stats
    try {
        const statsRes = await fetch('/stats');
        const stats = await statsRes.json();

        document.getElementById('ssTotal').textContent = stats.total;
        document.getElementById('ssInfected').textContent = stats.infected;
        document.getElementById('ssHealthy').textContent = stats.uninfected;
        document.getElementById('ssRate').textContent = stats.infection_rate;
        document.getElementById('ssAvgLatency').textContent = stats.avg_latency ? stats.avg_latency + 'ms' : '—';
    } catch (e) {
        console.warn('Could not load stats');
    }

    // Load history
    try {
        const histRes = await fetch('/history');
        const data = await histRes.json();
        renderHistory(data.history || []);
    } catch (e) {
        console.warn('Could not load history');
    }
}

function renderHistory(entries) {
    const list = document.getElementById('historyList');

    if (entries.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">◷</div>
                <p>No predictions yet. Run an analysis to see history here.</p>
            </div>`;
        return;
    }

    list.innerHTML = '';
    [...entries].reverse().forEach((entry, i) => {
        const isInfected = entry.prediction === 'Parasitized';
        const el = document.createElement('div');
        el.className = 'history-entry ' + (isInfected ? 'infected' : 'healthy');
        el.innerHTML = `
            <span class="he-num">#${entries.length - i}</span>
            <span class="he-prediction">${entry.prediction}</span>
            <span class="he-conf">${entry.confidence}</span>
            <span class="he-risk risk-badge risk-${entry.risk}">${entry.risk}</span>
            <span class="he-time">${entry.timestamp}</span>
        `;
        list.appendChild(el);
    });
}

// ===========================
// HEADER COUNT UPDATE
// ===========================
async function updateHeaderCount() {
    try {
        const res = await fetch('/stats');
        const data = await res.json();
        document.getElementById('headerTotal').textContent = data.total + ' scan' + (data.total !== 1 ? 's' : '');
    } catch(e) {}
}

// Initial load
updateHeaderCount();