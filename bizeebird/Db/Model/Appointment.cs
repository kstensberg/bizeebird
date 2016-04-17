using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizeeBirdBoarding.Db.Model
{
    public class Appointment
    {
        [Key]
        public int AppointmentId { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Bird Bird { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public AppointmentStatus Status { get; set; }
        public bool GroomingWings { get; set; }
        public bool GroomingNails { get; set; }
        public bool CageNeeded { get; set; }
        public string Notes { get; set; }
    }
}
