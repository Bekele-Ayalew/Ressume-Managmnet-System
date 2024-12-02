using RMS_Back_End.Core.Enums;

namespace RMS_Back_End.Core.Dtos.Company
{
    public class CompanyGetDto
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public CompanySize Size { get; set; }   
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;
        public DateTime ModifiedAt { get; set; } = DateTime.Now;
    }
}
