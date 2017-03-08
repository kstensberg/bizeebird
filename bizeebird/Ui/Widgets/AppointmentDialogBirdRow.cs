using BizeeBirdBoarding.Db;
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

        public bool BirdSelected
        {
            get
            {
                return EnableCheckbutton.Active;
            }
            set
            {
                EnableCheckbutton.Active = value;
            }
        }

        public bool Wings
        {
            get
            {
                if (!BirdSelected)
                    return false;
                else
                    return WingsCheckButton.Active;
            }
            set
            {
                WingsCheckButton.Active = value;
            }
        }

        public bool Nails
        {
            get
            {
                if (!BirdSelected)
                    return false;
                else
                    return NailsCheckButton.Active;
            }
            set
            {
                NailsCheckButton.Active = value;
            }
        }

        public bool CageNeeded
        {
            get
            {
                if (!BirdSelected)
                    return false;
                else
                    return CageNeededCheckButton.Active;
            }
            set
            {
                CageNeededCheckButton.Active = value;
            }
        }

        private CheckButton EnableCheckbutton;
        private CheckButton WingsCheckButton;
        private CheckButton NailsCheckButton;
        private CheckButton CageNeededCheckButton;

        public AppointmentDialogBirdRow(Bird bird, Customer customer)
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

            using (var db = new BizeeBirdDbContext())
            {
                var previousAppointments = db.Appointments.Where(x => x.Customer.CustomerId == customer.CustomerId);

                bool cageNeededCheckBox = false;

                foreach (var appointment in previousAppointments)
                {
                    var appointmentBird = appointment.AppointmentBirds.FirstOrDefault(x => x.Bird.BirdId == bird.BirdId);

                    if (appointmentBird != null)
                    {
                        cageNeededCheckBox = appointmentBird.CageNeeded;
                        break;
                    }
                }

                CageNeededCheckButton = new CheckButton("Cage Needed");
                CageNeededCheckButton.Sensitive = false;
                CageNeededCheckButton.Active = cageNeededCheckBox;
                Add(CageNeededCheckButton);
            }

            ShowAll();
        }

        

        void OnToggled(object sender, EventArgs args)
        {
            if (BirdSelected)
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
