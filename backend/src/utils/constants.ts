export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;
export const MAX_COMPARE_COLLEGES = 3;
export const MIN_COMPARE_COLLEGES = 2;
export const SALT_ROUNDS = 10;
export const JWT_EXPIRY = '7d';

export const COLLEGE_TYPES = ['GOVERNMENT', 'PRIVATE', 'DEEMED'] as const;
export const EXAM_TYPES = ['ENGINEERING', 'MEDICAL', 'MBA', 'LAW', 'OTHER'] as const;
export const COURSE_LEVELS = ['UNDERGRADUATE', 'POSTGRADUATE', 'DIPLOMA', 'DOCTORATE'] as const;

export const SORT_OPTIONS = {
  RATING_DESC: 'rating_desc',
  RATING_ASC: 'rating_asc',
  FEES_ASC: 'fees_asc',
  FEES_DESC: 'fees_desc',
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
  ESTABLISHED_DESC: 'established_desc',
} as const;
