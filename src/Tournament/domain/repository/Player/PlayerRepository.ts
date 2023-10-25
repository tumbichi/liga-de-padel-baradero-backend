import BaseRepositoryWithPagination from 'Base/repository/BaseRepositoryWithPagination';
import Player from 'Tournament/domain/model/Player/Player';

export default abstract class PlayerRepository extends BaseRepositoryWithPagination<Player> {}
