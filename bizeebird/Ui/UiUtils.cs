using Gtk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizeeBirdBoarding.Ui
{
    class UiUtils
    {
        public static DateTime GetDateTimeFromCalendar(Calendar calendar)
        {
            return new DateTime(calendar.Year, calendar.Month, calendar.Day);
        }
    }
}
