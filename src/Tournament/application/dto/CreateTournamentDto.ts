import { z } from 'zod';
import CreateTournamentSchema from '../schema/CreateTournamentSchema';

type CreateTournamentDto = z.infer<typeof CreateTournamentSchema>;

export default CreateTournamentDto;
