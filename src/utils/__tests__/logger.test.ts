/**
 * Tests para sistema de logging
 */

import { logger, LogLevel } from '../logger';

describe('Logger', () => {
  beforeEach(() => {
    logger.clearLogs();
    jest.spyOn(console, 'debug').mockImplementation();
    jest.spyOn(console, 'info').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debe registrar mensajes de debug', () => {
    logger.debug('Test debug message', { component: 'TestComponent' });
    const logs = logger.getLogs();

    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogLevel.DEBUG);
    expect(logs[0].message).toBe('Test debug message');
  });

  it('debe registrar mensajes de error con contexto', () => {
    const testError = new Error('Test error');
    logger.error('Error occurred', testError, { component: 'TestComponent' });

    const logs = logger.getLogs();
    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogLevel.ERROR);
    expect(logs[0].error).toBe(testError);
  });

  it('debe mantener solo los últimos 100 logs', () => {
    for (let i = 0; i < 150; i++) {
      logger.info(`Log ${i}`);
    }

    const logs = logger.getLogs();
    expect(logs.length).toBe(100);
  });

  it('debe limpiar todos los logs', () => {
    logger.info('Test 1');
    logger.info('Test 2');
    logger.clearLogs();

    expect(logger.getLogs().length).toBe(0);
  });
});
