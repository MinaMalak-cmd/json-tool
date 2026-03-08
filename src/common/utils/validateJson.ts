export interface ValidationResult {
    isValid: boolean;
    error?: string;
  }
  
export function validateJson(input: string): ValidationResult {
    try {
        JSON.parse(input);
        return { isValid: true };
    } catch (error) {
        if (error instanceof Error) {
            return {
                isValid: false,
                error: error.message
            };
        }

        return {
            isValid: false,
            error: "Invalid JSON"
        };
    }
}