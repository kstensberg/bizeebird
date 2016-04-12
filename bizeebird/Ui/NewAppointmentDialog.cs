using System;
using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;

namespace BizeeBirdBoarding.Ui
{
	public partial class NewAppointmentDialog : Gtk.Dialog
	{
		public NewAppointmentDialog ()
		{
			this.Build ();
		}

		protected void onOkButtonClicked (object sender, EventArgs e)
		{
			using (var db = new BizeeBirdDbContext())
			{
				//TODO get from widgets
				var customer = new Customer
				{
					Name = "Name",
					BoardingRate = 0.0f,
					Notes = "Notes"
				};

				db.Customers.Add(customer);
				db.SaveChanges();
			}
		}

		protected void onCancelButtonClicked (object sender, EventArgs e)
		{
			throw new NotImplementedException ();
		}
	}
}

