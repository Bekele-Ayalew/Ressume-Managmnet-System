using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RMS_Back_End.Core.AutoMapperConfig;
using RMS_Back_End.Core.Context;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(optons => {
        optons.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); 
    
    });

builder.Services.AddAutoMapper(typeof(AutoMapperConfigProfile));
builder.Services.AddDbContext<ApplicationDbContext> ( options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("LocalConnection"));

});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(options =>
{
    options.AllowAnyOrigin()
      .AllowAnyMethod()
      .AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
