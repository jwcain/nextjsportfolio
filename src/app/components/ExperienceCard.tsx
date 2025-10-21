//import "./ExperienceCard.css";
import { Experience } from "@/app/Types";
type ExperienceCardProps = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="bg-black/10 p-3 rounded-2xl shadow-inner shadow-black/30">
      {/* Header */}
      <div className="flex flex-row w-full pb-2 border-b border-[var(--accent-light)]">
        {/* Left */}
        <div className="flex flex-col items-start justify-start w-full">
          <span className="text-xl font-semibold">{experience.title}</span>
          <span className="italic text-sm opacity-90">
            {experience.employer}
          </span>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end justify-end w-full text-right">
          <span className="text-sm">{experience.date}</span>
          <span className="italic text-sm opacity-90">
            {experience.location}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm p-2">{experience.description}</p>

      {/* Details */}
      <div className="flex flex-col gap-2 flex-1 rounded-2xl bg-black/10 p-3 shadow-inner shadow-black/30">
        {experience.details.map((detail, index) => (
          <div key={index}>
            <span>♦ {detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
