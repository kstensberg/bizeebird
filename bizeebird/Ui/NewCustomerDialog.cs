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
        private List<Bird> birds = new List<Bird>();
        private Gtk.ListStore birdsListStore;
        public NewCustomerDialog ()
		{
			this.Build ();
            
            Gtk.TreeViewColumn nameColumn = new Gtk.TreeViewColumn();
            nameColumn.Title = "Name";
            Gtk.CellRendererText nameCell = new Gtk.CellRendererText();
            nameColumn.PackStart(nameCell, true);

            Gtk.TreeViewColumn breedColumn = new Gtk.TreeViewColumn();
            breedColumn.Title = "Breed";
            Gtk.CellRendererText breedCell = new Gtk.CellRendererText();
            breedColumn.PackStart(breedCell, true);

            Gtk.TreeViewColumn colorColumn = new Gtk.TreeViewColumn();
            colorColumn.Title = "Color";
            Gtk.CellRendererText  colorCell = new Gtk.CellRendererText();
            colorColumn.PackStart(colorCell, true);

            Gtk.TreeViewColumn ageColumn = new Gtk.TreeViewColumn();
            ageColumn.Title = "Age";
            Gtk.CellRendererText ageCell = new Gtk.CellRendererText();
            ageColumn.PackStart(ageCell, true);

            Gtk.TreeViewColumn genderColumn = new Gtk.TreeViewColumn();
            genderColumn.Title = "Gender";
            Gtk.CellRendererText genderCell = new Gtk.CellRendererText();
            genderColumn.PackStart(genderCell, true);

            birdsTreeView.AppendColumn(nameColumn);
			birdsTreeView.AppendColumn(breedColumn);
            birdsTreeView.AppendColumn(colorColumn);
            birdsTreeView.AppendColumn(ageColumn);
            birdsTreeView.AppendColumn(genderColumn);

            nameColumn.AddAttribute(nameCell, "text", 0);
            breedColumn.AddAttribute(breedCell, "text", 1);
            colorColumn.AddAttribute(colorCell, "text", 2);
            ageColumn.AddAttribute(ageCell, "text", 3);
            genderColumn.AddAttribute(genderCell, "text", 4);

            birdsListStore = new Gtk.ListStore(typeof(string), typeof(string), typeof(string), typeof(int), typeof(string));

            birdsTreeView.Model = birdsListStore;

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
                    PhoneNumbers = phoneNumbers,
                    Birds = birds
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

            birds.Add(bird);

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

            birdsListStore.Clear();
            
            foreach (Bird bird in birds)
            {
                birdsListStore.AppendValues(bird.Name, bird.Breed, bird.Color, bird.Age, bird.Gender.ToString());
            }
        }

		protected void onBirdRemoveButtonClicked (object sender, EventArgs e)
		{
			throw new NotImplementedException ();
		}
	}
}

