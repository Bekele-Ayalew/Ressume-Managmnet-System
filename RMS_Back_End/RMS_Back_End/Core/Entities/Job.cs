using RMS_Back_End.Core.Enums;

namespace RMS_Back_End.Core.Entities
{
    public class Job:BaseEntity
    {
        public string Title { get; set; }
        public JobLevel Level { get; set; }

        // Relations
        public long CompanyId { get; set; }
        public Company Company { get; set; }// one to one relation ==>One job belongs to one one company
        public ICollection<Candidate> Candidates { get; set; }

    }
}
