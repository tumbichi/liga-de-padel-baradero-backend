import { z } from 'zod';
import CreatePlayerSchema from '../schema/CreatePlayerSchema';

type CreatePlayerDto = z.infer<typeof CreatePlayerSchema>;

export default CreatePlayerDto;
