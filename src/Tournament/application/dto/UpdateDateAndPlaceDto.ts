import { z } from 'zod';
import UpdateDateAndPlaceSchema from '../schema/UpdateDateAndPlaceSchema';

type UpdateDateAndPlaceDto = z.infer<typeof UpdateDateAndPlaceSchema>;

export default UpdateDateAndPlaceDto;
