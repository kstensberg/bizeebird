using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;
using System;

namespace BizeeBirdBoarding.Ui
{
    public partial class NewCustomerDialog : Gtk.Dialog
	{
		public NewCustomerDialog ()
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

            Destroy();
        }

		protected void onCancelButtonClicked (object sender, EventArgs e)
		{
            Destroy();
        }

		protected void onPhoneNumberAddButtonClicked (object sender, EventArgs e)
		{
			throw new NotImplementedException ();
		}

		protected void onPhoneNumberRemoveClicked (object sender, EventArgs e)
		{
			throw new NotImplementedException ();
		}

		protected void onBirdAddButtonClicked (object sender, EventArgs e)
		{
			throw new NotImplementedException ();
		}

		protected void onBirdRemoveButtonClicked (object sender, EventArgs e)
		{
			throw new NotImplementedException ();
		}
	}
}

