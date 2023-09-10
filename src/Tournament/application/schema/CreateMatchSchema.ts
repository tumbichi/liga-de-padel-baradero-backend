import { z } from 'zod';

const CreateMatchSchema = z.object({
  playersIds: z.array(z.number()),
  roundId: z.number(),
});

export default CreateMatchSchema;
