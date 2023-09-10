import { z } from 'zod';
import AddScoreToMatchSchema from '../schema/AddScoreToMatchSchema';

type AddScoreToMatchDto = z.infer<typeof AddScoreToMatchSchema>;

export default AddScoreToMatchDto;
