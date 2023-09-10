import { z } from 'zod';

const AddScoreToMatchSchema = z.object({
  sets: z
    .array(
      z.object({
        gamesTeam1: z.number(),
        gamesTeam2: z.number(),
      }),
    )
    .max(3),
  winners: z.array(z.number()).max(2),
  lossers: z.array(z.number()).max(2),
});

export default AddScoreToMatchSchema;
