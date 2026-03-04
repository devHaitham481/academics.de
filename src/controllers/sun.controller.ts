import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getSunHoursForCity } from '@services/sun.service';
import { createError } from '@middleware/error.middleware';

const querySchema = z.object({
  city: z.string().min(1, 'city must not be empty'),
});

export async function getSunHours(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const parsed = querySchema.safeParse(req.query);

  if (!parsed.success) {
    return next(createError('city query parameter is required', 400));
  }

  try {
    const result = await getSunHoursForCity(parsed.data.city);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
