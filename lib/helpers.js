export const API_BASE =
  "https://openapi.programming-hero.com/api/bazardor";

export function banglaToEnglishNumber(value = "") {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  const converted = String(value).replace(
    /[০-৯]/g,
    (digit) => banglaDigits.indexOf(digit)
  );

  const cleanNumber = converted
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  return Number(cleanNumber) || 0;
}

export function toBanglaNumber(value) {
  const banglaDigits = [
    "০",
    "১",
    "২",
    "৩",
    "৪",
    "৫",
    "৬",
    "৭",
    "৮",
    "৯",
  ];

  return String(value).replace(
    /\d/g,
    (digit) => banglaDigits[Number(digit)]
  );
}

export function formatBanglaPrice(value) {
  const number = Number(value) || 0;

  const formatted = new Intl.NumberFormat(
    "bn-BD"
  ).format(number);

  return `${formatted} টাকা`;
}

export function getBanglaDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}