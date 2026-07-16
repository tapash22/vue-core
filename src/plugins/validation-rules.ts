export function required(value: string) {
  if (value !== undefined && value !== '' && value !== null) return true;
  else return 'This field is required';
}
export function email(value: string) {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || 'Email is invalid';
}
export function password(value: string) {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return (
    pattern.test(value) ||
    'Password must contain a minimum of 8 letters with atleast 1 uppercase, 1 lowercase, 1 numeric and 1 special character (@$!%*?&)'
  );
}
export function confirmPassword(confirmPassword: string) {
  return (password: string) => {
    return password === confirmPassword || 'Passwords do not match';
  };
}

export function noWhiteSpace(value: string) {
  if (!value) {
    return 'This field is required';
  } else if (/[^a-zA-Z0-9]/.test(value)) {
    return 'Value should contain only alphabets and numbers';
  } else if (/\s/.test(value)) {
    return 'Input should not contain any space characters';
  } else {
    return true;
  }
}

export function dbValidation(value: string) {
  if (!value) {
    return 'This field is required';
  } else if (/[^a-zA-Z0-9]/.test(value)) {
    return 'Value should contain only alphabets and numbers';
  } else {
    return true;
  }
}

export function validateValue(value: string) {
  if (!value) {
    return 'This field is required';
  } else if (!/^\d+$/.test(value)) {
    return 'Value must be an integer';
  } else if (parseInt(value) <= 4095) {
    return 'Value must be greater than 4095 MB';
  } else {
    return true;
  }
}

export function databaseUser(value: string) {
  if (!value) {
    return 'This field is required';
  } else if (!/^.{4,}$/.test(value)) {
    return 'Database username at least 4 characters';
  } else {
    return true;
  }
}

export function databasePassword(value: string) {
  if (!value) {
    return 'This field is required';
  } else if (!/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{8,}/.test(value)) {
    return 'password at least 8 character with uppercase and lowercase';
  } else {
    return true;
  }
}
