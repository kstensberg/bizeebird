using System;

namespace BizeeBirdBoarding.Ui
{
    public partial class NewAppointmentDialog : Gtk.Dialog
	{
		public NewAppointmentDialog ()
		{
			this.Build ();
		}

		protected void onOkButtonClicked (object sender, EventArgs e)
		{
            throw new NotImplementedException();
        }

		protected void onCancelButtonClicked (object sender, EventArgs e)
		{
            Destroy();
		}
	}
}

