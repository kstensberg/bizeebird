using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;
using Gtk;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace BizeeBirdBoarding.Ui
{
    public partial class MainWindow: Gtk.Window
	{
        private Gtk.ListStore CustomersListStore;
        private TreeStore UpcomingDropOffsListStore;
        private TreeStore UpcomingPickupsListStore;
        private TreeStore HistoryListStore;
        

        public MainWindow() : base(Gtk.WindowType.Toplevel)
        {
            Build();

            InitCustomerTreeview();
            InitUpcomingDropOffsTreeview();
            InitUpcomingPickups();
            InitHistoryTreeview();
        }

        private void InitCustomerTreeview()
        {
            customersTreeview.AppendColumn(MakeColumn("Name", new Gtk.CellRendererText(), "text", 1, false));
            customersTreeview.AppendColumn(MakeColumn("Phone Number", new Gtk.CellRendererText(), "text", 2, false));
            customersTreeview.AppendColumn(MakeColumn("E-mail Address", new Gtk.CellRendererText(), "text", 3, false));
            customersTreeview.AppendColumn(MakeColumn("Boarding Rate", new Gtk.CellRendererText(), "text", 4, false));
            customersTreeview.AppendColumn(MakeColumn("Notes", new Gtk.CellRendererText(), "text", 5, true));

            CustomersListStore = new Gtk.ListStore(typeof(int), typeof(string), typeof(string), typeof(string), typeof(string), typeof(string));

            customersTreeview.Model = CustomersListStore;

            UpdateCustomerList();
        }

        private void UpdateCustomerList()
        {
            string searchTerm = customerSearchEntry.Text.Trim();

            CustomersListStore.Clear();

            using (var db = new BizeeBirdDbContext())
            {
                IQueryable set;
                if (searchTerm.Length > 0)
                {
                    set = db.Customers.Where(
                        c => c.Name.ToLower().Contains(searchTerm.ToLower()) || 
                        c.Email.ToLower().Contains(searchTerm.ToLower()) || 
                        c.Notes.ToLower().Contains(searchTerm.ToLower()) ||
                        c.PhoneNumbers.Any(p => p.PhoneNumber.ToLower().Contains(searchTerm.ToLower())) ||
                        c.Birds.Any(b => b.Name.ToLower().Contains(searchTerm.ToLower()))).OrderBy(c => c.Name);
                }
                else
                {
                    set = db.Customers.OrderBy(c => c.Name);
                }

                foreach (Customer row in set)
                {
                    string phoneNumber = "";

                    if (row.PhoneNumbers != null && row.PhoneNumbers.Count() > 0)
                        phoneNumber = row.PhoneNumbers.First().PhoneNumber;

                    CustomersListStore.AppendValues(row.CustomerId, row.Name, phoneNumber, row.Email, row.BoardingRate.ToString("C2"), row.Notes);
                }
            }
        }

        private void InitUpcomingDropOffsTreeview()
        {
            upcomingDropOffsTreeView.AppendColumn(MakeColumn("Date", new Gtk.CellRendererText(), "text", 1, false));
            upcomingDropOffsTreeView.AppendColumn(MakeColumn("Customer", new Gtk.CellRendererText(), "text", 2, true));
            upcomingDropOffsTreeView.AppendColumn(MakeColumn("Bird Name", new Gtk.CellRendererText(), "text", 3, false));
            upcomingDropOffsTreeView.AppendColumn(MakeColumn("Bird Breed", new Gtk.CellRendererText(), "text", 4, false));
            upcomingDropOffsTreeView.AppendColumn(MakeColumn("Cage Needed", new Gtk.CellRendererToggle(), "active", 5, false));

            UpcomingDropOffsListStore = new TreeStore(typeof(int), typeof(string), typeof(string), typeof(string), typeof(string), typeof(bool));

            upcomingDropOffsTreeView.Model = UpcomingDropOffsListStore;
            
            UpdateUpcomingDropOffsTreeview();
        }

        private void UpdateUpcomingDropOffsTreeview()
        {
            UpcomingDropOffsListStore.Clear();

            using (var db = new BizeeBirdDbContext())
            {
                var appointments = from a in db.Appointments
                                    where a.StartTime >= DateTime.Today &&
                                        a.Status == AppointmentStatus.Scheduled
                                    orderby a.StartTime ascending
                                    select a;

                foreach (var row in appointments)
                {
                    string birdsString = "";
                    string breedString = "";

                    if (row.AppointmentBirds.Count() == 1)
                    {
                        birdsString = row.AppointmentBirds.First().Bird.Name;
                        breedString = row.AppointmentBirds.First().Bird.Breed;
                    }

                    TreeIter parent = UpcomingDropOffsListStore.AppendValues(row.AppointmentId, row.StartTime.ToShortDateString(), row.Customer.Name, birdsString, breedString, row.AppointmentBirds.Exists(a => a.CageNeeded == true));

                    if (row.AppointmentBirds.Count() > 1)
                    {
                        foreach (var bird in row.AppointmentBirds)
                        {
                            UpcomingDropOffsListStore.AppendValues(parent, "", "", "", bird.Bird.Name, bird.Bird.Breed, bird.CageNeeded);
                        }
                    }
                }
            }

            //uncommenting this will automaticly expand all the nested rows
            //upcomingDropOffsTreeView.ExpandAll();
        }

        private void InitUpcomingPickups()
        {
            upcomingPickupsTreeview.AppendColumn(MakeColumn("Date", new Gtk.CellRendererText(), "text", 1, false));
            upcomingPickupsTreeview.AppendColumn(MakeColumn("Customer", new Gtk.CellRendererText(), "text", 2, false));
            upcomingPickupsTreeview.AppendColumn(MakeColumn("Bird Name", new Gtk.CellRendererText(), "text", 3, false));
            upcomingPickupsTreeview.AppendColumn(MakeColumn("Bird Breed", new Gtk.CellRendererText(), "text", 4, false));
            upcomingPickupsTreeview.AppendColumn(MakeColumn("Wings", new Gtk.CellRendererToggle(), "active", 5, false));
            upcomingPickupsTreeview.AppendColumn(MakeColumn("Nails", new Gtk.CellRendererToggle(), "active", 6, false));
            upcomingPickupsTreeview.AppendColumn(MakeColumn("Rate", new Gtk.CellRendererText(), "text", 7, false));
            upcomingPickupsTreeview.AppendColumn(MakeColumn("Notes", new Gtk.CellRendererText(), "text", 8,true));

            UpcomingPickupsListStore = new TreeStore(typeof(int), typeof(string), typeof(string), typeof(string), typeof(string), typeof(bool), typeof(bool), typeof(string), typeof(string));

            upcomingPickupsTreeview.Model = UpcomingPickupsListStore;

            UpdateUpcomingPickupsTreeview();
        }

        private void UpdateUpcomingPickupsTreeview()
        {
            UpcomingPickupsListStore.Clear();

            using (var db = new BizeeBirdDbContext())
            {
                var appointments = from a in db.Appointments
                                   where a.EndTime >= DateTime.Today && 
                                   a.Status == AppointmentStatus.CheckedIn
                                   orderby a.EndTime ascending
                                   select a;

                foreach (var row in appointments)
                {
                    string birdsString = "";
                    string breedString = "";

                    if (row.AppointmentBirds.Count() == 1)
                    {
                        birdsString = row.AppointmentBirds.First().Bird.Name;
                        breedString = row.AppointmentBirds.First().Bird.Breed;
                    }

                    TreeIter parent = UpcomingPickupsListStore.AppendValues(row.AppointmentId, row.EndTime.ToShortDateString(), row.Customer.Name, birdsString, breedString, row.AppointmentBirds.Exists(a => a.GroomingWings == true), row.AppointmentBirds.Exists(a => a.GroomingNails == true), row.Customer.BoardingRate.ToString("C2"), row.Notes);

                    if (row.AppointmentBirds.Count() > 1)
                    {
                        foreach (var bird in row.AppointmentBirds)
                        {
                            UpcomingPickupsListStore.AppendValues(parent, null, null, null, bird.Bird.Name, bird.Bird.Breed, bird.GroomingWings, bird.GroomingNails, null, null);
                        }
                    }
                }
            }
        }

        private TreeViewColumn MakeColumn(string title, CellRenderer cellRenderer, string attrib, int value, bool expand = false)
        {
            Gtk.TreeViewColumn column = new Gtk.TreeViewColumn();
            column.Title = title;

            column.PackStart(cellRenderer, true);

            column.Expand = expand;

            column.AddAttribute(cellRenderer, attrib, value);

            return column;
        }

        private void InitHistoryTreeview()
        {
            historyTreeview.AppendColumn(MakeColumn("Customer Name", new Gtk.CellRendererText(), "text", 1, true));

            historyTreeview.AppendColumn(MakeColumn("Boarding Rate", new Gtk.CellRendererText(), "text", 2, true));
            historyTreeview.AppendColumn(MakeColumn("Bird Name", new Gtk.CellRendererText(), "text", 3, true));
            historyTreeview.AppendColumn(MakeColumn("Dates", new Gtk.CellRendererText(), "text", 4, true));
            historyTreeview.AppendColumn(MakeColumn("Status", new Gtk.CellRendererText(), "text", 5, false));
            historyTreeview.AppendColumn(MakeColumn("Wings", new Gtk.CellRendererToggle(), "active", 6, false));
            historyTreeview.AppendColumn(MakeColumn("Nails", new Gtk.CellRendererToggle(), "active", 7, false));
            historyTreeview.AppendColumn(MakeColumn("Cage Needed", new Gtk.CellRendererToggle(), "active", 8, false));

            HistoryListStore = new TreeStore(typeof(int), typeof(string), typeof(string), typeof(string), typeof(string), typeof(string), typeof(bool), typeof(bool), typeof(bool));

            historyTreeview.Model = HistoryListStore;

            UpdateHistoryTreeview();
        }

        private void UpdateHistoryTreeview()
        {
            string searchTerm = historySearchEntry.Text.Trim().ToLower();

            HistoryListStore.Clear();

            using (var db = new BizeeBirdDbContext())
            {
                IQueryable set;
                if (searchTerm.Length > 0)
                {
                    set = db.Appointments.Where(
                        a => a.Customer.Name.ToLower().Contains(searchTerm) ||
                        a.Customer.Email.ToLower().Contains(searchTerm) ||
                        a.Customer.Notes.ToLower().Contains(searchTerm) ||
                        a.Customer.PhoneNumbers.Any(p => p.PhoneNumber.ToLower().Contains(searchTerm)) ||
                        a.AppointmentBirds.Any(b => b.Bird.Name.ToLower().Contains(searchTerm))).OrderByDescending(a => a.EndTime);
                }
                else
                {
                    set = db.Appointments.OrderByDescending(a => a.EndTime);
                }

                foreach (Appointment row in set)
                {
                    HistoryListStore.AppendValues(row.AppointmentId, row.Customer.Name, row.Customer.BoardingRate.ToString("C2"), row.AppointmentBirds.First().Bird.Name, row.StartTime.ToShortDateString() + " - " + row.EndTime.ToShortDateString(), row.Status.ToString(), row.AppointmentBirds.First().GroomingWings, row.AppointmentBirds.Exists(a => a.GroomingNails), row.AppointmentBirds.Exists(a => a.CageNeeded));
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
            ShowCustomerDialog(null);
        }

        private void ShowCustomerDialog(int? customerId)
        {
            CustomerDialog dialog = null;

            if (customerId.HasValue)
                dialog = new CustomerDialog(customerId.Value);
            else
                dialog = new CustomerDialog();

            dialog.Destroyed += delegate
            {
                UpdateCustomerList();
                UpdateHistoryTreeview();
                UpdateUpcomingDropOffsTreeview();
                UpdateUpcomingPickupsTreeview();
            };

            dialog.ShowAll();
        }

        private void ShowAppointmentDialog(int? appointmentId)
        {
            AppointmentDialog dialog = null;

            if (appointmentId.HasValue)
                dialog = new AppointmentDialog(appointmentId.Value);
            else
                dialog = new AppointmentDialog();

            dialog.Destroyed += delegate
            {
                UpdateCustomerList();
                UpdateHistoryTreeview();
                UpdateUpcomingDropOffsTreeview();
                UpdateUpcomingPickupsTreeview();
            };

            dialog.ShowAll();
        }

        protected void onNewApointmentButtonClicked (object sender, EventArgs e)
		{
            ShowAppointmentDialog(null);
		}

		protected void onUpcomingDropOffsRowActivated (object o, RowActivatedArgs args)
		{
            TreeIter iter;
            UpcomingDropOffsListStore.GetIter(out iter, args.Path);
            int appointmentId = (int)UpcomingDropOffsListStore.GetValue(iter, 0);

            ShowAppointmentDialog(appointmentId);
        }

		protected void onUpcomingPickupsRowActivated (object o, RowActivatedArgs args)
		{
            TreeIter iter;
            UpcomingPickupsListStore.GetIter(out iter, args.Path);
            int appointmentId = (int)UpcomingPickupsListStore.GetValue(iter, 0);

            ShowAppointmentDialog(appointmentId);
        }

		protected void onCustomersRowActivated (object o, RowActivatedArgs args)
		{
            TreeIter iter;
            CustomersListStore.GetIter(out iter, args.Path);
            int customerId = (int)CustomersListStore.GetValue(iter, 0);

            ShowCustomerDialog(customerId);
		}

		protected void onHistoryRowActivated (object o, RowActivatedArgs args)
		{
            TreeIter iter;
            HistoryListStore.GetIter(out iter, args.Path);
            int appointmentId = (int)HistoryListStore.GetValue(iter, 0);

            ShowAppointmentDialog(appointmentId);
        }

		protected void onCustomerSearchEntryChanged (object sender, EventArgs e)
		{
            UpdateCustomerList();
		}

		protected void onHistorySearchEntryChanged (object sender, EventArgs e)
		{
            UpdateHistoryTreeview();
		}
	}
}