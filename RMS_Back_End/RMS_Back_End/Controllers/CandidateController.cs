using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RMS_Back_End.Core.Context;
using RMS_Back_End.Core.Dtos.Candidate;
using RMS_Back_End.Core.Entities;

namespace RMS_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }

        public CandidateController(ApplicationDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        // Create Candidate
        [HttpPost]
        [Route("CreateCandidate")]
        public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDto dto, IFormFile pdfFile)
        {
            var fileSize = 10 * 1024 * 1024;
            var mimeType = "application/pdf";
            if (pdfFile.Length > fileSize || pdfFile.ContentType != mimeType)
            {
                return BadRequest("File size excedded or Invalid !");
            }
            var resumeUrl = Guid.NewGuid().ToString() + ".pdf";
            var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "Document", "PdfFile");
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
            var filePath = Path.Combine(directoryPath, resumeUrl);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }
            Candidate newCandidate = _mapper.Map<Candidate>(dto);
            newCandidate.ResumeUrl = resumeUrl;
            await _context.Candidates.AddAsync(newCandidate);
            await _context.SaveChangesAsync();
            return Ok("Candidate Successfully Created");

        }

        // Get Candidates

        [HttpGet]
        [Route("GetCandidates")]
        public async Task<ActionResult<IEnumerable<CandidateGetDto>>> GetCandidates()
        {
            var candidates = await _context.Candidates.Include(candidate => candidate.Job).ToListAsync();
            var mappedCandidates = _mapper.Map<IEnumerable<CandidateGetDto>>(candidates);
            return Ok(mappedCandidates);

        }
        [HttpGet]
        [Route("GetCandidatesCount")]
        public async Task<ActionResult<int>> GetCandidatesCount()
        {
            var candidatesCount = await _context.Candidates.CountAsync();
            return Ok(candidatesCount);
        }


        // TO DOWNLOAD PDF FILE
        [HttpGet]
        [Route("DownloadPDF/Url")]
        public IActionResult DownloadPDF(string url)
        {

            if (url == null)
            {

                return BadRequest("File Not Found");
            }
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Document", "PdfFile", url);
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File Not Found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);
            var contentDisposition = new System.Net.Mime.ContentDisposition
            {
                FileName = url,
                Inline = false 
            };

            Response.Headers.Add("Content-Disposition", contentDisposition.ToString());
            Response.Headers.Add("X-Content-Type-Options", "nosniff");

            var file = File(pdfBytes, "application/pdf");
            return file;
        }

    }
}
