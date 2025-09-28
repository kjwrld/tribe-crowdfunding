import validator from 'validator';

export interface FieldError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: FieldError[];
}

export const validateContactForm = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): FormValidation => {
  const errors: FieldError[] = [];

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  // Email validation
  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validator.isEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Subject validation
  if (!data.subject || data.subject.trim().length === 0) {
    errors.push({ field: 'subject', message: 'Subject is required' });
  } else if (data.subject.trim().length < 3) {
    errors.push({ field: 'subject', message: 'Subject must be at least 3 characters' });
  }

  // Message validation
  if (!data.message || data.message.trim().length === 0) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getFieldError = (errors: FieldError[], fieldName: string): string | null => {
  const error = errors.find(err => err.field === fieldName);
  return error ? error.message : null;
};