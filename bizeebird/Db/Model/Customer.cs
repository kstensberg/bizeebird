using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BizeeBirdBoarding.Db.Model
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        public string Name { get; set; }

        List<string> PhoneNumbers { get; set; }

        public float BoardingRate { get; set; }
        public string Notes { get; set; }

        public List<Bird> Birds { get; set; }
    }
}
