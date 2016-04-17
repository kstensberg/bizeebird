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
            throw new NotImplementedException();
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

    }
}

