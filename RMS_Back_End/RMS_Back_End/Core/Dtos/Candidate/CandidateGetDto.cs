namespace RMS_Back_End.Core.Dtos.Candidate
{
    public class CandidateGetDto
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string CoverLetter { get; set; }
        public string ResumeUrl { get; set; }
        public long JobId { get; set; }
        public string JobTitle { get; set; }

    }
}
