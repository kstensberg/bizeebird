using bizeebird.Ui.Widgets;
using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;
using Gtk;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

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
            this.CustomerId = customerId;

            using (var db = new BizeeBirdDbContext())
            {
                Customer customer = db.Customers.Find(customerId);

                customerNameEntry.Text = customer.Name;
                boardingRateSpinButton.Value = customer.BoardingRate;
                customerNotesTextView.Buffer.Text = customer.Notes;
                emailEntry.Text = customer.Email;

                if (customer.PhoneNumbers != null && customer.PhoneNumbers.Count() > 0)
                {
                    RemovePhoneNumberRow(PhoneNumberRows[0]);

                    foreach (CustomerPhoneNumber phoneNumber in customer.PhoneNumbers)
                    {
                        if (PhoneNumberRows.Count() <= 0)
                            AddPhoneNumberRow(true, phoneNumber);
                        else
                            AddPhoneNumberRow(false, phoneNumber);
                    }
                }

                Birds = customer.Birds.ToList();

                ResetBirdWidgetsAndRefreshBirdsList();
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

            AddPhoneNumberRow(true);
        }

        private void AddPhoneNumberRow(bool removeButtonDisabled = false, CustomerPhoneNumber phoneNumber = null)
        {
            CustomerDialogPhoneNumberRow row;

            if (phoneNumber != null)
                row = new CustomerDialogPhoneNumberRow(removeButtonDisabled, phoneNumber.PhoneNumberId, phoneNumber.PhoneNumber);
            else
                row = new CustomerDialogPhoneNumberRow(removeButtonDisabled);

            row.addOnAddButtonClicked(delegate {
                AddPhoneNumberRow();
            });

            row.addOnRemoveButtonClicked(delegate {
                RemovePhoneNumberRow(row);
            });

            PhoneNumberRows.Add(row);
            phoneNumberContainerVbox.Add(row);
        }

        private void RemovePhoneNumberRow(CustomerDialogPhoneNumberRow row)
        {
            PhoneNumberRows.Remove(row);
            phoneNumberContainerVbox.Remove(row);
        }

        private void UpdateExistingCustomer(BizeeBirdDbContext db)
        {
            Customer customer = db.Customers.Find(CustomerId);

            if (customer != null)
            {
                customer.Name = customerNameEntry.Text;
                customer.BoardingRate = boardingRateSpinButton.Value;
                customer.Notes = customerNotesTextView.Buffer.Text;
                customer.Email = emailEntry.Text;

                UpdatePhoneNumbers(db, customer);

                UpdateBirds(db, customer);
            }
            else
            {
                //TODO ERROR
            }
        }

        private void UpdatePhoneNumbers(BizeeBirdDbContext db, Customer customer)
        {
            for (int idx = customer.PhoneNumbers.Count() - 1; idx >= 0; idx--)
            {
                var dbPhoneNumber = customer.PhoneNumbers[idx];

                //TODO I'm not sure this is a very reliable check for new records.  shouldn't we add a foreign key to CustomerPhoneNumbers and iterate on that
                //instead of using customer.PhoneNumbers?
                if (dbPhoneNumber.PhoneNumberId != 0)
                {
                    bool inPhoneNumberRows = PhoneNumberRows.Where(pn => pn.PhoneNumberId == dbPhoneNumber.PhoneNumberId).Count() > 0;

                    if (!inPhoneNumberRows)
                        db.CustomerPhoneNumbers.Remove(dbPhoneNumber);
                }
            }

            foreach (CustomerDialogPhoneNumberRow row in PhoneNumberRows)
            {

                if (row.PhoneNumberId.HasValue)
                {
                    CustomerPhoneNumber customerPhoneNumber = db.CustomerPhoneNumbers.Find(row.PhoneNumberId.Value);
                    customerPhoneNumber.PhoneNumber = row.getPhoneNumber();
                }
                else
                {
                    customer.PhoneNumbers.Add(new CustomerPhoneNumber()
                    {
                        PhoneNumber = row.getPhoneNumber()
                    });
                }
            }

            
        }

        private void UpdateBirds(BizeeBirdDbContext db, Customer customer)
        {
            foreach (Bird bird in Birds)
            {
                //TODO should we check for new records this way?
                if (bird.BirdId != 0)
                {
                    Bird dbBird = db.Birds.Find(bird.BirdId);

                    dbBird.Deleted = bird.Deleted;
                    dbBird.Name = bird.Name;
                    dbBird.Breed = bird.Breed;
                    dbBird.Color = bird.Color;
                    dbBird.Age = bird.Age;
                    dbBird.Gender = bird.Gender;
                    dbBird.Notes = bird.Notes;
                }
                else
                {
                    customer.Birds.Add(bird);
                }
            }
        }

        private void CreateNewCustomer(BizeeBirdDbContext db)
        {
            List<CustomerPhoneNumber> phoneNumbers = new List<CustomerPhoneNumber>();

            foreach (CustomerDialogPhoneNumberRow row in PhoneNumberRows)
            {
                phoneNumbers.Add(new CustomerPhoneNumber()
                {
                    PhoneNumber = row.getPhoneNumber()
                });
            }

            Customer customer = new Customer
            {
                Name = customerNameEntry.Text,
                BoardingRate = boardingRateSpinButton.Value,
                Notes = customerNotesTextView.Buffer.Text,
                PhoneNumbers = phoneNumbers,
                Email = emailEntry.Text,
                Birds = Birds
            };

            customer = db.Customers.Add(customer);
        }

        protected void onOkButtonClicked (object sender, EventArgs e)
		{
            if (birdNameEntry.Text.Trim() != "")
                onBirdAddButtonClicked(sender, e);

            using (var db = new BizeeBirdDbContext())
            {
                if (CustomerId.HasValue)
                {
                    UpdateExistingCustomer(db);
                }
                else
                {
                    CreateNewCustomer(db);
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
                Notes = birdNotesTextView.Buffer.Text,
                Deleted = false
            };

            Birds.Add(bird);

            ResetBirdWidgetsAndRefreshBirdsList();

        }

        private void ResetBirdWidgetsAndRefreshBirdsList()
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

                if (!bird.Deleted)
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
                int idx = (int)model.GetValue(iter, 0);

                if (Birds.ElementAt(idx).BirdId == 0)
                    Birds.RemoveAt(idx);
                else
                    Birds.ElementAt(idx).Deleted = true;

                ResetBirdWidgetsAndRefreshBirdsList();
            }
		}
	}
}

