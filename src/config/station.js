export const station = {
  name: "Suara Ferdonk",
  tagline: "Radio Online Indonesia",
  description: "Suara Ferdonk adalah stasiun radio online yang menyajikan hiburan audio berkualitas untuk pendengar di seluruh Indonesia. Nikmati musik, obrolan, dan konten menarik lainnya kapan saja dan di mana saja.",

  caster: {
    publicToken: "3c650aa9-dfab-4d2d-94c9-5a5bbf32b56c",
    color: "DD7C2B",
    theme: "light",
  },

  // Isi dengan direct stream URL jika sudah upgrade Caster FM Pro
  // Format: https://shaincast.caster.fm:XXXXX/listen.mp3
  directStreamUrl: null,

  // TuneIn station page URL (isi jika sudah terdaftar di TuneIn)
  tuneinUrl: "https://tunein.com/radio/Suara-Ferdonk/",

  social: {
    instagram: "https://instagram.com/suaraferdonk",
    whatsapp: "https://wa.me/6281234567890",
    youtube: "https://youtube.com/@suaraferdonk",
    tiktok: "https://tiktok.com/@suaraferdonk",
    email: "info@suaraferdonk.com",
  },

  schedule: [
    { day: "Senin", programs: [{ time: "08:00 - 12:00", name: "Morning Vibes", dj: "Ferdonk" }, { time: "19:00 - 22:00", name: "Night Mix", dj: "DJ Random" }] },
    { day: "Selasa", programs: [{ time: "08:00 - 12:00", name: "Morning Vibes", dj: "Ferdonk" }, { time: "19:00 - 22:00", name: "Chill Session", dj: "DJ Random" }] },
    { day: "Rabu", programs: [{ time: "08:00 - 12:00", name: "Morning Vibes", dj: "Ferdonk" }, { time: "19:00 - 22:00", name: "Throwback Hits", dj: "DJ Random" }] },
    { day: "Kamis", programs: [{ time: "08:00 - 12:00", name: "Morning Vibes", dj: "Ferdonk" }, { time: "19:00 - 22:00", name: "Indie Night", dj: "DJ Random" }] },
    { day: "Jumat", programs: [{ time: "08:00 - 12:00", name: "Morning Vibes", dj: "Ferdonk" }, { time: "19:00 - 23:00", name: "Friday Party", dj: "Ferdonk" }] },
    { day: "Sabtu", programs: [{ time: "10:00 - 14:00", name: "Weekend Lounge", dj: "Ferdonk" }, { time: "20:00 - 23:59", name: "Saturday Night Live", dj: "DJ Random" }] },
    { day: "Minggu", programs: [{ time: "10:00 - 14:00", name: "Sunday Chill", dj: "Ferdonk" }] },
  ],
};
