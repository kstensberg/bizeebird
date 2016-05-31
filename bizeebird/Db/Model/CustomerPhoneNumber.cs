using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizeeBirdBoarding.Db.Model
{
    public class CustomerPhoneNumber
    {
        [Key]
        public int PhoneNumberId { get; set; }
        public string PhoneNumber { get; set; }
    }
}
