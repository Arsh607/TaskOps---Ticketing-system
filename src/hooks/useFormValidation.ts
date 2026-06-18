import { useState } from 'react'

export type ValidationRules = {
  [field: string]: Array<(value: string) => string | null>
}

/**
 * Custom hook for managing form validation state and logic
 * Provides presentation logic for validating form fields and displaying errors
 *
 * @param initialErrors - Initial error state (default: empty object)
 * @returns An object containing:
 *   - errors: Object with error messages keyed by field name
 *   - setErrors: Function to update the errors object
 *   - clearErrors: Function to clear all errors
 *   - clearFieldError: Function to clear error for a specific field
 *   - validateFields: Function to validate multiple fields against provided rules
 *   - hasErrors: Function to check if any errors exist
 *
 * @example
 * const { errors, validateFields, clearErrors } = useFormValidation()
 * const rules = {
 *   title: [(value) => !value.trim() ? 'Title is required' : null],
 *   owner: [(value) => !value.trim() ? 'Owner is required' : null]
 * }
 * const handleSubmit = (e) => {
 *   e.preventDefault()
 *   if (!validateFields(formData, rules)) return
 *   // submit form
 * }
 */
export function useFormValidation(
  initialErrors: Record<string, string> = {}
) {
  const [errors, setErrors] = useState<Record<string, string>>(initialErrors)

  const clearErrors = () => {
    setErrors({})
  }

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
      const updated = { ...prev }
      delete updated[field]
      return updated
    })
  }

  const validateFields = (
    data: Record<string, string>,
    rules: ValidationRules
  ): boolean => {
    const newErrors: Record<string, string> = {}

    for (const field in rules) {
      const validators = rules[field]
      for (const validator of validators) {
        const error = validator(data[field] || '')
        if (error) {
          newErrors[field] = error
          break
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const hasErrors = (): boolean => {
    return Object.keys(errors).length > 0
  }

  return {
    errors,
    setErrors,
    clearErrors,
    clearFieldError,
    validateFields,
    hasErrors,
  }
}
