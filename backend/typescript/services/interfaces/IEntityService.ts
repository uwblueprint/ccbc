export interface EntityRequestDTO {
  stringField: string;
  intField: number;
  enumField: string;
  stringArrayField: string[];
  boolField: boolean;
  filePath?: string;
  fileContentType?: string;
}

export interface EntityResponseDTO {
  id: string;
  stringField: string;
  intField: number;
  enumField: string;
  stringArrayField: string[];
  boolField: boolean;
  fileName: string;
}

export interface IEntityService {
  /**
   * retrieve the Entity with the given id
   * @param id entity id
   * @returns requested Entity
   * @throws Error if retrieval fails
   */
  getEntity(id: string): Promise<EntityResponseDTO>;

  /**
   * retrieve all Entities
   * @param
   * @returns returns array of Entities
   * @throws Error if retrieval fails
   */
  getEntities(): Promise<EntityResponseDTO[]>;

  /**
   * create an Entity with the fields given in the DTO, return created Entity
   * @param entity user's email
   * @returns the created Entity
   * @throws Error if creation fails
   */
  createEntity(entity: EntityRequestDTO): Promise<EntityResponseDTO>;

  /**
   * update the Entity with the given id with fields in the DTO, return updated Entity
   * @param id entity id
   * @param entity Updated Entity
   * @returns the updated Entity
   * @throws Error if update fails
   */
  updateEntity(
    id: string,
    entity: EntityRequestDTO,
  ): Promise<EntityResponseDTO | null>;

  /**
   * delete the entity with the given id
   * @param id entity id
   * @throws Error if deletion fails
   */
  deleteEntity(id: string): Promise<void>;
}
