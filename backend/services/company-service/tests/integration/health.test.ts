import request from 'supertest';
import app from '../../src/index';

describe('Company Service Health Check', () => {
  it('should return OK status', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.service).toBe('company-service');
  });
});
