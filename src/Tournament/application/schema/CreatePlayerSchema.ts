import { z } from 'zod';

const CreatePlayerSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
});

export default CreatePlayerSchema;
