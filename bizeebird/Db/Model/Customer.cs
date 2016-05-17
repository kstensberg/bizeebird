using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;

namespace BizeeBirdBoarding.Db.Model
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public virtual List<CustomerPhoneNumber> PhoneNumbers { get; set; }
        public string Email { get; set; }
        public double BoardingRate { get; set; }
        public string Notes { get; set; }
        public virtual List<Bird> Birds { get; set; }
    }
}
