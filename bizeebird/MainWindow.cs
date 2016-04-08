using System;
using Gtk;

namespace BizeeBirdBoarding
{
	public partial class MainWindow: Gtk.Window
	{	
		public MainWindow (): base (Gtk.WindowType.Toplevel)
		{
			Build ();
		}

		protected void OnDeleteEvent (object sender, DeleteEventArgs a)
		{
			Application.Quit ();
			a.RetVal = true;
		}

		protected void onNewCustomerClicked (object sender, EventArgs e)
		{
			NewAppointmentDialog dialog = new NewAppointmentDialog ();
			dialog.ShowAll ();
		}

		protected void onNewApointmentButtonClicked (object sender, EventArgs e)
		{
			NewCustomerDialog dialog = new NewCustomerDialog ();
			dialog.ShowAll ();
		}
	}
}