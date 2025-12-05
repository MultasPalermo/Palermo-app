/**
 * Tests para esquemas de validación con Zod
 */

import { UserSchema, InfraccionAPISchema, validateData } from '../schemas';

describe('Zod Schemas', () => {
  describe('UserSchema', () => {
    it('should validate a valid user', () => {
      const validUser = {
        id: 1,
        userName: 'testuser',
        firstName: 'John',
        lastName: 'Doe',
        documentTypeId: 1,
        documentNumber: '123456789'
      };

      const result = validateData(UserSchema, validUser);
      expect(result).toEqual(validUser);
    });

    it('should accept optional fields missing', () => {
      const minimalUser = {
        id: 1
      };

      const result = validateData(UserSchema, minimalUser);
      expect(result).toMatchObject(minimalUser);
    });

    it('should reject invalid user without id', () => {
      const invalidUser = {
        userName: 'testuser'
      };

      const result = validateData(UserSchema, invalidUser);
      expect(result).toBeNull();
    });
  });

  describe('InfraccionAPISchema', () => {
    it('should validate a valid infraccion', () => {
      const validInfraccion = {
        id: '1',
        typeInfractionName: 'Estacionamiento indebido',
        observations: 'Estacionado en zona prohibida',
        valor: 50000
      };

      const result = validateData(InfraccionAPISchema, validInfraccion);
      expect(result).toMatchObject(validInfraccion);
    });

    it('should accept all fields as optional', () => {
      const emptyInfraccion = {};

      const result = validateData(InfraccionAPISchema, emptyInfraccion);
      expect(result).toEqual({});
    });

    it('should accept monto as string or number', () => {
      const infraccionWithStringMonto = { monto: '50000' };
      const infraccionWithNumberMonto = { monto: 50000 };

      expect(validateData(InfraccionAPISchema, infraccionWithStringMonto)).toMatchObject(infraccionWithStringMonto);
      expect(validateData(InfraccionAPISchema, infraccionWithNumberMonto)).toMatchObject(infraccionWithNumberMonto);
    });
  });
});
