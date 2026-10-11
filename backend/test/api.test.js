const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const {
  appointmentSchema,
  mealSchema,
  registerSchema,
  reminderSchema,
} = require('../src/validation');

test('health endpoint reports a disconnected database as unavailable', async () => {
  const response = await request(app).get('/api/health');
  assert.equal(response.status, 503);
  assert.deepEqual(response.body, { status: 'degraded', database: 'disconnected' });
});

test('health endpoint does not claim readiness while MongoDB is disconnected', () => {
  assert.notEqual(mongoose.connection.readyState, 1);
});

test('registration requires a valid role, email, and strong-enough password', () => {
  assert.equal(registerSchema.safeParse({
    name: 'Sam Patient',
    email: 'sam@example.com',
    password: 'long-enough-password',
    role: 'patient',
  }).success, true);
  assert.equal(registerSchema.safeParse({
    name: 'Sam Patient',
    email: 'not-an-email',
    password: 'short',
    role: 'administrator',
  }).success, false);
});

test('reminder dates must include a timezone and meal logs require foods', () => {
  assert.equal(reminderSchema.safeParse({ title: 'Check in', dueAt: '2026-10-11T09:00:00Z' }).success, true);
  assert.equal(reminderSchema.safeParse({ title: 'Check in', dueAt: 'tomorrow' }).success, false);
  assert.equal(mealSchema.safeParse({ mealType: 'lunch', foods: [] }).success, false);
});

test('appointment payloads reject missing or invalid dates', () => {
  assert.equal(appointmentSchema.safeParse({ title: 'Care visit', startsAt: '2026-10-20T10:30:00+01:00' }).success, true);
  assert.equal(appointmentSchema.safeParse({ title: 'Care visit', startsAt: 'next week' }).success, false);
});

test('unknown routes return a JSON not-found response', async () => {
  const response = await request(app).get('/api/unknown');
  assert.equal(response.status, 404);
  assert.match(response.body.error, /No route/);
});

test('care and health records require an authenticated session', async () => {
  for (const route of ['/api/care/links', '/api/reminders', '/api/meals', '/api/appointments']) {
    const response = await request(app).get(route);
    assert.equal(response.status, 401, `${route} should reject anonymous requests`);
  }
});
