export type JobType = "Full-Time" | "Part-Time" | "Internship"
export type ExperienceLevel = "Entry Level" | "Mid Level" | "Senior Level"
export type GenderPreference = "Male" | "Female" | "All"
export type AgeCategory = "up to 20" | "21-30" | "31-40" | "41-50" | "51-60" | "60 and up"
export type DomainType = "TECH" | "NON-TECH" | "FINANCE" | "HEALTHCARE" | "MARKETING" | "EDUCATION"

export interface JobData {
  id: string
  title: string
  description: string
  jobType: JobType
  experienceLevel: ExperienceLevel
  softSkills: string[]
  hardSkills: string[]
  salaryRange: string | null
  genderPreference: GenderPreference
  isRemote: boolean
  stateName: string | null
  countryName: string | null
  companyName: string | null
  ageCategory: AgeCategory[]
  isDisabilityAllowed: boolean
  isPublished: boolean
  domainType: DomainType
  createdAt: string
}

export interface AnalyticsFilters {
  jobType?: JobType[]
  experienceLevel?: ExperienceLevel[]
  genderPreference?: GenderPreference[]
  isRemote?: boolean[]
  isDisabilityAllowed?: boolean[]
  domainType?: DomainType[]
  salaryRange?: string[]
}

export interface SummaryStats {
  totalJobs: number
  totalCompanies: number
  remoteJobs: number
  disabilityFriendlyJobs: number
  averageSalary: string
}
