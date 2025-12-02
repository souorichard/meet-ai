import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server'
import { DEFAULT_PAGE } from '@/utils/contants'

export const filtersSearchParams = {
  search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
}

export const loadSearchParams = createLoader(filtersSearchParams)
