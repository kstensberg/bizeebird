using bizeebird.Ui.Widgets;
using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;
using Gtk;
using System;
using System.Collections.Generic;

namespace BizeeBirdBoarding.Ui
{
    public partial class NewCustomerDialog : Gtk.Dialog
	{
        public NewCustomerDialog ()
		{
			this.Build ();

            addPhoneNumberRow();
        }

        private void addPhoneNumberRow()
        {
            CustomerDialogPhoneNumberRow row = new CustomerDialogPhoneNumberRow();

            row.addOnAddButtonClicked(delegate {
                addPhoneNumberRow();
            });

            row.addOnRemoveButtonClicked(delegate {
                removePhoneNumberRow(row);
            });

            phoneNumberContainerVbox.Add(row);
        }

        private void removePhoneNumberRow(CustomerDialogPhoneNumberRow row)
        {
            phoneNumberContainerVbox.Remove(row);
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

