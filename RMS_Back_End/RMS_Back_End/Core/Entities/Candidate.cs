﻿namespace RMS_Back_End.Core.Entities
{
    public class Candidate:BaseEntity
    {
        public string Name  { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string CoverLetter { get; set; }
        public string ResumeUrl { get; set; }
        // Relations 
        public long  JobId { get; set; }
        public Job Job { get; set; }

    }
}
