using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RMS_Back_End.Core.Context;
using RMS_Back_End.Core.Dtos.Company;
using RMS_Back_End.Core.Entities;

namespace RMS_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }

        public CompanyController(ApplicationDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("CreateCompany")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto dto)
        {

            Company newCompany = _mapper.Map<Company>(dto);
            await _context.Companies.AddAsync(newCompany);
            await _context.SaveChangesAsync();
            return Ok("Company Saved Successfully");

        }

        [HttpGet]
        [Route("GetCompanies")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompanies()
        {

            var companies = await _context.Companies.ToListAsync();
            var mappedCampinies = _mapper.Map<IEnumerable<CompanyGetDto>>(companies);
            return Ok(mappedCampinies);

        }

        [HttpGet]
        [Route("GetCompaniesCount")]
        public async Task<ActionResult<int>> GetCompaniesCount()
        {
            var companiesCount = await _context.Companies.CountAsync();
            return Ok(companiesCount);
        }




    }
}
