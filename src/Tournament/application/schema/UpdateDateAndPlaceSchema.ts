import { z } from 'zod';

const UpdateDateAndPlaceSchema = z.object({
  date: z.string(),
  place: z.union([z.literal('GATO'), z.literal('SOCIAL')]),
});

export default UpdateDateAndPlaceSchema;
