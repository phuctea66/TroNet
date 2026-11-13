export function validatePhone(phone) {
  if (!phone || !phone.trim()) return "Phone number is required";
  const cleanPhone = phone.trim().replace(/[\s.-]/g, '');
  // Validates standard 10-digit VN mobile numbers or numbers starting with +84/0
  const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return "Please enter a valid 10-digit mobile number (e.g., 0912345678)";
  }
  return null;
}

export function validateEmail(email) {
  if (!email || !email.trim()) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address (e.g. user@example.com)";
  }
  return null;
}

export function validateRequired(value, fieldName = "This field") {
  if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
}

export function validatePositiveNumber(value, fieldName = "Value") {
  if (value === undefined || value === null || value === '') {
    return `${fieldName} is required`;
  }
  const num = Number(value);
  if (isNaN(num) || num <= 0) {
    return `${fieldName} must be a number greater than 0`;
  }
  return null;
}

export function validateFutureDate(dateString, fieldName = "Date") {
  if (!dateString) return `${fieldName} is required`;
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(selectedDate.getTime())) {
    return "Invalid date format";
  }

  if (selectedDate < today) {
    return `${fieldName} cannot be in the past`;
  }
  return null;
}
