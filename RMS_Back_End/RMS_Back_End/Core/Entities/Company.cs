using RMS_Back_End.Core.Enums;

namespace RMS_Back_End.Core.Entities
{
    public class Company:BaseEntity
    {
        public string Name { get; set; }
        public CompanySize Size { get; set; }
        // realtions 
        public ICollection<Job> Jobs { get; set; }// one  to many ==>one company has many job 
    }
}
