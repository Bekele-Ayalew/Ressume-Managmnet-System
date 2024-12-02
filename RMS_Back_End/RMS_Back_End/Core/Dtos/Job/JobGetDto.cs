using RMS_Back_End.Core.Enums;

namespace RMS_Back_End.Core.Dtos.Job
{
    public class JobGetDto
    {
        public string Title { get; set; }
        public JobLevel Level { get; set; }
        public long ID { get; set; }
        public bool IsActive { get; set; } = true;
        // Relations
        public long CompanyId { get; set; }
        public string CompanyName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime ModifiedAt { get; set; } = DateTime.Now;

    }
}
