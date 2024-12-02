using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RMS_Back_End.Core.Context;
using RMS_Back_End.Core.Dtos.Job;
using RMS_Back_End.Core.Entities;

namespace RMS_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }

        public JobController(ApplicationDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        //Create 
        [HttpPost]
        [Route("Create_Job")]
        public async Task<IActionResult> CreateJob([FromBody] JobCreateDto dto)
        {
               Job newJob=_mapper.Map<Job>(dto);
               await _context.Jobs.AddAsync(newJob);
               await _context.SaveChangesAsync();
               return Ok("Job is Created Succesfully");       
        }

        [HttpGet]
        [Route("GetJobs")]
        public async Task<ActionResult<IEnumerable<JobGetDto>>> GetJobs()
        { 
         var jobs=await _context.Jobs.Include(job=>job.Company).ToArrayAsync();
         var convertedJobs=_mapper.Map<IEnumerable<JobGetDto>>(jobs);
         return Ok(convertedJobs);
        }

        [HttpGet]
        [Route("GetJobsCount")]
        public async Task<ActionResult<int>> GetJobsCount()
        {
            var jobsCount = await _context.Jobs.CountAsync();
            return Ok(jobsCount);
        }

    }
}
