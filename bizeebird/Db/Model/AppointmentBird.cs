using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizeeBirdBoarding.Db.Model
{
    public class AppointmentBird
    {
        [Key]
        public int AppointmentBirdId { get; set; }
        public Bird Bird { get; set; }
        public bool GroomingWings { get; set; }
        public bool GroomingNails { get; set; }
        public bool CageNeeded { get; set; }
    }
}
