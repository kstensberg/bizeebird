using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;
using Gtk;
using System;
using System.Linq;

namespace BizeeBirdBoarding.Ui
{
    public partial class MainWindow: Gtk.Window
	{
        private Gtk.ListStore CustomersListStore;
        private Gtk.ListStore UpcomingDropOffsListStore;
        private Gtk.ListStore UpcomingPickupsListStore;
        private Gtk.ListStore HistoryListStore;
        

        public MainWindow() : base(Gtk.WindowType.Toplevel)
        {
            Build();

            initCustomerTreeview();
            initUpcomingDropOffsTreeview();
            initUpcomingPickups();
            initHistoryTreeview();
        }

        private void initCustomerTreeview()
        {
            customersTreeview.AppendColumn("Name", new Gtk.CellRendererText(), "text", 1);
            customersTreeview.AppendColumn("Phone Number", new Gtk.CellRendererText(), "text", 2);
            customersTreeview.AppendColumn("E-mail Address", new Gtk.CellRendererText(), "text", 3);
            customersTreeview.AppendColumn("Boarding Rate", new Gtk.CellRendererText(), "text", 4);
            customersTreeview.AppendColumn("Notes", new Gtk.CellRendererText(), "text", 5);

            CustomersListStore = new Gtk.ListStore(typeof(int), typeof(string), typeof(string), typeof(string), typeof(double), typeof(string));

            customersTreeview.Model = CustomersListStore;

            updateCustomerList();
        }

        private void updateCustomerList()
        {
            CustomersListStore.Clear();

            using (var db = new BizeeBirdDbContext())
            {
                foreach (Customer row in db.Customers)
                {
                    string phoneNumber = "";

                    if (row.PhoneNumbers != null && row.PhoneNumbers.Count > 0)
                        phoneNumber = row.PhoneNumbers[0].PhoneNumber;

                    CustomersListStore.AppendValues(row.CustomerId, row.Name, phoneNumber, row.Email, row.BoardingRate, row.Notes);
                }
            }
        }

        private void initUpcomingDropOffsTreeview()
        {
            upcomingDropOffsTreeView.AppendColumn("Date", new Gtk.CellRendererText(), "text", 1);
            upcomingDropOffsTreeView.AppendColumn("Customer", new Gtk.CellRendererText(), "text", 2);
            upcomingDropOffsTreeView.AppendColumn("Bird Name", new Gtk.CellRendererText(), "text", 3);
            upcomingDropOffsTreeView.AppendColumn("Bird Breed", new Gtk.CellRendererText(), "text", 4);
            upcomingDropOffsTreeView.AppendColumn("Cage Needed", new Gtk.CellRendererToggle(), "active", 5);

            UpcomingDropOffsListStore = new Gtk.ListStore(typeof(int), typeof(string), typeof(string), typeof(string), typeof(string), typeof(bool));

            upcomingDropOffsTreeView.Model = UpcomingDropOffsListStore;

            updateUpcomingDropOffsTreeview();
        }

        private void updateUpcomingDropOffsTreeview()
        {
            UpcomingDropOffsListStore.Clear();

            using (var db = new BizeeBirdDbContext())
            {
                var appointments = from a in db.Appointments
                                   where a.StartTime >= DateTime.Today
                                   orderby a.StartTime ascending
                                   select a;

                foreach (var row in appointments)
                {
                    UpcomingDropOffsListStore.AppendValues(row.AppointmentId, row.StartTime.ToShortDateString(), row.Customer.Name, row.Bird.Name, row.Bird.Breed, row.CageNeeded);
                }
            }
        }

        private void initUpcomingPickups()
        {
            upcomingPickupsTreeview.AppendColumn("Date", new Gtk.CellRendererText(), "text", 1);
            upcomingPickupsTreeview.AppendColumn("Customer", new Gtk.CellRendererText(), "text", 2);
            upcomingPickupsTreeview.AppendColumn("Bird Name", new Gtk.CellRendererText(), "text", 3);
            upcomingPickupsTreeview.AppendColumn("Bird Breed", new Gtk.CellRendererText(), "text", 4);
            upcomingPickupsTreeview.AppendColumn("Wings", new Gtk.CellRendererToggle(), "active", 5);
            upcomingPickupsTreeview.AppendColumn("Nails", new Gtk.CellRendererToggle(), "active", 6);
            upcomingPickupsTreeview.AppendColumn("Notes", new Gtk.CellRendererText(), "text", 7);

            UpcomingPickupsListStore = new Gtk.ListStore(typeof(int), typeof(string), typeof(string), typeof(string), typeof(string), typeof(bool), typeof(bool), typeof(string));

            upcomingPickupsTreeview.Model = UpcomingPickupsListStore;

            updateUpcomingPickupsTreeview();
        }

        private void updateUpcomingPickupsTreeview()
        {
            UpcomingPickupsListStore.Clear();

            using (var db = new BizeeBirdDbContext())
            {
                var appointments = from a in db.Appointments
                                   where a.EndTime >= DateTime.Today
                                   orderby a.EndTime ascending
                                   select a;

                foreach (var row in appointments)
                {
                    UpcomingPickupsListStore.AppendValues(row.AppointmentId, row.EndTime.ToShortDateString(), row.Customer.Name, row.Bird.Name, row.Bird.Breed, row.GroomingWings, row.GroomingNails, row.Notes);
                }
            }
        }

        private void initHistoryTreeview()
        {
            historyTreeview.AppendColumn("Customer Name", new Gtk.CellRendererText(), "text", 1);
            historyTreeview.AppendColumn("Boarding Rate", new Gtk.CellRendererText(), "text", 2);
            historyTreeview.AppendColumn("Bird Name", new Gtk.CellRendererText(), "text", 3);
            historyTreeview.AppendColumn("Dates", new Gtk.CellRendererText(), "text", 4);
            historyTreeview.AppendColumn("Status", new Gtk.CellRendererToggle(), "active", 5);
            historyTreeview.AppendColumn("Wings", new Gtk.CellRendererToggle(), "active", 6);
            historyTreeview.AppendColumn("Nails", new Gtk.CellRendererToggle(), "active", 7);
            historyTreeview.AppendColumn("Cage Needed", new Gtk.CellRendererToggle(), "active", 8);

            HistoryListStore = new Gtk.ListStore(typeof(int), typeof(string), typeof(double), typeof(string), typeof(string), typeof(bool), typeof(bool), typeof(bool), typeof(bool));

            historyTreeview.Model = HistoryListStore;

            updateHistoryTreeview();
        }

        private void updateHistoryTreeview()
        {
            HistoryListStore.Clear();

            using (var db = new BizeeBirdDbContext())
            {
                var appointments = from a in db.Appointments
                                   where a.EndTime <= DateTime.Today
                                   orderby a.EndTime descending
                                   select a;

                foreach (var row in appointments)
                {
                    HistoryListStore.AppendValues(row.AppointmentId, row.Customer.Name, row.Customer.BoardingRate, row.Bird.Name, row.StartTime.ToShortDateString() + " - " + row.EndTime.ToShortDateString(), row.Status.ToString(), row.GroomingWings, row.GroomingNails, row.CageNeeded);
                }
            }
        }

        protected void OnDeleteEvent (object sender, DeleteEventArgs a)
		{
			Application.Quit ();
			a.RetVal = true;
		}

		protected void onNewCustomerClicked (object sender, EventArgs e)
		{
			CustomerDialog dialog = new CustomerDialog ();

            dialog.Destroyed += delegate
            {
                updateCustomerList();
            };

            dialog.ShowAll ();
		}

		protected void onNewApointmentButtonClicked (object sender, EventArgs e)
		{
            AppointmentDialog dialog = new AppointmentDialog ();
			dialog.ShowAll ();
		}

		protected void onUpcomingDropOffsRowActivated (object o, RowActivatedArgs args)
		{
            TreeIter iter;
            UpcomingDropOffsListStore.GetIter(out iter, args.Path);
            int appointmentId = (int)UpcomingDropOffsListStore.GetValue(iter, 0);

            AppointmentDialog dialog = new AppointmentDialog(appointmentId);
            dialog.ShowAll();
        }

		protected void onUpcomingPickupsRowActivated (object o, RowActivatedArgs args)
		{
            TreeIter iter;
            UpcomingPickupsListStore.GetIter(out iter, args.Path);
            int appointmentId = (int)UpcomingPickupsListStore.GetValue(iter, 0);

            AppointmentDialog dialog = new AppointmentDialog(appointmentId);
            dialog.ShowAll();
        }

		protected void onCustomersRowActivated (object o, RowActivatedArgs args)
		{
            TreeIter iter;
            CustomersListStore.GetIter(out iter, args.Path);
            int customerId = (int)CustomersListStore.GetValue(iter, 0);

            CustomerDialog dialog = new CustomerDialog(customerId);
            dialog.ShowAll();
		}

		protected void onHistoryRowActivated (object o, RowActivatedArgs args)
		{
        }
	}
}