using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BizeeBirdBoarding.Db.Model
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        public string Name { get; set; }

        public List<CustomerPhoneNumber> PhoneNumbers { get; set; }

        public double BoardingRate { get; set; }
        public string Notes { get; set; }

        public List<Bird> Birds { get; set; }
    }
}
