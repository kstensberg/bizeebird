using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;
using BizeeBirdBoarding.Ui.Widgets;
using Gtk;
using System;
using System.Collections.Generic;

namespace BizeeBirdBoarding.Ui
{
    public partial class AppointmentDialog : Gtk.Dialog
	{
        private int? AppointmentId;

        public AppointmentDialog(int appointmentId) : this()
        {
            using (var db = new BizeeBirdDbContext())
            {
                this.AppointmentId = appointmentId;
                Appointment appointment = db.Appointments.Find(AppointmentId);

                setActiveCustomerCombo(appointment.Customer.CustomerId);

                startDateCalendar.Date = appointment.StartTime;
                endDateCalendar.Date = appointment.EndTime;

                foreach (var Bird in appointment.AppointmentBirds)
                {
                    //TODO
                }
            }
        }

        public AppointmentDialog ()
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

            using (var db = new BizeeBirdDbContext())
            {
                TreeIter iter;
                if (!customerCombobox.GetActiveIter(out iter))
                {
                    //TODO error customer not selected
                    return;
                }
                int customerId = (int)customerCombobox.Model.GetValue(iter, 1);

                var appointmentBirds = new List<AppointmentBird>();

                foreach (AppointmentDialogBirdRow row in birdHBox.Children)
                {
                    if (row.IsEnabled())
                    {
                        appointmentBirds.Add(new AppointmentBird()
                        {
                            Bird = row.Bird,
                            CageNeeded = row.CageNeeded,
                            GroomingNails = row.Nails,
                            GroomingWings = row.Wings
                        });
                    }
                }

                if (appointmentBirds.Count < 1)
                {
                    //TODO error no birds selected
                    return;
                }

                var appointment = new Appointment
                {
                    Customer = db.Customers.Find(customerId),
                    AppointmentBirds = appointmentBirds,
                    StartTime = GetDateTimeFromCalendar(startDateCalendar),
					EndTime = GetDateTimeFromCalendar(endDateCalendar),
                    Status = status
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

                while (birdHBox.Children.Length > 0)
                {
                    birdHBox.Remove(birdHBox.Children[0]);
                }

                using (var db = new BizeeBirdDbContext())
                {
                    Customer customer = db.Customers.Find(customerId);

                    foreach (Bird row in customer.Birds)
                    {
                        AppointmentDialogBirdRow birdRow = new AppointmentDialogBirdRow(row);

                        birdHBox.Add(birdRow);
                    }
                }
            }
        }

        private DateTime GetDateTimeFromCalendar(Calendar calendar)
        {
            return calendar.Date;
        }

        private void setActiveCustomerCombo(int customerId)
        {
            setComboActive(customerCombobox, customerId, 1);

        }

        private void setComboActive(ComboBox combo, int key, int modelPos)
        {
            TreeIter ti;
            combo.Model.GetIterFirst(out ti);
            do
            {
                if ((int)combo.Model.GetValue(ti, modelPos) == key)
                {
                    combo.SetActiveIter(ti);
                    break;
                }

            } while (combo.Model.IterNext(ref ti));
        }
    }
}

