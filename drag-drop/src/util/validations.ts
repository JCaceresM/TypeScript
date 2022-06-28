export interface ValidateOptions {
  value: number | string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  max?: number;
  min?: number;
}

export function validate(validatableInputs: ValidateOptions[]) {
  let isValid = true;
  for (let i = 0; i < validatableInputs.length; i++) {
    const validatableInput = validatableInputs[i];
    if (validatableInput.required) {
      isValid =
        isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
      validatableInput.maxLength !== null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid &&
        validatableInput.value.toString().length <
          (validatableInput.maxLength as number);
    }
    if (
      validatableInput.minLength !== null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid &&
        validatableInput.value.toString().length >
          (validatableInput.minLength as number);
    }
    if (
      validatableInput.min !== null &&
      typeof validatableInput.value === "number"
    ) {
      isValid =
        isValid && validatableInput.value >= (validatableInput.min as number);
    }
    if (
      validatableInput.max !== null &&
      typeof validatableInput.value === "number"
    ) {
      isValid =
        isValid && validatableInput.value <= (validatableInput.max as number);
    }
  }
  return isValid;
}