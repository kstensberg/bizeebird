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

        public static implicit operator CustomerPhoneNumber(string phoneNumber)
        {
            CustomerPhoneNumber customerPhoneNumber = new CustomerPhoneNumber();
            customerPhoneNumber.PhoneNumber = phoneNumber;
            return customerPhoneNumber;
        }
    }
}
