using bizeebird.Ui.Widgets;
using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;
using Gtk;
using System;
using System.Collections.Generic;

namespace BizeeBirdBoarding.Ui
{
    public partial class CustomerDialog : Gtk.Dialog
	{
        private int? CustomerId;

        private List<CustomerDialogPhoneNumberRow> PhoneNumberRows = new List<CustomerDialogPhoneNumberRow>();
        private List<Bird> Birds = new List<Bird>();
        private Gtk.ListStore BirdsListStore;

        public CustomerDialog(int customerId) : this()
        {
            using (var db = new BizeeBirdDbContext())
            {
                this.CustomerId = customerId;
                Customer customer = db.Customers.Find(customerId);

                customerNameEntry.Text = customer.Name;
                boardingRateSpinButton.Value = customer.BoardingRate;
                customerNotesTextView.Buffer.Text = customer.Notes;
                emailEntry.Text = customer.Email;

                if (customer.PhoneNumbers != null && customer.PhoneNumbers.Count > 0)
                {
                    removePhoneNumberRow(PhoneNumberRows[0]);

                    foreach (CustomerPhoneNumber phoneNumber in customer.PhoneNumbers)
                    {
                        addPhoneNumberRow(true, phoneNumber);
                    }
                }

                Birds = customer.Birds;

                resetBirdWidgetsAndRefreshBirdsList();
            }
        }

        public CustomerDialog ()
		{
            this.CustomerId = null;

			this.Build ();

            birdsTreeView.AppendColumn("Name", new Gtk.CellRendererText(), "text", 1);
            birdsTreeView.AppendColumn("Breed", new Gtk.CellRendererText(), "text", 2);
            birdsTreeView.AppendColumn("Color", new Gtk.CellRendererText(), "text", 3);
            birdsTreeView.AppendColumn("Age", new Gtk.CellRendererText(), "text", 4);
            birdsTreeView.AppendColumn("Gender", new Gtk.CellRendererText(), "text", 5);

            BirdsListStore = new Gtk.ListStore(typeof(int), typeof(string), typeof(string), typeof(string), typeof(int), typeof(string));

            birdsTreeView.Model = BirdsListStore;

            addPhoneNumberRow(true);
        }

        private void addPhoneNumberRow(bool removeButtonDisabled = false, CustomerPhoneNumber phoneNumber = null)
        {
            CustomerDialogPhoneNumberRow row;

            if (phoneNumber != null)
                row = new CustomerDialogPhoneNumberRow(removeButtonDisabled, phoneNumber.PhoneNumberId, phoneNumber.PhoneNumber);
            else
                row = new CustomerDialogPhoneNumberRow(removeButtonDisabled);

            row.addOnAddButtonClicked(delegate {
                addPhoneNumberRow();
            });

            row.addOnRemoveButtonClicked(delegate {
                removePhoneNumberRow(row);
            });

            PhoneNumberRows.Add(row);
            phoneNumberContainerVbox.Add(row);
        }

        private void removePhoneNumberRow(CustomerDialogPhoneNumberRow row)
        {
            PhoneNumberRows.Remove(row);
            phoneNumberContainerVbox.Remove(row);

            Console.WriteLine("row removed: " + PhoneNumberRows.Count);
        }


        protected void onOkButtonClicked (object sender, EventArgs e)
		{
            if (birdNameEntry.Text.Trim() != "")
                onBirdAddButtonClicked(sender, e);

            List<CustomerPhoneNumber> phoneNumbers = new List<CustomerPhoneNumber>();

            foreach (CustomerDialogPhoneNumberRow row in PhoneNumberRows)
            {
                phoneNumbers.Add(row.getPhoneNumber());
            }

            using (var db = new BizeeBirdDbContext())
            {
                if (CustomerId.HasValue)
                {
                    var original = db.Customers.Find(CustomerId);

                    if (original != null)
                    {
                        original.Name = customerNameEntry.Text;
                        original.BoardingRate = boardingRateSpinButton.Value;
                        original.Notes = customerNotesTextView.Buffer.Text;
                        //original.PhoneNumbers = phoneNumbers;
                        original.Email = emailEntry.Text;
                        //original.Birds = Birds;
                    }
                }
                else
                {
                    var customer = new Customer
                    {
                        Name = customerNameEntry.Text,
                        BoardingRate = boardingRateSpinButton.Value,
                        Notes = customerNotesTextView.Buffer.Text,
                        PhoneNumbers = phoneNumbers,
                        Email = emailEntry.Text,
                        Birds = Birds
                    };

                    db.Customers.Add(customer);
                }
                
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
            Gender gender;

            if (birdGenderMaleRadioButton.Active)
                gender = Gender.Male;
            else
                gender = Gender.Female;

            Bird bird = new Bird()
            {
                Name = birdNameEntry.Text,
                Breed = birdBreedEntry.Text,
                Color = birdColorEntry.Text,
                Age = birdAgeSpinButton.ValueAsInt,
                Gender = gender,
                Notes = birdNotesTextView.Buffer.Text
            };

            Birds.Add(bird);

            resetBirdWidgetsAndRefreshBirdsList();

        }

        private void resetBirdWidgetsAndRefreshBirdsList()
        {
            birdNameEntry.Text = "";
            birdBreedEntry.Text = "";
            birdColorEntry.Text = "";
            birdAgeSpinButton.Value = 0.0f;
            birdGenderMaleRadioButton.Activate();
            birdNotesTextView.Buffer.Clear();

            BirdsListStore.Clear();

            for (int idx = 0; idx < Birds.Count; idx++)
            {
                Bird bird = Birds[idx];
                BirdsListStore.AppendValues(idx, bird.Name, bird.Breed, bird.Color, bird.Age, bird.Gender.ToString());
            }
        }

		protected void onBirdRemoveButtonClicked (object sender, EventArgs e)
		{
            TreeSelection selection = birdsTreeView.Selection;
            TreeModel model;
            TreeIter iter;

            if (selection.GetSelected(out model, out iter))
            {
                int idx = (int)model.GetValue(iter, 5);
                Birds.RemoveAt(idx);
                resetBirdWidgetsAndRefreshBirdsList();
            }
		}
	}
}

