/* =========================================================
   CLINIC BOOKING SERVICE
========================================================= */

function generateBookingNumber() {
  const now = new Date();

  const datePart =
    `${now.getFullYear()}`
    .slice(-2) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const randomPart =
    Math.floor(1000 + Math.random() * 9000);

  return `BK-${datePart}-${randomPart}`;
}


/* =========================================================
   CREATE BOOKING
========================================================= */

export function createBooking({
  clinic,
  service,
  doctor,
  date,
  time,
  patientName,
  patientPhone,
  notes = "",
}) {
  const bookingNumber =
    generateBookingNumber();

  return {
    bookingNumber,

    clinic: {
      slug: clinic.slug,
      name: clinic.name,
      phone: clinic.phone,
      whatsapp: clinic.whatsapp,
    },

    service: service
      ? {
          id: service.id,
          name: service.name,
          duration: service.duration,
          price: service.price,
        }
      : null,

    doctor: doctor
      ? {
          id: doctor.id,
          name: doctor.name,
          specialty: doctor.specialty,
        }
      : null,

    appointment: {
      date,
      time,
    },

    patient: {
      name: patientName,
      phone: patientPhone,
      notes,
    },

    createdAt:
      new Date().toISOString(),
  };
}

/* =========================================================
   WHATSAPP BOOKING MESSAGE
========================================================= */

export function createBookingWhatsAppUrl(booking) {

  const serviceName =
    booking.service?.name || "استشارة";

  const doctorName =
    booking.doctor?.name || "غير محدد";

  const price =
    booking.service?.price;

  const priceText =
    typeof price === "number"
      ? `${price.toLocaleString()} د.ع`
      : "غير محدد";

  const message = [
    `طلب حجز موعد جديد`,
 
    `رقم الحجز: ${booking.bookingNumber}`,

    `الخدمة: ${serviceName}`,
    `الطبيب: ${doctorName}`,
    `التاريخ: ${booking.appointment.date}`,
    `الوقت: ${booking.appointment.time}`,
    `السعر: ${priceText}`,
    `بيانات المريض`,
    `الاسم: ${booking.patient.name}`,
    `الهاتف: ${booking.patient.phone}`,
    booking.patient.notes
      ? `الملاحظات: ${booking.patient.notes}`
      : null,
    ``,
    `يرجى تأكيد الموعد.`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${booking.clinic.whatsapp}?text=${encodeURIComponent(message)}`;
}
/* =========================================================
   LOCAL BOOKING STORAGE
========================================================= */

const BOOKINGS_STORAGE_KEY =
  "plato_clinic_bookings";


/* =========================================================
   GET ALL BOOKINGS
========================================================= */

export function getBookings() {
  try {
    const storedBookings =
      localStorage.getItem(
        BOOKINGS_STORAGE_KEY
      );

    if (!storedBookings) {
      return [];
    }

    const bookings =
      JSON.parse(storedBookings);

    return Array.isArray(bookings)
      ? bookings
      : [];
  } catch (error) {
    console.error(
      "Failed to read clinic bookings:",
      error
    );

    return [];
  }
}


/* =========================================================
   SAVE BOOKING
========================================================= */

export function saveBooking(booking) {
  try {
    const bookings =
      getBookings();

    const duplicateBooking =
      bookings.some(
        (existingBooking) =>
          existingBooking.clinic?.slug ===
            booking.clinic?.slug &&
          existingBooking.doctor?.id ===
            booking.doctor?.id &&
          existingBooking.appointment?.date ===
            booking.appointment?.date &&
          existingBooking.appointment?.time ===
            booking.appointment?.time
      );

    if (duplicateBooking) {
      return null;
    }

    const updatedBookings = [
      ...bookings,
      booking,
    ];

    localStorage.setItem(
      BOOKINGS_STORAGE_KEY,
      JSON.stringify(
        updatedBookings
      )
    );

    return booking;
  } catch (error) {
    console.error(
      "Failed to save clinic booking:",
      error
    );

    return null;
  }
}

/* =========================================================
   GET BOOKINGS FOR A DATE
========================================================= */

export function getBookingsByDate(
  date
) {
  return getBookings().filter(
    (booking) =>
      booking.appointment?.date ===
      date
  );
}


/* =========================================================
   CHECK IF TIME SLOT IS BOOKED
========================================================= */

export function isTimeSlotBooked(
  date,
  time,
  doctorId,
) {
  return getBookings().some(
    (booking) =>
      booking.appointment?.date ===
        date &&
      booking.appointment?.time ===
        time &&
          booking.doctor?.id ===
        doctorId
  );
}

 /* =========================================================
    BOOKING STORAGE MANAGEMENT
 ========================================================= */

export function getBookingCount() {
  return getBookings().length;
}


export function clearBookings() {
  try {
    localStorage.removeItem(
      BOOKINGS_STORAGE_KEY
    );

    return true;
  } catch (error) {
    console.error(
      "Failed to clear clinic bookings:",
      error
    );

    return false;
  }
}