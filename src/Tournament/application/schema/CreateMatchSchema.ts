import { z } from 'zod';

const CreateMatchSchema = z.object({
  couple1Ids: z.array(z.number()),
  couple2Ids: z.array(z.number()),
  roundId: z.number(),
});

export default CreateMatchSchema;
