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
        private List<CustomerDialogPhoneNumberRow> phoneNumberRows = new List<CustomerDialogPhoneNumberRow>();

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

            phoneNumberRows.Add(row);
            phoneNumberContainerVbox.Add(row);
        }

        private void removePhoneNumberRow(CustomerDialogPhoneNumberRow row)
        {
            phoneNumberRows.Remove(row);
            phoneNumberContainerVbox.Remove(row);

            Console.WriteLine("row removed: " + phoneNumberRows.Count);
        }


        protected void onOkButtonClicked (object sender, EventArgs e)
		{
            List<CustomerPhoneNumber> phoneNumbers = new List<CustomerPhoneNumber>();

            foreach (CustomerDialogPhoneNumberRow row in phoneNumberRows)
            {
                phoneNumbers.Add(row.getPhoneNumber());
            }

            using (var db = new BizeeBirdDbContext())
            {
                var customer = new Customer
                {
                    Name = customerNameEntry.Text,
                    BoardingRate = boardingRateSpinButton.Value,
                    Notes = customerNotesTextView.Buffer.Text,
                    PhoneNumbers = phoneNumbers
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

