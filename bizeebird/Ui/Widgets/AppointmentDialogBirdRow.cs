using Gtk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizeeBirdBoarding.Ui.Widgets
{
    class AppointmentDialogBirdRow : Gtk.VBox
    {
        private int BirdId;
        private CheckButton EnableCheckbutton;
        private CheckButton WingsCheckButton;
        private CheckButton NailsCheckButton;
        private CheckButton CageNeededCheckButton;

        public AppointmentDialogBirdRow(string birdName, int birdId)
        {
            BirdId = birdId;

            EnableCheckbutton = new CheckButton(birdName);
            EnableCheckbutton.Toggled += OnToggled;
            Add(EnableCheckbutton);

            WingsCheckButton = new CheckButton("Wings");
            WingsCheckButton.Sensitive = false;
            Add(WingsCheckButton);

            NailsCheckButton = new CheckButton("Nails");
            NailsCheckButton.Sensitive = false;
            Add(NailsCheckButton);

            CageNeededCheckButton = new CheckButton("Cage Needed");
            CageNeededCheckButton.Sensitive = false;
            Add(CageNeededCheckButton);

            ShowAll();
        }

        void OnToggled(object sender, EventArgs args)
        {
            if (EnableCheckbutton.Active)
            {
                WingsCheckButton.Sensitive = true;
                NailsCheckButton.Sensitive = true;
                CageNeededCheckButton.Sensitive = true;
            }
            else
            {
                WingsCheckButton.Sensitive = false;
                NailsCheckButton.Sensitive = false;
                CageNeededCheckButton.Sensitive = false;
            }
        }
    }
}
