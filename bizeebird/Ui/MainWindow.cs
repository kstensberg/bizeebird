using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;
using Gtk;
using System;

namespace BizeeBirdBoarding.Ui
{
    public partial class MainWindow: Gtk.Window
	{
        private Gtk.ListStore CustomersListStore;

        public MainWindow() : base(Gtk.WindowType.Toplevel)
        {
            Build();

            UiUtils.addColumnToTreeView(customersTreeview, "Name", 0, "text");
            UiUtils.addColumnToTreeView(customersTreeview, "Phone Number", 1, "text");
            UiUtils.addColumnToTreeView(customersTreeview, "E-mail Address", 2, "text");
            UiUtils.addColumnToTreeView(customersTreeview, "Boarding Rate", 3, "text");
            UiUtils.addColumnToTreeView(customersTreeview, "Notes", 4, "text");

            CustomersListStore = new Gtk.ListStore(typeof(string), typeof(string), typeof(string), typeof(double), typeof(string));

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

                    CustomersListStore.AppendValues(row.Name, phoneNumber, row.Email, row.BoardingRate, row.Notes);
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
			NewCustomerDialog dialog = new NewCustomerDialog ();

            dialog.Destroyed += delegate
            {
                updateCustomerList();
            };


            dialog.ShowAll ();
		}

		protected void onNewApointmentButtonClicked (object sender, EventArgs e)
		{
			NewAppointmentDialog dialog = new NewAppointmentDialog ();
			dialog.ShowAll ();
		}
	}
}