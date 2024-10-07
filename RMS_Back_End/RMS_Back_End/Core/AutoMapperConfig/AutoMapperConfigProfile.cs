using AutoMapper;
using Microsoft.AspNetCore.Routing.Constraints;
using RMS_Back_End.Core.Dtos.Candidate;
using RMS_Back_End.Core.Dtos.Company;
using RMS_Back_End.Core.Dtos.Job;
using RMS_Back_End.Core.Entities;

namespace RMS_Back_End.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {
        public AutoMapperConfigProfile()
        {
            // Company
            CreateMap<CompanyCreateDto, Company>();
            CreateMap<Company, CompanyGetDto>();
            // Candidate
            CreateMap<CandidateCreateDto, Candidate>();
            CreateMap<Candidate, CandidateGetDto>()
           .ForMember(dest => dest.JobTitle, options => options.MapFrom(src => src.Job.Title));


            //Job 
            CreateMap<JobCreateDto, Job>();
            CreateMap<Job, JobGetDto>()
           .ForMember(dest => dest.CompanyName, options => options.MapFrom(src => src.Company.Name));
        }
    }
}
