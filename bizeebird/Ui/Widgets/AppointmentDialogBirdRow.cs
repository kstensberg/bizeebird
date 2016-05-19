using BizeeBirdBoarding.Db.Model;
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
        public Bird Bird { get; private set; }

        public bool Wings
        {
            get
            {
                if (!IsEnabled())
                    return false;
                else
                    return WingsCheckButton.Active;
            }
        }

        public bool Nails
        {
            get
            {
                if (!IsEnabled())
                    return false;
                else
                    return NailsCheckButton.Active;
            }
        }

        public bool CageNeeded
        {
            get
            {
                if (!IsEnabled())
                    return false;
                else
                    return CageNeededCheckButton.Active;
            }
        }

        private CheckButton EnableCheckbutton;
        private CheckButton WingsCheckButton;
        private CheckButton NailsCheckButton;
        private CheckButton CageNeededCheckButton;

        public AppointmentDialogBirdRow(Bird bird)
        {
            Bird = bird;

            EnableCheckbutton = new CheckButton(bird.Name);
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

        public bool IsEnabled()
        {
            return EnableCheckbutton.Active;
        }

        void OnToggled(object sender, EventArgs args)
        {
            if (IsEnabled())
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
