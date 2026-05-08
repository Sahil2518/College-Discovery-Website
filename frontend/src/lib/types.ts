export interface College {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  type: 'GOVERNMENT' | 'PRIVATE' | 'DEEMED';
  establishedYear?: number;
  city: string;
  state: string;
  address?: string;
  websiteUrl?: string;
  affiliation?: string;
  approval?: string;
  rating: number;
  totalReviews: number;
  admissionProcess?: string;
  courses?: CollegeCourseRelation[];
  exams?: CollegeExamRelation[];
  placements?: Placement[];
  rankings?: Ranking[];
  reviews?: Review[];
  cutoffs?: Cutoff[];
}

export interface CollegeCourseRelation {
  id: number;
  fee?: number;
  seats?: number;
  eligibility?: string;
  course: Course;
}

export interface CollegeExamRelation {
  id: number;
  exam: Exam;
}

export interface Course {
  id: number;
  name: string;
  slug: string;
  stream: string;
  durationYears: number;
  level: string;
  description?: string;
  eligibility?: string;
  avgFee?: number;
  _count?: { colleges: number };
}

export interface Exam {
  id: number;
  name: string;
  slug: string;
  fullName: string;
  type: string;
  conductingBody: string;
  examDate?: string;
  registrationStart?: string;
  registrationEnd?: string;
  eligibility?: string;
  examPattern?: string;
  _count?: { colleges: number };
}

export interface Placement {
  id: number;
  year: number;
  highestPackage?: number;
  avgPackage?: number;
  medianPackage?: number;
  placementRate?: number;
  topRecruiters: string[];
}

export interface Ranking {
  id: number;
  body: string;
  rank: number;
  year: number;
}

export interface Review {
  id: number;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  user: { id: number; name: string; avatarUrl?: string };
}

export interface Cutoff {
  id: number;
  category: string;
  minRank: number;
  maxRank?: number;
  year: number;
  exam: { name: string };
}

export interface CompareCollege {
  id: number;
  name: string;
  slug: string;
  logoUrl?: string;
  type: string;
  establishedYear?: number;
  city: string;
  state: string;
  rating: number;
  totalReviews: number;
  totalCourses: number;
  feeRange: { min: number | null; max: number | null };
  placement: Placement | null;
  ranking: Ranking | null;
  examsAccepted: string[];
  courses: string[];
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  authorName: string;
  category?: string;
  readTime?: number;
  publishedAt: string;
}

export interface SavedCollege {
  id: number;
  createdAt: string;
  college: College;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: { page: number; limit: number; total: number; totalPages: number };
  error?: { code: string; message: string };
}

export interface CollegeFilters {
  search?: string;
  state?: string;
  city?: string;
  type?: string;
  minFee?: number;
  maxFee?: number;
  minRating?: number;
  course?: string;
  exam?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}
