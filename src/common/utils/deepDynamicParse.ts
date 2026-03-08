export function deepDynamicParse(value: unknown): unknown {
    // If string → attempt parsing
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
  
        // Only convert if object or array
        if (
          typeof parsed === "object" &&
          parsed !== null
        ) {
          return deepDynamicParse(parsed);
        }
  
        return value;
      } catch {
        return value;
      }
    }
  
    // If array → map recursively
    if (Array.isArray(value)) {
      return value.map((item) => deepDynamicParse(item));
    }
  
    // If object → recurse properties
    if (
      typeof value === "object" &&
      value !== null
    ) {
      const result: Record<string, unknown> = {};
  
      for (const key in value as Record<string, unknown>) {
        result[key] = deepDynamicParse(
          (value as Record<string, unknown>)[key]
        );
      }
  
      return result;
    }
  
    // Primitive → return as-is
    return value;
}