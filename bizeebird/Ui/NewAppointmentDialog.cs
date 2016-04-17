using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;
using Gtk;
using System;

namespace BizeeBirdBoarding.Ui
{
    public partial class NewAppointmentDialog : Gtk.Dialog
	{
		public NewAppointmentDialog ()
		{
			this.Build();

            customerCombobox.Clear();
            CellRendererText cell = new CellRendererText();
            customerCombobox.PackStart(cell, false);
            customerCombobox.AddAttribute(cell, "text", 0);
            ListStore store = new ListStore(typeof(string), typeof(int));
            customerCombobox.Model = store;

            using (var db = new BizeeBirdDbContext())
            {
                foreach (Customer row in db.Customers)
                {
                    store.AppendValues(row.Name, row.CustomerId);
                }
            }
        }

		protected void onOkButtonClicked(object sender, EventArgs e)
		{
            AppointmentStatus status = AppointmentStatus.Scheduled;

            switch (statusCombobox.ActiveText)
            {
                case "Scheduled":
                    status = AppointmentStatus.Scheduled;
                    break;
                case "Checked In":
                    status = AppointmentStatus.CheckedIn;
                    break;
                case "Checked Out":
                    status = AppointmentStatus.CheckedOut;
                    break;
                case "Cancelled":
                    status = AppointmentStatus.Cancelled;
                    break;
                case "No-Show":
                    status = AppointmentStatus.NoShow;
                    break;
            }

            bool cageNeeded = false;

            if (cageNeededYesRadioButton.Active)
                cageNeeded = true;

            using (var db = new BizeeBirdDbContext())
            {
                TreeIter iter;
                if (!customerCombobox.GetActiveIter(out iter))
                {
                    //TODO error customer not selected
                    return;
                }
                int customerId = (int)customerCombobox.Model.GetValue(iter, 1);

                if (!birdCombobox.GetActiveIter(out iter))
                {
                    //TODO error bird not selected
                    return;
                }
                int birdId = (int)birdCombobox.Model.GetValue(iter, 1);

                var appointment = new Appointment
                {
                    Customer = db.Customers.Find(customerId),
                    Bird = db.Birds.Find(birdId),
                    StartTime = GetDateTimeFromCalendar(startDateCalendar),
                    EndTime = GetDateTimeFromCalendar(endDateCalendar),
                    Status = status,
                    GroomingWings = groomingWingsCheckbox.Active,
                    GroomingNails = groomingNailsCheckbox.Active,
                    CageNeeded = cageNeeded
                };

                db.Appointments.Add(appointment);
                db.SaveChanges();
            }

            Destroy();
        }

		protected void onCancelButtonClicked(object sender, EventArgs e)
		{
            Destroy();
        }

        protected void onCustomerComboChanged(object sender, EventArgs e)
        {
            TreeIter iter;
            if (customerCombobox.GetActiveIter(out iter))
            {
                int customerId = (int)customerCombobox.Model.GetValue(iter, 1);
                Console.WriteLine();

                birdCombobox.Clear();
                CellRendererText cell = new CellRendererText();
                birdCombobox.PackStart(cell, false);
                birdCombobox.AddAttribute(cell, "text", 0);
                ListStore store = new ListStore(typeof(string), typeof(int));
                birdCombobox.Model = store;

                using (var db = new BizeeBirdDbContext())
                {
                    Customer customer = db.Customers.Find(customerId);

                    foreach (Bird row in customer.Birds)
                    {
                        store.AppendValues(row.Name, row.BirdId);
                    }
                }
            }
        }

        private DateTime GetDateTimeFromCalendar(Calendar calendar)
        {
            return new DateTime(calendar.Year, calendar.Month, calendar.Day);
        }

    }
}

