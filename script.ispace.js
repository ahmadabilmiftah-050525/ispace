// --- 1. DATA MOOD & STEPS ---
const moods = [
    { emoji: "😡", label: "Marah", text: "Keluarkan amarahmu di sini. Kami mendengarkan." },
    { emoji: "☹️", label: "Sedih", text: "Tidak apa-apa untuk bersedih. Luapkan saja semuanya." },
    { emoji: "😞", label: "Kecewa", text: "Mari kita urai rasa kecewa ini perlahan." },
    { emoji: "😰", label: "Cemas", text: "Tarik napas... mari buat pikiranmu lebih tenang." },
    { emoji: "😵‍💫", label: "Bingung", text: "Mari kita susun potongan pikiranmu satu per satu." },
    { emoji: "😫", label: "Lelah", text: "Rehatkan sejenak lelahmu di ruang aman ini." },
];

const defaultSteps = [
    { id: 1, title: "Emotional Disclosure", question: "Apa yang membuat kamu merasa seperti ini?", placeholder: "Tuliskan apa yang sedang menyesakkan dadamu...", feedback: "Mengutarakan perasaan secara jujur adalah langkah awal pemulihan yang luar biasa." },
    { id: 2, title: "Narrative Formation", question: "Apa yang sebenarnya terjadi dalam situasi ini?", placeholder: "Tuliskan kronologi kejadian secara objektif...", feedback: "Melihat fakta membantu kita memisahkan emosi dari kejadian yang sebenarnya terjadi." },
    { id: 3, title: "Perspective Shift", question: "Menurutmu, kenapa hal ini bisa terjadi?", placeholder: "Coba lihat dari sudut pandang yang berbeda...", feedback: "Memahami alasan di balik sebuah peristiwa seringkali membuka pintu kedamaian." },
    { id: 4, title: "Cognitive Appraisal", question: "Apa yang bisa kamu kontrol? Apa yang tidak?", placeholder: "Fokuslah pada hal-hal yang ada dalam kendalimu...", feedback: "Menyadari batas kendali kita adalah kunci utama untuk melepas kecemasan." },
    { id: 5, title: "Problem Focused Thinking", question: "Apa tindakan yang masih bisa kamu lakukan sekarang?", placeholder: "Tuliskan langkah kecil yang ingin kamu ambil...", feedback: "Tindakan nyata, sekecil apa pun, akan memberikanmu rasa berdaya kembali." },
    { id: 6, title: "Reflection Insight", question: "Apa yang kamu pelajari dari perasaan ini?", placeholder: "Tuliskan pesan atau pelajaran untuk dirimu...", feedback: "Terima kasih sudah berproses. Setiap rasa adalah guru yang mendewasakan." }
];

const moodSpecificContent = {
    "Marah": {
        1: { q: "Apa yang memicu amarahmu saat ini?", p: "Keluarkan semuanya, apa yang membuatmu sangat marah...", f: "Amarah adalah emosi yang valid. Ia memberitahumu bahwa ada batasmu yang dilanggar." },
        2: { q: "Secara objektif, kejadian apa yang sebenarnya memicu kemarahan ini?", p: "Tuliskan faktanya tanpa bumbu emosi...", f: "Melihat fakta secara dingin membantu memisahkan kejadian dari respons emosional." },
        3: { q: "Di balik amarah ini, adakah rasa sakit, takut, atau tidak dihargai yang kamu rasakan?", p: "Coba gali lebih dalam, mungkin ada rasa lain...", f: "Amarah seringkali menjadi tameng pelindung untuk emosi lain yang lebih rentan." },
        4: { q: "Dari situasi yang membuatmu marah ini, bagian mana yang bisa kamu kendalikan?", p: "Fokus pada responsmu, bukan perlakuan orang lain...", f: "Melepaskan kendali atas orang lain akan mengembalikan kekuatan penuh pada dirimu." },
        5: { q: "Apa cara paling sehat untuk melepaskan sisa energi marah ini tanpa menyakiti siapa pun?", p: "Misal: berolahraga, menulis keras, menarik napas...", f: "Mengelola energi marah secara konstruktif mencegah kita melukai diri sendiri dan orang lain." },
        6: { q: "Apa yang kamu pelajari tentang batasan (boundaries) dirimu dari kejadian ini?", p: "Tuliskan apa yang tidak bisa lagi kamu toleransi...", f: "Terima kasih sudah jujur. Kamu kini tahu cara melindungi dirimu dengan lebih baik." }
    },
    "Sedih": {
        1: { q: "Apa yang membuat hatimu terasa berat dan sedih saat ini?", p: "Ceritakan apa yang membuat air matamu ingin jatuh...", f: "Kesedihanmu valid dan nyata. Mengakuinya adalah langkah awal yang sangat berani." },
        2: { q: "Peristiwa atau kehilangan apa yang membawa kesedihan ini padamu?", p: "Tuliskan kejadiannya secara perlahan...", f: "Memberi nama pada kejadian tersebut membantumu memproses realita dengan lebih baik." },
        3: { q: "Apakah kesedihan ini mengingatkanmu pada sesuatu yang sangat berarti bagimu?", p: "Kesedihan biasanya hadir karena kita peduli...", f: "Rasa sedih adalah bukti nyata bahwa kamu memiliki kapasitas yang besar untuk peduli dan mencintai." },
        4: { q: "Meski situasinya menyedihkan, apa satu hal kecil yang masih bisa kamu jaga hari ini?", p: "Fokuslah pada hal sederhana yang masih ada padamu...", f: "Menemukan satu pijakan kecil di tengah kesedihan bisa mencegahmu tenggelam terlalu dalam." },
        5: { q: "Tindakan kecil apa yang bisa memberikan sedikit rasa nyaman untuk dirimu sekarang?", p: "Misal: minum teh hangat, menangis sepuasnya, tidur...", f: "Memberi ruang untuk merawat diri adalah bentuk welas asih yang paling kamu butuhkan saat ini." },
        6: { q: "Pesan apa yang ingin disampaikan oleh kesedihan ini untuk dirimu?", p: "Tuliskan pesan lembut untuk masa depanmu...", f: "Kesedihan sedang mengajarkanmu cara memeluk dan menyayangi dirimu sendiri dengan lebih erat." }
    },
    "Kecewa": {
        1: { q: "Harapan atau ekspektasi apa yang tidak terpenuhi hingga membuatmu kecewa?", p: "Ceritakan apa yang tidak berjalan sesuai bayanganmu...", f: "Kecewa adalah hal yang wajar saat realita tidak berjalan beriringan dengan harapan kita." },
        2: { q: "Bagaimana urutan kejadiannya hingga kamu merasa dikecewakan?", p: "Tuliskan kronologinya apa adanya...", f: "Melihat runtutan kejadian membantumu menyadari pada titik mana ekspektasi dan realita mulai bercabang." },
        3: { q: "Apakah mungkin ada faktor luar yang di luar kendali yang menyebabkan hal ini?", p: "Coba lihat dari sudut pandang yang lebih luas...", f: "Memahami bahwa tidak semua hal terjadi karena kesalahanmu akan meringankan beban di dada." },
        4: { q: "Kamu tidak bisa mengubah hasilnya, lalu apa yang masih bisa kamu kontrol sekarang?", p: "Fokus pada sikap dan langkahmu selanjutnya...", f: "Menerima kekecewaan adalah cara ampuh melepaskan ekspektasi yang membelenggu." },
        5: { q: "Langkah apa yang bisa kamu ambil untuk berdamai dengan rasa kecewa ini?", p: "Tuliskan rencana kecil untuk bangkit kembali...", f: "Setiap langkah penerimaan akan membawamu lebih dekat pada ketenangan pikiran." },
        6: { q: "Pelajaran apa tentang mengelola harapan yang kamu dapatkan hari ini?", p: "Tuliskan kebijaksanaan baru yang kamu peroleh...", f: "Kamu tidak kehilangan harapan, kamu hanya sedang belajar menyesuaikannya dengan realita." }
    },
    "Cemas": {
        1: { q: "Apa ketakutan atau skenario yang sedang sangat mengganggu pikiranmu?", p: "Tuliskan semua kecemasan yang berputar di kepalamu...", f: "Menuliskan kecemasan seringkali membuatnya terasa lebih kecil daripada yang ada di pikiran." },
        2: { q: "Fakta apa yang sebenarnya ada saat ini (bukan sekadar asumsi atau ketakutan)?", p: "Pisahkan antara fakta riil dan pikiran menakutkanmu...", f: "Fakta adalah sauh yang akan menahan pikiranmu agar tidak hanyut terlalu jauh ke masa depan." },
        3: { q: "Seberapa besar kemungkinan ketakutan terburukmu benar-benar terjadi?", p: "Tanyakan pada dirimu, apakah ini realistis...", f: "Kecemasan seringkali melebih-lebihkan bahaya. Sadarilah bahwa kamu lebih aman dari yang kamu kira." },
        4: { q: "Mari pisahkan: mana yang bisa kamu kontrol, dan mana yang di luar kendalimu?", p: "Tuliskan hal-hal yang ada dalam area kuasamu...", f: "Melepaskan apa yang tidak bisa kita kontrol adalah kunci utama meredakan kecemasan." },
        5: { q: "Apa satu tindakan nyata hari ini yang bisa membantumu merasa lebih aman?", p: "Fokus pada satu langkah kecil di masa kini...", f: "Tindakan di masa kini adalah obat penawar terbaik untuk memutus siklus ketakutan." },
        6: { q: "Setelah diurai, apa afirmasi yang bisa kamu katakan pada kecemasanmu?", p: "Tuliskan kalimat penenang untuk dirimu...", f: "Kamu lebih kuat dari ketakutanmu. Napasmu adalah bukti bahwa kamu masih memegang kendali." }
    },
    "Bingung": {
        1: { q: "Apa yang membuat pikiranmu terasa penuh, bercabang, atau buntu?", p: "Tuliskan semua hal yang sedang bertumpuk di kepalamu...", f: "Menuangkan isi kepala ke tulisan membantu mengurai benang pikiran yang sedang kusut." },
        2: { q: "Fakta, pilihan, atau opsi apa saja yang ada di depanmu saat ini?", p: "Daftarkan opsi yang membuatmu kebingungan...", f: "Membuat daftar secara objektif merapikan pikiran yang acak menjadi lebih terstruktur." },
        3: { q: "Jika sahabatmu yang ada di posisi ini, nasihat apa yang akan kamu berikan padanya?", p: "Coba ambil jarak dan lihat masalahnya dari luar...", f: "Kita seringkali bisa melihat jalan lebih jernih saat tidak terlalu terikat dengan masalahnya." },
        4: { q: "Dari semua pilihan ini, mana satu hal yang paling pasti dan bisa kamu pegang?", p: "Cari satu pijakan yang paling solid...", f: "Saat badai kebingungan melanda, berpeganglah pada satu titik fokus yang paling sederhana." },
        5: { q: "Apa langkah paling kecil yang bisa kamu ambil untuk mulai mengurai kebingungan ini?", p: "Misal: mencari info tambahan, atau istirahat dulu...", f: "Kamu tidak perlu tahu seluruh jalannya sekarang, cukup fokus pada satu langkah berikutnya." },
        6: { q: "Setelah mengurai isi kepalamu, pencerahan kecil apa yang mulai terlihat?", p: "Tuliskan arah atau petunjuk yang kamu rasakan...", f: "Kebingungan adalah proses sebelum pemahaman. Kini jalanmu mulai sedikit lebih terang." }
    },
    "Lelah": {
        1: { q: "Apa yang paling banyak menguras energi dan pikiranmu akhir-akhir ini?", p: "Ceritakan beban apa yang sedang kamu pikul...", f: "Mengakui kelelahan adalah langkah pertama yang sangat penting untuk mulai beristirahat." },
        2: { q: "Aktivitas, tuntutan, atau rutinitas apa yang membuatmu sampai di titik lelah ini?", p: "Tuliskan hal-hal yang menyedot energimu...", f: "Menyadari sumber kelelahan membantumu mengevaluasi ulang batas kapasitas dirimu." },
        3: { q: "Apakah tubuh dan pikiranmu sebenarnya sedang mencoba meminta jeda darimu?", p: "Coba dengarkan alarm dari tubuhmu sendiri...", f: "Kelelahan bukanlah tanda kelemahan, melainkan sinyal bahwa kamu telah bekerja terlalu keras." },
        4: { q: "Bagian mana dari beban ini yang bisa kamu lepaskan, tunda, atau minta bantuan orang lain?", p: "Tuliskan hal yang tidak harus kamu selesaikan hari ini...", f: "Kamu tidak harus memikul semuanya sendirian. Meminta tolong atau menunda juga sebuah pilihan." },
        5: { q: "Bentuk istirahat seperti apa yang paling kamu butuhkan dan bisa kamu lakukan sekarang?", p: "Tuliskan caramu mengisi ulang energi...", f: "Istirahat adalah hak fundamentalmu, bukan hadiah yang hanya boleh didapat setelah kehabisan tenaga." },
        6: { q: "Pelajaran apa tentang merawat diri (self-care) yang kamu sadari hari ini?", p: "Tuliskan janji untuk lebih menyayangi dirimu...", f: "Terima kasih sudah mau berhenti sejenak. Tubuh dan pikiranmu amat berterima kasih padamu." }
    }
};

// --- 2. STATE ---
let currentStep = 0;
let selectedMood = null;
let answers = {};
let showFeedback = false;
let currentDynamicSteps = defaultSteps;

// Fungsi untuk menggabungkan defaultSteps dengan spesifik mood
const getDynamicSteps = (moodLabel) => {
    if (!moodLabel || !moodSpecificContent[moodLabel]) return defaultSteps;
    
    return defaultSteps.map(step => ({
        ...step,
        question: moodSpecificContent[moodLabel][step.id]?.q || step.question,
        placeholder: moodSpecificContent[moodLabel][step.id]?.p || step.placeholder,
        feedback: moodSpecificContent[moodLabel][step.id]?.f || step.feedback,
    }));
};

// --- 3. INITIALIZE ---
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons(); // Render icons
    renderMoods();
    
    // Set current date
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('current-date').innerText = new Date().toLocaleDateString('id-ID', dateOptions);

    const textarea = document.getElementById('journal-input');
    textarea.addEventListener('input', (e) => {
        answers[currentStep] = e.target.value;
        validateInput();
    });
});

// --- 4. VIEW MANAGER ---
function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
    });
    const target = document.getElementById(viewId);
    target.classList.remove('hidden');
    target.classList.add('active');
}

function selectMood(index) {
    selectedMood = moods[index];
    currentStep = 0;
    answers = {};
    showFeedback = false;
    currentDynamicSteps = getDynamicSteps(selectedMood.label);
    
    // Set visual info on the right panel
    document.getElementById('visual-emoji').innerText = selectedMood.emoji;
    document.getElementById('visual-label').innerText = `Mood Saat Ini: ${selectedMood.label}`;
    document.getElementById('visual-text').innerText = `"${selectedMood.text}"`;
    
    updateJournalUI();
    switchView('view-journal');
}

// --- 5. RENDER UI TERUS MENERUS ---
function renderMoods() {
    const container = document.getElementById('mood-grid');
    container.innerHTML = moods.map((m, i) => `
        <button onclick="selectMood(${i})" class="bg-white p-10 rounded-3xl border-2 border-transparent hover:border-[#1a2b6d] shadow-sm hover:shadow-md transition-all duration-300 group text-center flex flex-col items-center justify-center">
            <div class="text-6xl mb-4 group-hover:scale-110 transition-transform">${m.emoji}</div>
            <div class="font-bold text-[#1a2b6d] uppercase tracking-wide">${m.label}</div>
        </button>
    `).join('');
}

function updateJournalUI() {
    const step = currentDynamicSteps[currentStep];
    showFeedback = false;
    
    document.getElementById('step-number').innerText = step.id;
    document.getElementById('step-title').innerText = step.title;
    document.getElementById('step-question').innerText = step.question;
    document.getElementById('step-feedback').innerText = `"${step.feedback}"`;
    
    const textarea = document.getElementById('journal-input');
    textarea.placeholder = step.placeholder;
    textarea.value = answers[currentStep] || '';
    
    document.getElementById('progress-dots').innerHTML = currentDynamicSteps.map((_, i) => `
        <div class="h-2 rounded-full transition-all duration-500 ${currentStep === i ? 'w-10 bg-white' : 'w-2 bg-white/20'}"></div>
    `).join('');

    toggleFeedbackView();
    validateInput();
    textarea.focus();
}

function validateInput() {
    const btn = document.getElementById('btn-process');
    const text = answers[currentStep] || '';
    
    if (text.trim().length >= 5) {
        btn.disabled = false;
        btn.className = "w-full py-6 rounded-3xl font-bold text-xl transition-all shadow-lg bg-[#1a2b6d] hover:bg-[#2a3b7d] text-white transform hover:-translate-y-1";
    } else {
        btn.disabled = true;
        btn.className = "w-full py-6 rounded-3xl font-bold text-xl transition-all shadow-lg bg-gray-100 text-gray-300 cursor-not-allowed";
    }
}

// --- 6. LOGIKA TOMBOL LANJUT ---
function processNext() {
    showFeedback = true;
    toggleFeedbackView();
}

function continueToNext() {
    if (currentStep < currentDynamicSteps.length - 1) {
        currentStep++;
        updateJournalUI();
    } else {
        renderConclusion();
        switchView('view-complete');
    }
}

function toggleFeedbackView() {
    const inputArea = document.getElementById('input-area');
    const feedbackArea = document.getElementById('feedback-area');
    const btnProcess = document.getElementById('btn-process');
    const btnContinue = document.getElementById('btn-continue');
    const btnContinueText = document.getElementById('btn-continue-text');

    if (showFeedback) {
        inputArea.classList.add('hidden');
        feedbackArea.classList.remove('hidden');
        btnProcess.classList.add('hidden');
        
        btnContinue.classList.remove('hidden');
        btnContinue.style.display = 'flex'; 
        btnContinueText.innerText = currentStep === currentDynamicSteps.length - 1 ? 'SELESAI' : 'TAHAP BERIKUTNYA';
    } else {
        inputArea.classList.remove('hidden');
        feedbackArea.classList.add('hidden');
        btnProcess.classList.remove('hidden');
        
        btnContinue.classList.add('hidden');
        btnContinue.style.display = ''; 
    }
}

// --- 7. FUNGSI PEMBUAT KESIMPULAN (SURAT SOLUSI) ---
function renderConclusion() {
    const moodLabel = selectedMood?.label || "";
    // Dalam array 'answers', index 4 adalah "Tindakan" dan index 5 adalah "Pelajaran"
    const actionAnswer = answers[4] || "mengambil jeda dan memulihkan diri"; 
    const insightAnswer = answers[5] || "setiap emosi adalah proses untuk bertumbuh";

    document.getElementById('summary-mood-label').innerText = `Selesai memproses rasa ${moodLabel.toLowerCase()}`;

    const intros = {
        "Marah": "Terima kasih sudah menyalurkan energi marahmu dengan cara yang aman hari ini. Amarahmu valid, dan memilih untuk meresponsnya dengan kesadaran penuh adalah sebuah kekuatan besar.",
        "Sedih": "Tidak apa-apa untuk merasa hancur sejenak. Terima kasih sudah berani menatap kesedihanmu dan memberinya ruang bernapas di sini.",
        "Kecewa": "Kecewa karena harapan tak sejalan dengan kenyataan memang sangat menyakitkan. Tapi dari sini, kamu perlahan sedang belajar tentang seni melepaskan.",
        "Cemas": "Pikiran yang riuh kini perlahan mulai menemukan pijakannya. Kamu baru saja membuktikan bahwa dirimu jauh lebih besar dari ketakutan-ketakutan di kepalamu.",
        "Bingung": "Kadang, tidak tahu harus berbuat apa adalah fase penting yang harus dilewati sebelum menemukan kejelasan. Terima kasih sudah memetakan jalanmu perlahan.",
        "Lelah": "Tubuh dan pikiranmu pantas mendapatkan jeda. Terima kasih sudah mendengarkan alarm dirimu sendiri dan berani untuk berhenti sejenak."
    };

    const intro = intros[moodLabel] || "Terima kasih sudah berproses di ruang aman ini.";

    const paragraphs = [
        intro,
        "Setelah menelusuri rentetan perasaanmu, kamu berhasil memisahkan antara badai emosi dan fakta yang sebenarnya. Yang paling hebat, kamu menyadari mana yang ada di luar kendalimu dan mana yang masih bisa kamu atur.",
        `Keputusanmu untuk " ${actionAnswer} " adalah langkah kecil yang amat berarti. Jangan pernah meremehkan langkah sekecil apa pun, karena dari sanalah kendali atas hidupmu kembali.`,
        `Bawalah selalu kebijaksanaan yang baru saja kamu temukan hari ini: " ${insightAnswer} ".`,
        "Kamu sudah melakukan upaya yang luar biasa hari ini untuk dirimu sendiri. Kapan pun semuanya terasa berat lagi, iSpace akan selalu ada di sini untuk mendengarkanmu."
    ];

    const container = document.getElementById('summary-content');
    container.innerHTML = paragraphs.map((text, index) => {
        // Berikan styling khusus untuk paragraf ke-3 dan ke-4 (index 2 dan 3) sesuai React
        const extraClass = (index === 2 || index === 3) 
            ? "font-medium text-[#1a2b6d] bg-[#f8f9fc] p-5 rounded-2xl border-l-4 border-[#1a2b6d]" 
            : "";
        return `<p class="${extraClass}">${text}</p>`;
    }).join('');
}
