export const content = {
  global: {
    brandName: "Learn With Andi",
    email: "support@learnwithandi.com",
    socials: {
      instagram: "https://www.instagram.com/learnwithandi/",
      linkedin: "https://www.linkedin.com/in/andisatr/",
      youtube: "https://www.youtube.com/@LearnwithAndis",
      threads: "https://www.threads.com/@learnwithandi",
      whatsapp: "http://wa.me/6282164815973",
    },
    logo: {
      black: "/assets/logo/full-black.png",
      white: "/assets/logo/full-white.png",
    },
  },
  mentors: {
    title: "Kenalan sama Mentor Kamu",
    subtitle: "Belajar langsung dari mereka yang udah makan asam garam di dunia kerja.",
    items: [
      {
        name: "Andi Satriawan",
        role: "Founder & Career Coach",
        description: "Praktisi HR & Career Coach yang sudah bantu ribuan orang tembus kerja impian. Fokus di strategi karier sat-set, personal branding yang autentik, dan persiapan mental baja buat hadapi rekruter.",
        image: "/assets/mentors/andi.png",
        linkedin: "https://www.linkedin.com/in/andisatr/"
      },
      {
        name: "Alvian Zachry Faturrahman",
        role: "Software Engineer & Tech Mentor",
        description: "Tech geek yang hobi banget ngoding dan mentoring. Ahlinya ngebangun sistem full-stack yang scalable. Punya misi khusus: jembatani talenta Southeast Asia biar bisa bersaing dan dapet opportunity di Eropa.",
        image: "/assets/mentors/alvian.png",
        linkedin: "https://www.linkedin.com/in/alvianzf/",
        website: "https://alvianzf.id/"
      },
      {
        name: "Derryl Ditramaneti",
        role: "Expert Product Manager",
        description: "Product leader yang jago banget nerjemahin visi jadi eksekusi. Fokus di product strategy & operational excellence. Siap bantu kamu mikir strategis ala Product Manager kelas dunia.",
        image: "/assets/mentors/derryl.png", // Will fallback
        linkedin: "https://www.linkedin.com/in/derryldt/"
      },
      {
        name: "Muhammad Fauzan",
        role: "Digital Marketing Specialist",
        description: "Digital Marketer yang paham luar dalem soal Ads & Growth. Punya pengalaman teknis deep di industri, siap sharing rahasia campaign yang ngena dan menghasilkan cuan.",
        image: "/assets/mentors/fauzan.png",
        linkedin: "https://www.linkedin.com/in/fauzanozan/"
      }
    ]
  },
  promoPopup: {
    show: false,
    image: "/assets/programs/1.webp",
    title: "Program Terbaru!",
    text: "Dapatkan akses ke materi eksklusif dan mentoring intensif.",
    cta: {
      text: "Lihat Detail",
      link: "#offer",
    },
  },
  hero: {
    badge: "Career Coaching Indonesia",
    headline: "STOP Cari Kerja Sendiri.",
    subHeadline: "Mulai Bangun Karier dengan Arah yang Jelas",
    description: "Learn With Andi (LWA) adalah ekosistem belajar berkarier secara profesional yang membantu kamu siap kerja sesuai value, naik level, atau shifting career secara realistis, tanpa janji instan.",
    primaryCta: {
      text: "Join LWA",
      link: "#offer",
    },
    secondaryCta: {
      text: "Konsultasi Dulu",
      link: "https://wa.me/628123456789",
      icon: "MessageCircle"
    },
    image: "/assets/andi/potrait.png",
  },
  problem: {
    id: "problem",
    title: "Pernah ngerasain posisi kayak gini?",
    painPoints: [
      "Sudah apply puluhan sampai ratusan lowongan, tapi jarang dipanggil",
      "CV dibilang bagus, tapi tetap dighosting",
      "LinkedIn ada, tapi sepi",
      "Interview sering, tapi blank",
      "Takut belajar karena takut buang uang",
      "Bingung harus mulai darimana untuk upgrade karir", // Inferred 6th point
    ],
    closingQuote: "“Tahu salah, tapi nggak tahu salahnya di mana.”",
  },
  solution: {
    id: "solution",
    coreMessages: [
      "Di LWA, bukan cuma belajar, tapi ditemani sampai paham",
      "Karier bukan soal hoki",
      "Tidak instan",
      "Butuh strategi yang update, arah jelas, dan konsistensi",
    ],
    practicalElements: [
      "Materi siap pakai",
      "Mentor dan komunitas aktif",
      "Review, diskusi, dan feedback",
      "Fokus ke dunia kerja nyata, bukan teori",
    ],
  },
  stats: {
    text: "350+ Member LWA Udah Dapat Kerja di 2025",
  },
  careerElements: {
    title: "Elemen Penting Upgrade Karier",
    items: [
      {
        title: "Learning",
        description: "Pelajari skill dan insight yang valuable lewat sesi coaching private sesuai dengan tujuan karir dan kebutuhan di bursa kerja.",
      },
      {
        title: "Winning",
        description: "Tetap Stand-out di bursa kerja proffesional dengan mengoptimalkan cv dan profile linkedin yang sesuai dengan expertise kamu",
      },
      {
        title: "Achieving",
        description: "Capai tujuan karirmu lebih cepat dengan arahan strategis, tepat guna, dan support secara berkala.",
      },
    ],
  },
  services: {
    title: "Layanan Kami",
    subtitle: "Solusi praktis biar karier kamu makin stand out.",
    items: [
      {
        title: "Optimasi Resume",
        description: "Ubah resume kamu jadi alat marketing yang 'menjual' achievement dan tembus sistem ATS.",
      },
      {
        title: "Bedah LinkedIn",
        description: "Permak profil LinkedIn biar dilirik rekruter dan posisikan dirimu sebagai top talent di industri.",
      },
      {
        title: "Persiapan Interview",
        description: "Kuasai seni wawancara lewat simulasi dan feedback langsung biar makin pede.",
      },
      {
        title: "Negosiasi Gaji",
        description: "Pelajari strategi tawar gaji biar dapet angka yang sesuai dengan value kamu.",
      },
      {
        title: "Kerja Remote",
        description: "Rancang strategi karir dengan milestone jelas buat nembus kerjaan remote global.",
      },
      {
        title: "Personal Branding", // Changed from Winning to match translation intent better or keep logic
        description: "Bikin branding diri yang stand-out dan narik peluang karir ke arahmu.",
      },
    ],
  },
  qualification: {
    id: "qualification",
    doTitle: "KALAU KAMU BENERAN NIAT",
    dontTitle: "TAPI JANGAN JOIN KALAU...",
    dos: [
      "Career Level-UP, tapi bingung mulai darimana",
      "Sukses Interview dan pede jawab setiap pertanyaannya",
      "Bangun CV dan Profile LinkedIn yang bikin para Recruiter DM Kamu",
      "Siap masuk Work Abroad sekalipun masih Rookie",
      "Cari Strategi yang relevan buat naikin Level Career kamu",
    ],
    donts: [
      "Suka rebahan tapi bingung uangnya mau buat apa",
      "Kerjaan yang penting dapat uang (Konsistensi buat apa?)",
      "Merasa CV dan Profile LinkedIn sudah paten (Yang Penting Apply Ratusan Kali)",
      "Solo Levelling adalah Jalan Ninjaku",
      "Selama Papa Mama masih kasih duit ngapain Kerja ?",
    ],
  },
  offer: {
    id: "offer",
    programName: "Investment Plans",
    price: "Rp100.000 per bulan", // Legacy
    description: "Pilih paket coaching yang paling pas buat goals dan dompet kamu.",
    programSteps: [ // Replaces programDetails for the 1-5 gallery
      {
        number: "01",
        title: "Revamp CV",
        subtitle: "Applicant Tracking Systems",
        description: "Update CV-mu biar lolos screening, yang kamu pelajari di tahap ini:",
        points: [
          "Konstruksi ulang format CV biar sesuai standar internasional.",
          "Optimalisasi penggunaan keyword sesuai industri-posisi yang kamu incar",
          "Highlight pencapaian, akumulasi pengalaman profesional, serta relevansinya",
        ],
        image: "/assets/programs/1.webp",
      },
      {
        number: "02",
        title: "LinkedIn Profile Optimization",
        subtitle: "Rekonstruksi Linkedin Profile",
        description: "LinkedIn bukan cuma tempat cari kerja, tapi juga etalase profesional, yang kamu pelajari di tahap ini:",
        points: [
          "Bangun profil LI agar lebih pro: dari headline, summary, sampai pengalaman kerja.",
          "Naikin visibilitas pakai keyword yang tepat di LI.",
          "Cara bangun personal branding secara konsisten",
          "Bangun value diri biar relevan sama perusahaan yang kamu incar..",
          "Manfaatin fitur-fitur LI: open to work, endorsements, dan networking secara brutal.",
        ],
        image: "/assets/programs/2.webp",
      },
      {
        number: "03",
        title: "Interview Strategies",
        subtitle: "Siapin Arsenalmu",
        description: "Di sini kamu dibekali strategi biar tampil PE-DE dan meyakinkan saat interview, yang kamu pelajari di tahap ini:",
        points: [
          "Latihan jawab pertanyaan umum dan spesifik sesuai posisi yang kamu incar.",
          "Kenali gaya interview (behavioral, case, situational) + the most effective way to answer",
          "STAR (Situation, Task, Action, Result) buat jelasin pengalamanmu secara terstruktur",
          "Roasting langsung buat boosting gestur, bahasa tubuh, dan cara penyampaian.",
        ],
        image: "/assets/programs/3.webp",
      },
      {
        number: "04",
        title: "Interactive Group",
        subtitle: "“Spoilers” Support System",
        description: "Grup ini active lethaly. Support yang seringkali tanpa filter, tapi jujur. Orang-orang yang lagi fight di trek buat dapat kerja / project meski beda expertise, yang kamu pelajari di tahap ini:",
        points: [
          "Saling support",
          "Cara hindari drama & konflik di lingkungan profesional.",
          "Latihan ngadepin worst-case scenario (penolakan, gagal di fase probation, career break panjang)",
        ],
        image: "/assets/programs/4.webp",
      },
      {
        number: "05",
        title: "Weekly Support",
        subtitle: "Reality Check Mingguan",
        description: "Biar kamu gak “lari” sendirian / nyasar, tiap minggu LWA kasih checkpoint, yang kamu pelajari di tahap ini:",
        points: [
          "Update info lowker sesama member",
          "Feedback progres mingguan: apa yang perlu diperbaiki, biar siap tempur",
          "Diskusi bareng mentor & member biar dapet solusi atas masalah yang dihadapi.",
          "To-do action plan biar minggu berikutnya lebih terarah.",
        ],
        image: "/assets/programs/5.webp",
      },
      {
        number: "06",
        title: "Offered",
        subtitle: "Review Offering & Sign",
        description: "Tahap final! Kita bantu review offering letter biar kamu nggak salah tanda tangan dan nyesel di akhir.",
        points: [
          "Review kontrak kerja & benefit",
          "Cek pasal-pasal pinalti yang merugikan",
          "Siap on-boarding dengan percaya diri",
        ],
        image: "/assets/programs/6.png", // Generated image
      },
    ],
    // Legacy benefits array for OfferSection if needed, but we used plans now.
    benefits: [],
    consultation: {
      text: "Konsultasi Dulu",
      link: "https://wa.me/628123456789"
    },
    plans: [
      {
        name: "Support",
        price: "Rp100.000",
        billing: "Monthly",
        features: [
          "Weekly Meeting 2x Seminggu",
          "Dukungan Harian di Grup",
          "Bertemu dengan para Expert",
          "Info Lowongan Kerja di Luar Negeri",
          "Tips & Trik Pengembangan Karir",
          "Akses ke Semua Grup Support",
          "Probation Support (Special Support)"
        ],
        cta: {
          text: "ORDER NOW",
          link: "https://learnwithandi.myr.id/membership/monthly-subscription-90-days-get-jobs-online-courses-linkedin-and-cv-optimisation-68399"
        },
        highlight: true, // "Most Economical" or similar
        highlightText: "Most Economical"
      },
      {
        name: "Basic",
        price: "Rp449.000",
        billing: "Life Time",
        features: [
          "Weekly Meeting 2x Seminggu",
          "Dukungan Harian di Grup",
          "Bertemu dengan para Expert",
          "Info Lowongan Kerja di Luar Negeri",
          "Tips & Trik Pengembangan Karir",
          "Akses ke Semua Grup Support",
          "Probation Support (Special Support)"
        ],
        cta: {
          text: "ORDER NOW",
          link: "https://learnwithandi.myr.id/course/90-days-get-jobs-online-courses-linkedin-and-cv-optimisation"
        }
      },
      {
        name: "Premium",
        price: "Rp699.000",
        billing: "Life Time",
        features: [
          "Weekly Meeting 2x Seminggu",
          "Dukungan Harian di Grup",
          "Bertemu dengan para Expert",
          "Info Lowongan Kerja di Luar Negeri",
          "Tips & Trik Pengembangan Karir",
          "Akses ke Semua Grup Support",
          "Probation Support (Special Support)",
          "Free Roasting 1on1 90 menit"
        ],
        popular: true,
        cta: {
          text: "ORDER NOW",
          link: "https://learnwithandi.myr.id/course/90-days-get-jobs-online-courses-linkedin-and-cv-optimisation-oyz5"
        }
      }
    ],
  },
  bio: {
    id: "bio",
    name: "Andi Satriawan Lubis",
    description: "Praktisi karier yang telah membantu ribuan jobseeker, career switcher, dan profesional memahami cara kerja rekrutmen modern.",
    philosophy: [
      "Tidak ada janji instan",
      "Tidak ada motivasi kosong",
      "Fokus ke cara main yang benar",
      "Belajar harus meringankan, bukan menambah beban",
    ],
    image: "/assets/andi/potrait.png",
  },
  testimonials: {
    id: "testimonials",
    items: [
      {
        quote: "Awalnya cuma mau belajar bikin CV. Ternyata sepaket sama ubah mindset.",
        author: "Alumni",
        image: "/assets/testimonies/1.png",
      },
      {
        quote: "Akhirnya ngerti kenapa selama ini ditolak, dan apa yang harus dibenahi.",
        author: "Career Switcher",
        image: "/assets/testimonies/2.png",
      },
      {
        quote: "Nggak sendirian. Itu yang bikin gue bertahan.",
        author: "Member LWA",
        image: "/assets/testimonies/3.png",
      },
      {
        quote: "Transformasi karier yang nyata.",
        author: "Professional",
        image: "/assets/testimonies/4.png",
      },
      {
        quote: "Sangat membantu proses rekrutmen saya.",
        author: "Job Seeker",
        image: "/assets/testimonies/5.png",
      },
    ],
  },
  scarcity: {
    id: "scarcity",
    messages: [
      "Program dibuka terbatas per batch",
      "Model subscription dan harga promo tidak selalu tersedia",
      "Harga dapat naik tanpa pemberitahuan",
    ],
  },
  faq: {
    id: "faq",
    items: [
      {
        question: "Apakah cocok untuk pemula?",
        answer: "Ya, materi disusun dari dasar hingga advanced, cocok untuk berbagai level pengalaman.",
      },
      {
        question: "Bisa diikuti sambil kerja?",
        answer: "Bisa. Jadwal fleksibel dan materi bisa diakses kapan saja.",
      },
      {
        question: "Format belajar seperti apa?",
        answer: "Kombinasi materi video/teks, live session, tugas praktik, dan diskusi komunitas.",
      },
      {
        question: "Apakah dijamin dapat kerja?",
        answer: "Tidak ada jaminan 100%. Kelulusan dan keberhasilan tergantung usaha kamu menerapkannya. Kami memberikan strategi terbaik.",
      },
      {
        question: "Mau coba dulu sebelum komit?",
        answer: "Paket Support (Rp100rb) adalah start terbaik. Low risk, high return. Kamu dapet network, info loker valid, dan weekly meeting. Bisa upgrade kapan aja.",
      },
      {
        question: "Kenapa harus bayar buat cari kerja?",
        answer: "Kamu tidak membayar untuk 'pekerjaan', tapi untuk Akselerasi. Sendirian bisa, tapi rawan 'trial-error'. Kami tawarkan opsi: 1) Support (Bulanan): Fitur setara Basic, cocok buat 'Test Drive' atau butuh jangka pendek. 2) Basic (Lifetime): Lebih hemat jangka panjang, bayar sekali akses selamanya. 3) Premium: Tambahan sesi 1-on-1 privat buat bedah teknis mendalam. Investasi ini buat hemat waktumu.",
      },
    ],
  },
  finalCta: {
    id: "final-cta",
    title: "Siap Gaspol Bareng LWA?",
    subtext: "Yuk, pilih program yang paling masuk akal buat karier kamu.",
    values: [
      "Belajar dengan arah",
      "Didampingi, bukan sendirian",
      "Biaya ringan, value jangka panjang",
      "Fokus dunia kerja nyata",
    ],
    primaryCta: {
      text: "Join LWA",
      link: "#offer",
    },
    secondaryCta: {
      text: "Konsultasi Dulu",
      link: "https://wa.me/628123456789",
    },
  },
  footer: {
    id: "footer",
    title: "Bangun Karir Impianmu.",
    subtitle: "Powered by",
    name: "Andi Satriawan",
    copyright: "© 2024 Learn With Andi. All rights reserved.",
  },
};
