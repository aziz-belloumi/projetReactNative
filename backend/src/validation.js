const { z } = require('zod');

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id.');
const date = z.string().datetime({ offset: true });

const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128),
  role: z.enum(['patient', 'companion']),
});

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(128),
});

const reminderSchema = z.object({
  title: z.string().trim().min(1).max(120),
  dueAt: date,
  note: z.string().trim().max(500).optional(),
  completed: z.boolean().optional(),
});

const mealSchema = z.object({
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  loggedAt: date.optional(),
  foods: z.array(
    z.object({
      name: z.string().trim().min(1).max(120),
      sugarInfo: z.string().trim().min(1).max(24),
    }),
  ).min(1).max(30),
});

const appointmentSchema = z.object({
  title: z.string().trim().min(1).max(120),
  startsAt: date,
  location: z.string().trim().max(160).optional(),
  notes: z.string().trim().max(500).optional(),
});

const inviteSchema = z.object({ code: z.string().trim().min(8).max(32) });
const patientIdSchema = objectId;

module.exports = {
  appointmentSchema,
  inviteSchema,
  loginSchema,
  mealSchema,
  patientIdSchema,
  registerSchema,
  reminderSchema,
};
