import { formatCurrency, formatDate, formatPhoneNumber, capitalizeWords } from '../formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('should format number as Colombian currency', () => {
      expect(formatCurrency(150000)).toContain('150');
    });

    it('should handle null and undefined', () => {
      expect(formatCurrency(null)).toBe('-');
      expect(formatCurrency(undefined)).toBe('-');
    });
  });

  describe('formatDate', () => {
    it('should format ISO date', () => {
      const result = formatDate('2025-01-15T10:30:00Z');
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });
  });
});
