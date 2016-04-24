using Gtk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bizeebird.Ui.Widgets
{
    class CustomerDialogPhoneNumberRow : Gtk.HBox
    {
        private int? PhoneNumberId;

        private Entry Entry;
        private Button AddButton;
        private Button RemoveButton;

        public CustomerDialogPhoneNumberRow(bool removeButtonDisabled, int? phoneNumberId = null, string value = "")
        {
            PhoneNumberId = phoneNumberId;

            Entry = new Entry();
            Entry.Text = value;
            Add(Entry);

			AddButton = new Button(Stock.Add);
			Add(AddButton);

			RemoveButton = new Button(Stock.Remove);
            RemoveButton.Sensitive = !removeButtonDisabled;
            Add(RemoveButton);

            ShowAll();
        }

        public void addOnAddButtonClicked(EventHandler handler)
        {
            AddButton.Clicked += handler;
        }

        public void addOnRemoveButtonClicked(EventHandler handler)
        {
            RemoveButton.Clicked += handler;
        }

        public string getPhoneNumber()
        {
            return Entry.Text;
        }
    }
}
