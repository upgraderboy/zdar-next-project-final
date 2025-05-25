import { GetAllJobsOutput } from "@/types"
import { trpc } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"
import JobApplicationModal from "@/modules/resumes/ui/components/ResumeSelectModal"
import { useFavoriteJobs } from "@/hooks/useFavJobs"
export default function JobAction({ job }: { job: GetAllJobsOutput[number] }) {
  const { data: status } = trpc.job.checkApplied.useQuery({ jobId: job.id });
  // const { mutate: toggleApplication } = trpc.job.toggleApplication.useMutation()
  const { isFavorite, toggleFavorite } = useFavoriteJobs();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <JobApplicationModal jobId={job.id} isOpen={showModal} onClose={() => setShowModal(false)} />
      <span className="text-xs text-gray-500">{job.experienceLevel}</span>
      {
        (
          <div className="flex items-center gap-2">
            <Button variant="outline" className="ml-auto" onClick={() => setShowModal(true)}>
              {status ? "Applied" : "Apply"}
            </Button>
            <Heart
              className={`w-4 h-4 cursor-pointer ${
                isFavorite(job.id) ? "fill-red-500 text-red-500" : "fill-gray-500 text-gray-500"
              }`}
              onClick={() => toggleFavorite(job.id)}
            />
          </div>
        )
      }
    </div>
  )
}