"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import type { JobWithApplication } from "./types"
import { JobCard } from "./ApplicationCard"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"

export function ApplicationList() {
    //   const queryClient = useQueryClient()
    const [applications] = trpc.applications.getApplicationsByCandidate.useSuspenseQuery();
    const removeApplicationMutation = trpc.applications.removeApplication.useMutation({
        onSuccess: () => {
            utils.applications.getApplicationsByCandidate.invalidate();
            toast("Your Application is removed from jobs!")
        }
    })
    const createApplicationMutation = trpc.applications.createApplication.useMutation({
        onSuccess: () => {
            utils.applications.getApplicationsByCandidate.invalidate();
            toast("Your Resume updated!");
        }
    })
    const utils = trpc.useUtils();

    // This would be your tRPC call to get jobs with applications
    //   const { data: jobs } = useSuspenseQuery({
    //     queryKey: ["jobs-with-applications"],
    //     queryFn: async () => {
    //       // Replace with your actual tRPC call
    //       // return trpc.job.getJobsWithApplications.query()

    //       // Mock data for demonstration
    //       return [
    //         {
    //           id: "job-1",
    //           title: "Senior Full Stack Developer",
    //           description:
    //             "We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies like React, Node.js, and TypeScript. The ideal candidate should have strong problem-solving skills and experience with cloud platforms.",
    //           jobType: "Full-Time" as const,
    //           experienceLevel: "Senior Level" as const,
    //           softSkills: ["Communication", "Team Leadership", "Problem Solving"],
    //           hardSkills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    //           salaryRange: "₹15 LPA - ₹25 LPA",
    //           genderPreference: "All" as const,
    //           isRemote: true,
    //           stateName: "Karnataka",
    //           countryName: "India",
    //           companyName: "TechCorp Solutions",
    //           ageCategory: ["21-30", "31-40"],
    //           isDisabilityAllowed: true,
    //           companyId: "company-1",
    //           createdAt: new Date("2024-01-15"),
    //           updatedAt: new Date("2024-01-15"),
    //           application: {
    //             id: "app-1",
    //             jobId: "job-1",
    //             candidateId: "candidate-1",
    //             resumeId: "resume-1",
    //             applicationStatus: "PENDING" as const,
    //             appliedAt: new Date("2024-01-20"),
    //           },
    //           appliedWithResume: {
    //             id: "resume-1",
    //             title: "Software Engineer Resume",
    //             firstName: "John",
    //             lastName: "Doe",
    //             jobTitle: "Full Stack Developer",
    //             summary: "Experienced developer with 5+ years in React and Node.js",
    //             photoUrl: "/placeholder.svg?height=40&width=40",
    //             isDefault: true,
    //             experienceLevel: "Mid Level" as const,
    //             jobType: "Full-Time" as const,
    //             skillType: "TECH" as const,
    //             createdAt: new Date("2024-01-15"),
    //           },
    //         },
    //         {
    //           id: "job-2",
    //           title: "Frontend Developer",
    //           description:
    //             "Join our frontend team to build beautiful and responsive user interfaces. We work with React, TypeScript, and modern CSS frameworks. You'll collaborate with designers and backend developers to create seamless user experiences.",
    //           jobType: "Full-Time" as const,
    //           experienceLevel: "Mid Level" as const,
    //           softSkills: ["Creativity", "Attention to Detail", "Collaboration"],
    //           hardSkills: ["React", "TypeScript", "CSS", "Figma", "Jest"],
    //           salaryRange: "₹8 LPA - ₹15 LPA",
    //           genderPreference: "All" as const,
    //           isRemote: false,
    //           stateName: "Maharashtra",
    //           countryName: "India",
    //           companyName: "Design Studio Inc",
    //           ageCategory: ["21-30", "31-40"],
    //           isDisabilityAllowed: false,
    //           companyId: "company-2",
    //           createdAt: new Date("2024-01-18"),
    //           updatedAt: new Date("2024-01-18"),
    //         },
    //         {
    //           id: "job-3",
    //           title: "Backend Developer",
    //           description:
    //             "We're seeking a skilled Backend Developer to design and implement robust server-side applications. You'll work with Node.js, databases, and cloud services to build scalable APIs and microservices.",
    //           jobType: "Full-Time" as const,
    //           experienceLevel: "Mid Level" as const,
    //           softSkills: ["Problem Solving", "Analytical Thinking", "Team Collaboration"],
    //           hardSkills: ["Node.js", "Express", "MongoDB", "Docker", "Kubernetes"],
    //           salaryRange: "₹10 LPA - ₹18 LPA",
    //           genderPreference: "All" as const,
    //           isRemote: true,
    //           stateName: "Tamil Nadu",
    //           countryName: "India",
    //           companyName: "CloudTech Systems",
    //           ageCategory: ["21-30", "31-40"],
    //           isDisabilityAllowed: true,
    //           companyId: "company-3",
    //           createdAt: new Date("2024-01-20"),
    //           updatedAt: new Date("2024-01-20"),
    //         },
    //       ] as JobWithApplication[]
    //     },
    //   })

    const handleApply = async (jobId: string, resumeId: string) => {
        try {
            console.log("resumeId", resumeId)
            createApplicationMutation.mutate({ jobId, resumeId })
        } catch (error) {
            console.error("Failed to apply:", error)
            toast("Failed to update!")
            throw error
        }
    }

    const handleRemoveApplication = async (jobId: string) => {
        try {
            removeApplicationMutation.mutate({ jobId });
        } catch (error) {
            console.error("Failed to remove application:", error)
            toast("Failed to remove application!")
            throw error
        }
    }

    if (!applications || applications.length === 0) {
        return (
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>No jobs found. Check back later for new opportunities!</AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Available Jobs ({applications.length})</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1">
                {/* 
          Maps each job in the list to a JobCard component, 
          providing the job details, apply, and remove application callbacks.
        */}
                {applications.map((application: JobWithApplication) => (
                    <JobCard key={application.id} job={application} onApply={handleApply} onRemoveApplication={handleRemoveApplication} />
                ))}
            </div>
        </div>
    )
}

export function JobsListSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-4 p-6 border rounded-lg">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-20 w-full" />
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
