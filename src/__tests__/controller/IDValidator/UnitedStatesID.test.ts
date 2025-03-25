// tests/controllers/UnitedStatesID.test.ts
import { Request, Response } from 'express';
import ValidationController from '../../../controllers/IDValidatorController';
import { ValidationResult } from '../../../types/validation';

describe('UnitedStatesID Validation', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const responseResult = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  beforeEach(() => {
    mockRequest = {};
    mockResponse = responseResult;
    jest.clearAllMocks();
  });


    describe('validateUSDriversLicense', () => {
      it('should return 400 if license number is missing', () => {
        mockRequest.params = {};
        ValidationController.validateUSDriversLicense(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'US Driver\'s License number is required.' });
      });
  
      // Valid formats (4-16 alphanumeric characters)
      it('should return 200 for valid license (minimum length - 4 chars)', () => {
        mockRequest.params = { licenseNumber: 'A123' };
        ValidationController.validateUSDriversLicense(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      it('should return 200 for valid license (maximum length - 16 chars)', () => {
        mockRequest.params = { licenseNumber: 'ABCD1234EFGH5678' };
        ValidationController.validateUSDriversLicense(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      it('should return 200 for valid license (mixed case converted to uppercase)', () => {
        mockRequest.params = { licenseNumber: 'aBcD1234' };
        ValidationController.validateUSDriversLicense(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      // Invalid formats
      it('should return 400 for license that is too short (3 chars)', () => {
        mockRequest.params = { licenseNumber: 'A12' };
        ValidationController.validateUSDriversLicense(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for license that is too long (17 chars)', () => {
        mockRequest.params = { licenseNumber: 'ABCD1234EFGH56789' };
        ValidationController.validateUSDriversLicense(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for license with special characters', () => {
        mockRequest.params = { licenseNumber: 'A123-456' };
        ValidationController.validateUSDriversLicense(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for license with spaces', () => {
        mockRequest.params = { licenseNumber: 'A 123 456' };
        ValidationController.validateUSDriversLicense(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for empty string', () => {
        mockRequest.params = { licenseNumber: '' };
        ValidationController.validateUSDriversLicense(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
    });

  

    describe('validateUSSSN', () => {
      it('should return 400 if SSN is missing', () => {
        mockRequest.params = {};
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'US SSN is required.' });
      });
  
      // Valid SSN formats
      it('should return 200 for valid SSN (standard format)', () => {
        mockRequest.params = { ssn: '123-45-6789' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      // Invalid SSN formats
      it('should return 400 for SSN starting with 000', () => {
        mockRequest.params = { ssn: '000-45-6789' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for SSN starting with 666', () => {
        mockRequest.params = { ssn: '666-45-6789' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for SSN starting with 900-999', () => {
        mockRequest.params = { ssn: '900-45-6789' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for SSN with middle digits 00', () => {
        mockRequest.params = { ssn: '123-00-6789' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for SSN with last digits 0000', () => {
        mockRequest.params = { ssn: '123-45-0000' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for SSN without hyphens', () => {
        mockRequest.params = { ssn: '123456789' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for SSN with incorrect hyphen placement', () => {
        mockRequest.params = { ssn: '12-345-6789' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for SSN with letters', () => {
        mockRequest.params = { ssn: 'ABC-DE-FGHI' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for SSN that is too short', () => {
        mockRequest.params = { ssn: '123-45-678' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for SSN that is too long', () => {
        mockRequest.params = { ssn: '123-45-67890' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for empty string', () => {
        mockRequest.params = { ssn: '' };
        ValidationController.validateUSSSN(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
    });
    




    describe('validateUSMilitaryID', () => {
      it('should return 400 if Military ID is missing', () => {
        mockRequest.params = {};
        ValidationController.validateUSMilitaryID(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'US Military ID is required.' });
      });
  
      // Valid Military ID formats
      it('should return 200 for valid Military ID (minimum length - 10 chars)', () => {
        mockRequest.params = { militaryID: 'ABCD123456' };
        ValidationController.validateUSMilitaryID(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      it('should return 200 for valid Military ID (maximum length - 12 chars)', () => {
        mockRequest.params = { militaryID: 'ABCD12345678' };
        ValidationController.validateUSMilitaryID(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      it('should return 200 for valid Military ID (mixed case converted to uppercase)', () => {
        mockRequest.params = { militaryID: 'abCD123456' };
        ValidationController.validateUSMilitaryID(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      it('should return 200 for valid Military ID (all numbers)', () => {
        mockRequest.params = { militaryID: '1234567890' };
        ValidationController.validateUSMilitaryID(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      it('should return 200 for valid Military ID (all letters)', () => {
        mockRequest.params = { militaryID: 'ABCDEFGHIJ' };
        ValidationController.validateUSMilitaryID(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      // Invalid Military ID formats
      it('should return 400 for Military ID that is too short (9 chars)', () => {
        mockRequest.params = { militaryID: 'ABCD12345' };
        ValidationController.validateUSMilitaryID(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for Military ID that is too long (13 chars)', () => {
        mockRequest.params = { militaryID: 'ABCD123456789' };
        ValidationController.validateUSMilitaryID(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for Military ID with special characters', () => {
        mockRequest.params = { militaryID: 'ABCD-123456' };
        ValidationController.validateUSMilitaryID(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for Military ID with spaces', () => {
        mockRequest.params = { militaryID: 'ABCD 123456' };
        ValidationController.validateUSMilitaryID(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for empty string', () => {
        mockRequest.params = { militaryID: '' };
        ValidationController.validateUSMilitaryID(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
    });



    describe('validateUSGreenCard', () => {
      it('should return 400 if Green Card number is missing', () => {
        mockRequest.params = {};
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'US Greencard Number is required.' });
      });
  
      // Valid Green Card formats (based on regex: /^([A-Z]{3}\d{10}|[A-Z]\d{8,9})$/)
      it('should return 200 for valid Green Card (format: 3 letters + 10 digits)', () => {
        mockRequest.params = { greenCardNumber: 'ABC1234567890' }; // 3 letters + 10 digits
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      it('should return 200 for valid Green Card (format: 1 letter + 8 digits)', () => {
        mockRequest.params = { greenCardNumber: 'A12345678' }; // 1 letter + 8 digits
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      it('should return 200 for valid Green Card (format: 1 letter + 9 digits)', () => {
        mockRequest.params = { greenCardNumber: 'B123456789' }; // 1 letter + 9 digits
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
  
      // Invalid Green Card formats
      it('should return 400 for Green Card with 2 letters + 8 digits (invalid format)', () => {
        mockRequest.params = { greenCardNumber: 'AB12345678' }; // 2 letters + 8 digits (invalid)
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for Green Card with 3 letters + 9 digits (invalid length)', () => {
        mockRequest.params = { greenCardNumber: 'ABC123456789' }; // 3 letters + 9 digits (invalid)
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for Green Card with 1 letter + 7 digits (too short)', () => {
        mockRequest.params = { greenCardNumber: 'A1234567' }; // 1 letter + 7 digits (invalid)
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for Green Card with 1 letter + 10 digits (too long)', () => {
        mockRequest.params = { greenCardNumber: 'A1234567890' }; // 1 letter + 10 digits (invalid)
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for Green Card with lowercase letters', () => {
        mockRequest.params = { greenCardNumber: 'abc1234567890' }; // Lowercase letters (invalid)
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for Green Card with special characters', () => {
        mockRequest.params = { greenCardNumber: 'ABC-123-4567' }; // Hyphens (invalid)
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for Green Card with spaces', () => {
        mockRequest.params = { greenCardNumber: 'ABC 123 4567' }; // Spaces (invalid)
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
  
      it('should return 400 for empty string', () => {
        mockRequest.params = { greenCardNumber: '' };
        ValidationController.validateUSGreenCard(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
      });
    });

    


});