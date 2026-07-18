const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Animated stat counters
const counters = document.querySelectorAll("[data-count]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    let current = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(counter => observer.observe(counter));

// Booking calendar
const calendarDays = document.querySelector("#calendar-days");
const calendarMonth = document.querySelector("#calendar-month");
const timeSlotList = document.querySelector("#time-slot-list");
const selectedDateLabel = document.querySelector(".selected-date-label");
const continueBtn = document.querySelector("#continue-booking");
const calendarPrev = document.querySelector(".prev-month");
const calendarNext = document.querySelector(".next-month");

let calendarDate = new Date(2026, 6, 1);
let selectedDate = null;
let selectedTime = null;

const slots = [
  { time: "8:00 AM", blocked: false },
  { time: "8:30 AM", blocked: false },
  { time: "9:00 AM", blocked: true },
  { time: "9:30 AM", blocked: false },
  { time: "10:00 AM", blocked: false },
  { time: "10:30 AM", blocked: false },
  { time: "11:00 AM", blocked: true },
  { time: "11:30 AM", blocked: false },
  { time: "1:00 PM", blocked: false },
  { time: "1:30 PM", blocked: false },
  { time: "2:00 PM", blocked: true },
  { time: "2:30 PM", blocked: false },
  { time: "3:00 PM", blocked: false },
  { time: "4:00 PM", blocked: false }
];

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric"
  }).format(date);
}

function renderCalendar() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  calendarMonth.textContent = new Intl.DateTimeFormat("en-US", {
    month: "long", year: "numeric"
  }).format(calendarDate);

  calendarDays.innerHTML = "";
  const firstDay = new Date(year, month, 1);
  const mondayIndex = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < mondayIndex; i++) {
    calendarDays.appendChild(document.createElement("span"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const button = document.createElement("button");
    const date = new Date(year, month, day);
    button.className = "day";
    button.textContent = day;
    button.type = "button";

    const dayOfWeek = date.getDay();
    const isPast = date < new Date(2026, 6, 1);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (isPast || isWeekend) button.disabled = true;
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) button.classList.add("selected");
    if (date.toDateString() === new Date(2026, 6, 16).toDateString()) button.classList.add("today");

    button.addEventListener("click", () => {
      selectedDate = date;
      selectedTime = null;
      selectedDateLabel.textContent = formatDate(date);
      continueBtn.disabled = true;
      renderCalendar();
      renderSlots();
    });

    calendarDays.appendChild(button);
  }
}

function renderSlots() {
  timeSlotList.innerHTML = "";
  slots.forEach(slot => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "time-slot";
    button.textContent = slot.time;
    button.disabled = slot.blocked;

    if (selectedTime === slot.time) button.classList.add("selected");

    button.addEventListener("click", () => {
      selectedTime = slot.time;
      continueBtn.disabled = false;
      renderSlots();
    });

    timeSlotList.appendChild(button);
  });
}

calendarPrev.addEventListener("click", () => {
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  renderCalendar();
});

calendarNext.addEventListener("click", () => {
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  renderCalendar();
});

const setStep = step => {
  document.querySelectorAll(".booking-step").forEach(item => {
    item.classList.toggle("active", item.dataset.step === String(step));
  });
  document.querySelectorAll(".progress-step").forEach(item => {
    item.classList.toggle("active", Number(item.dataset.progress) <= step);
  });
};

continueBtn.addEventListener("click", () => {
  if (selectedDate && selectedTime) setStep(2);
});

document.querySelector("#back-to-calendar").addEventListener("click", () => setStep(1));

document.querySelector("#patient-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name");
  const reason = form.get("reason");

  document.querySelector("#confirmation-copy").textContent =
    `Thanks, ${name}. We've received your request for ${reason.toLowerCase()} on ${formatDate(selectedDate)} at ${selectedTime}. We'll be in touch shortly to confirm.`;

  setStep(3);
});

// Testimonials
const testimonials = [
  {
    quote: "I used to feel anxious before every dentist appointment. Dr. Zawadi completely changed that. I always leave feeling heard, looked after and genuinely proud of my smile.",
    name: "Amina M.",
    detail: "General check-up patient · Nairobi"
  },
  {
    quote: "The whole experience felt calm and easy. I finally understood what was happening with my teeth and what my options were.",
    name: "James O.",
    detail: "Whitening patient · Nairobi"
  },
  {
    quote: "My daughter actually asks when she can go back to the dentist now. That says everything about the care here.",
    name: "Lydia N.",
    detail: "Parent of a children's patient · Nairobi"
  },
  {
    quote: "I had an emergency and was seen quickly, with so much reassurance along the way. I couldn't have asked for better care.",
    name: "Sam K.",
    detail: "Emergency patient · Nairobi"
  }
];

const quote = document.querySelector("#testimonial-quote");
const testimonialName = document.querySelector("#testimonial-name");
const testimonialDetail = document.querySelector("#testimonial-detail");

document.querySelectorAll(".testimonial-btn").forEach(button => {
  button.addEventListener("click", () => {
    const item = testimonials[Number(button.dataset.testimonial)];
    quote.textContent = item.quote;
    testimonialName.textContent = item.name;
    testimonialDetail.textContent = item.detail;
    document.querySelectorAll(".testimonial-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

renderCalendar();
renderSlots();
