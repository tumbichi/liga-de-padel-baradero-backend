import { z } from 'zod';

const CreateTournamentSchema = z.object({
  description: z.string(),
  beginsAt: z.string(),
  endsAt: z.string(),
  countOfRounds: z.number(),
  playerIds: z.array(z.number()),
});

export default CreateTournamentSchema;
