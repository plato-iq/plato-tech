const clinicData = {
  clinic: {
    slug: "dental-clinic",
    name: "عيادة الابتسامة",
    nameEn: "Smile Dental Clinic",

  logoImage:
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=300&q=90",

  heroImage:
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1600&q=90",

    description:
      "رعاية متخصصة لأسنانك بأحدث التقنيات الطبية.",

    city: "بعقوبة",

    phone: "9647722248374",

    whatsapp: "9647722248374",

    location: "https://maps.google.com/",

    instagram: "https://www.instagram.com/",

    currency: "د.ع",

    theme: {
      primary: "#2563EB",
      dark: "#172033",
      background: "#F7F9FC",
    },

    bookingEnabled: true,
        workingDays: [
      "السبت",
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
    ],

    workingHours: {
      start: "09:00",
      end: "17:00",
        slotDuration: 30,

    },
  },

  services: [
    {
      id: "cleaning",
      name: "تنظيف وتلميع الأسنان",
      description:
        "تنظيف احترافي وإزالة التصبغات للحفاظ على صحة ونظافة الأسنان.",
      duration: 45,
      price: 25000,
      image:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=500&q=85",
    },

    {
      id: "whitening",
      name: "تبييض الأسنان",
      description:
        "جلسة تبييض احترافية للحصول على ابتسامة أكثر إشراقاً.",
      duration: 60,
      price: 75000,
      image:
        "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=500&q=85",
    },

    {
      id: "filling",
      name: "حشوات الأسنان",
      description:
        "علاج التسوس وحشوات تجميلية للحفاظ على شكل ووظيفة السن.",
      duration: 45,
      price: 30000,
      image:
        "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=500&q=85",
    },


    {
      id: "orthodontics",
      name: "تقويم الأسنان",
      description:
        "خطط علاجية لتحسين ترتيب الأسنان ووظيفة الإطباق.",
      duration: 30,
      price: 50000,
      image:
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=500&q=85",
    },

    {
      id: "implant",
      name: "زراعة الأسنان",
      description:
        "استشارات وخطط متخصصة لتعويض الأسنان المفقودة.",
      duration: 60,
      price: 100000,
      image:
        "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=500&q=85",
    },
  ],

  doctors: [
    {
      id: "doctor-1",
      name: "د. أحمد محمد",
      specialty: "طبيب أسنان",
      bio: "متخصص في طب وتجميل الأسنان.",
    },

    {
      id: "doctor-2",
      name: "د. سارة علي",
      specialty: "طبيبة أسنان",
      bio: "متخصصة في تقويم وتجميل الأسنان.",
    },
  ],
};

export default clinicData;
export function getClinicTimeSlots(clinic) {
  const slots = [];

  const startParts =
    clinic.workingHours.start
      .split(":")
      .map(Number);

  const endParts =
    clinic.workingHours.end
      .split(":")
      .map(Number);

  const startMinutes =
    startParts[0] * 60 +
    startParts[1];

  const endMinutes =
    endParts[0] * 60 +
    endParts[1];

  const slotDuration =
    clinic.workingHours.slotDuration || 60;

  for (
    let minutes = startMinutes;
    minutes < endMinutes;
    minutes += slotDuration
  ) {
    const hour =
      Math.floor(minutes / 60);

    const minute =
      minutes % 60;

    const period =
      hour >= 12 ? "pm" : "am";

    const displayHour =
      hour % 12 || 12;

    const displayMinute =
      String(minute).padStart(2, "0");

    slots.push(
      `${String(displayHour).padStart(2, "0")}:${displayMinute} ${period}`
    );
  }

  return slots;
}