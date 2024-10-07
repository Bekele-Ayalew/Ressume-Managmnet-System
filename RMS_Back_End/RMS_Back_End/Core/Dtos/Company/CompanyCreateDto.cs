using RMS_Back_End.Core.Enums;

namespace RMS_Back_End.Core.Dtos.Company
{
    public class CompanyCreateDto
    {
        public string Name { get; set; }
        public CompanySize Size { get; set; }
    }
}
