import { z } from 'zod';
import CreateMatchSchema from '../schema/CreateMatchSchema';

type CreateMatchDto = z.infer<typeof CreateMatchSchema>;

export default CreateMatchDto;
