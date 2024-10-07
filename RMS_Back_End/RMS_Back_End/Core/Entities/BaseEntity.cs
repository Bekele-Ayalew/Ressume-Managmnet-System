using System.ComponentModel.DataAnnotations;

namespace RMS_Back_End.Core.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        public long ID { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime ModifiedAt { get; set; } = DateTime.Now;
        public bool IsActive { get; set; }=true;
    }
}
