import useSWR, { SWRConfiguration } from 'swr';
import { 
  PokemonAppEngine, 
  Pokemon, 
  Species, 
  PokemonType, 
  Ability,
  PaginatedResponse, 
  Raw,
  GetPaginatedOptions
} from 'pokemon-app-engine';

// Create a singleton instance
const engine = new PokemonAppEngine();

// ============================================
// Individual Hooks
// ============================================

/**
 * Fetch a single Pokémon by ID or name
 * @param id - Pokémon ID or name
 * @param config - SWR configuration options
 */
export function useGenericGet<T>(
  url: string,
  config?: SWRConfiguration
) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    url,
    () => engine.get<T>(
      url,
    ),
    config
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
}


/**
 * Fetch a single Pokémon by ID or name
 * @param id - Pokémon ID or name
 * @param config - SWR configuration options
 */
export function usePokemon(
  id: number | string | null | undefined,
  config?: SWRConfiguration
) {
  const { data, error, isLoading, mutate } = useSWR<Pokemon>(
    id ? `pokemon/${id}` : null,
    () => engine.getBy(id!),
    config
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
}

/**
 * Fetch Pokémon species by ID or name
 * @param id - Species ID or name
 * @param config - SWR configuration options
 */
export function useSpecies(
  id: number | string | null | undefined,
  config?: SWRConfiguration
) {
  const { data, error, isLoading, mutate } = useSWR<Species>(
    id ? `pokemon-species/${id}` : null,
    () => engine.getSpeciesBy(id!),
    config
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
}

/**
 * Fetch Pokémon type by ID or name
 * @param id - Type ID or name
 * @param config - SWR configuration options
 */
export function usePokemonType(
  id: number | string | null | undefined,
  config?: SWRConfiguration
) {
  const { data, error, isLoading, mutate } = useSWR<PokemonType>(
    id ? `type/${id}` : null,
    () => engine.getTypeBy(id!),
    config
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
}

/**
 * Fetch ability by ID or name
 * @param id - Ability ID or name
 * @param config - SWR configuration options
 */
export function useAbility(
  id: number | string | null | undefined,
  config?: SWRConfiguration
) {
  const { data, error, isLoading, mutate } = useSWR<Ability>(
    id ? `ability/${id}` : null,
    () => engine.get<Ability>(`${engine.baseUrl}/ability/${id}`),
    config
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
}

/**
 * Fetch paginated list of Pokémon
 * @param options - Pagination options (offset, limit)
 * @param config - SWR configuration options
 */
export function usePokemonList(
  options?: GetPaginatedOptions,
  config?: SWRConfiguration
) {
  const { offset = 0, limit = 20 } = options || {};
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Raw>>(
    `pokemon?offset=${offset}&limit=${limit}`,
    () => engine.getPokemons(options),
    config
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
}

/**
 * Fetch paginated list of species
 * @param options - Pagination options (offset, limit)
 * @param config - SWR configuration options
 */
export function useSpeciesList(
  options?: GetPaginatedOptions,
  config?: SWRConfiguration
) {
  const { offset = 0, limit = 20 } = options || {};
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Raw>>(
    `pokemon-species?offset=${offset}&limit=${limit}`,
    () => engine.getSpecies(options),
    config
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
}

/**
 * Fetch paginated list of abilities
 * @param options - Pagination options (offset, limit)
 * @param config - SWR configuration options
 */
export function useAbilitiesList(
  options?: GetPaginatedOptions,
  config?: SWRConfiguration
) {
  const { offset = 0, limit = 20 } = options || {};
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Raw>>(
    `ability?offset=${offset}&limit=${limit}`,
    () => engine.getAbilities(options),
    config
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
}

/**
 * Fetch all Pokémon types
 * @param config - SWR configuration options
 */
export function useTypesList(config?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Raw>>(
    'type',
    () => engine.getTypes(),
    config
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
}

/**
 * Fetch all generations
 * @param config - SWR configuration options
 */
export function useGenerationsList(config?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Raw>>(
    'generation',
    () => engine.getGenerations(),
    config
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
  };
}
