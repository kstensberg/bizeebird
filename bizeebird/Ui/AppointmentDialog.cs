using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;
using BizeeBirdBoarding.Ui.Widgets;
using Gtk;
using System;
using System.Collections.Generic;
using System.Linq;

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

                //startDateCalendar.Date = appointment.StartTime;
                endDateCalendar.Date = appointment.EndTime;

                SetAppointmentStatus(appointment.Status);

                notesTextView.Buffer.Text = appointment.Notes;

                foreach (var appointmentBird in appointment.AppointmentBirds)
                {
                    foreach (AppointmentDialogBirdRow row in birdHBox.Children)
                    {
                        if (appointmentBird.Bird.BirdId == row.Bird.BirdId)
                        {
                            row.BirdSelected = true;

                            row.Wings = appointmentBird.GroomingWings;
                            row.Nails = appointmentBird.GroomingNails;
                            row.CageNeeded = appointmentBird.CageNeeded;
                        }
                    }
                }
            }
        }

        public AppointmentDialog()
        {
            this.Build();

            startDateContainer.Add(new DateMultiSelect());

            updateCustomerCombo("");
        }

        protected void onOkButtonClicked(object sender, EventArgs e)
        {
            using (var db = new BizeeBirdDbContext())
            {
                if (!AppointmentId.HasValue)
                    SaveNewAppointment(db);
                else
                    SaveExistingAppointment(db);

                db.SaveChanges();
            }

            Destroy();
        }

        private void SaveNewAppointment(BizeeBirdDbContext db)
        {
            TreeIter iter;
            if (!customerCombobox.GetActiveIter(out iter))
            {
                //TODO error customer not selected
                return;
            }
            int customerId = (int)customerCombobox.Model.GetValue(iter, 1);

            if (!HasBirdSelected())
            {
                //TODO error no birds selected
                return;
            }

            List<AppointmentBird> appointmentBirds = new List<AppointmentBird>();

            foreach (AppointmentDialogBirdRow row in birdHBox.Children)
            {
                if (row.BirdSelected)
                {
                    appointmentBirds.Add(new AppointmentBird()
                    {
                        Bird = db.Birds.Find(row.Bird.BirdId),
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
                //StartTime = GetDateTimeFromCalendar(startDateCalendar),
                EndTime = GetDateTimeFromCalendar(endDateCalendar),
                Status = GetAppointmentStatus(statusCombobox.ActiveText),
                Notes = notesTextView.Buffer.Text
            };

            db.Appointments.Add(appointment);
        }

        private void SaveExistingAppointment(BizeeBirdDbContext db)
        {
            TreeIter iter;
            if (!customerCombobox.GetActiveIter(out iter))
            {
                //TODO error customer not selected
                return;
            }
            int customerId = (int)customerCombobox.Model.GetValue(iter, 1);

            if (!HasBirdSelected())
            {
                //TODO error no birds selected
                return;
            }

            Appointment appointment = db.Appointments.Find(AppointmentId);

            appointment.Customer = db.Customers.Find(customerId);
            //appointment.StartTime = GetDateTimeFromCalendar(startDateCalendar);
            appointment.EndTime = GetDateTimeFromCalendar(endDateCalendar);
            appointment.Status = GetAppointmentStatus(statusCombobox.ActiveText);
            appointment.Notes = notesTextView.Buffer.Text;

            for (int idx = appointment.AppointmentBirds.Count() - 1; idx >= 0; idx--)
            {
                db.AppointmentBirds.Remove(appointment.AppointmentBirds[idx]);
            }

            var appointmentBirds = new List<AppointmentBird>();

            foreach (AppointmentDialogBirdRow row in birdHBox.Children)
            {
                if (row.BirdSelected)
                {
                    appointmentBirds.Add(new AppointmentBird()
                    {
                        Bird = db.Birds.Find(row.Bird.BirdId),
                        CageNeeded = row.CageNeeded,
                        GroomingNails = row.Nails,
                        GroomingWings = row.Wings
                    });
                }
            }

            appointment.AppointmentBirds = appointmentBirds;
        }

        private bool HasBirdSelected()
        {
            foreach (AppointmentDialogBirdRow row in birdHBox.Children)
            {
                if (row.BirdSelected)
                {
                    return true;
                }
            }

            return false;
        }

        protected void onCancelButtonClicked(object sender, EventArgs e)
        {
            Destroy();
        }

        private AppointmentStatus GetAppointmentStatus(string appointmentStatus)
        {
            switch (appointmentStatus)
            {
                case "Scheduled":
                    return AppointmentStatus.Scheduled;
                case "Checked In":
                    return AppointmentStatus.CheckedIn;
                case "Checked Out":
                    return AppointmentStatus.CheckedOut;
                case "Cancelled":
                    return AppointmentStatus.Cancelled;
                case "No-Show":
                    return AppointmentStatus.NoShow;
            }

            return AppointmentStatus.Scheduled;
        }

        private void SetAppointmentStatus(AppointmentStatus status)
        {
            Gtk.TreeIter iter;
            statusCombobox.Model.GetIterFirst(out iter);
            do
            {
                GLib.Value thisRow = new GLib.Value();
                statusCombobox.Model.GetValue(iter, 0, ref thisRow);

                var comboStatus = GetAppointmentStatus(thisRow.Val as string);

                if (comboStatus == status)
                {
                    statusCombobox.SetActiveIter(iter);
                    return;
                }
            } while (statusCombobox.Model.IterNext(ref iter));
        }

        protected void onCustomerComboChanged(object sender, EventArgs e)
        {
            TreeIter iter;
            if (customerCombobox.GetActiveIter(out iter))
            {
                int customerId = (int)customerCombobox.Model.GetValue(iter, 1);
                onCustomerSelected(customerId);
            }
            else
            {
                updateCustomerCombo(customerCombobox.ActiveText);
            }
        }

        private void onCustomerSelected(int customerId)
        {
            while (birdHBox.Children.Length > 0)
            {
                birdHBox.Remove(birdHBox.Children[0]);
            }

            using (var db = new BizeeBirdDbContext())
            {
                Customer customer = db.Customers.Find(customerId);

                boardingRateEntry.Text = customer.BoardingRate.ToString("C2");

                foreach (Bird row in customer.Birds)
                {
                    if (row.Deleted)
                        continue;

                    AppointmentDialogBirdRow birdRow = new AppointmentDialogBirdRow(row, customer);

                    birdHBox.Add(birdRow);
                }
            }
        }

        private void updateCustomerCombo(string searchTerm)
        {
            customerCombobox.Clear();
            CellRendererText cell = new CellRendererText();
            customerCombobox.PackStart(cell, false);
            customerCombobox.AddAttribute(cell, "text", 0);
            ListStore store = new ListStore(typeof(string), typeof(int));
            customerCombobox.Model = store;

            using (var db = new BizeeBirdDbContext())
            {

                IQueryable set;
                if (searchTerm != null && searchTerm.Length > 0)
                {
                    set = db.Customers.Where(
                        c => c.Name.ToLower().Contains(searchTerm) ||
                        c.Email.ToLower().Contains(searchTerm) ||
                        c.Notes.ToLower().Contains(searchTerm) ||
                        c.PhoneNumbers.Any(p => p.PhoneNumber.ToLower().Contains(searchTerm)) ||
                        c.Birds.Any(b => b.Name.ToLower().Contains(searchTerm))).OrderByDescending(c => c.Name);
                }
                else
                {
                    set = db.Customers;
                }

                foreach (Customer row in set)
                {
                    store.AppendValues(row.Name, row.CustomerId);
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

