import { CandidateWithResume } from "@/modules/candidates/server/procedure";
import { Heart } from "lucide-react";
import { useFavoriteCandidates } from "@/hooks/useFavCandidates";
export const CandidateAction = ({ candidate }: { candidate: CandidateWithResume }) => {
    const { isFavorite, toggleFavorite } = useFavoriteCandidates()
    return (
        <div className="w-full flex items-center justify-center">
            <Heart
                className={`w-4 h-4 cursor-pointer ${isFavorite(candidate.id) ? "fill-red-500 text-red-500" : "fill-gray-500 text-gray-500"
                    }`}
                onClick={() => toggleFavorite(candidate.id)}
            />
        </div>
    );
};