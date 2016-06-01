using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizeeBirdBoarding.Db.Model
{
    public class Bird
    {
        [Key]
        public int BirdId { get; set; }
        public bool Deleted { get; set; }
        public string Name { get; set; }
        public string Breed { get; set; }
        public string Color { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }
        public string Notes { get; set; }
    }
}
