using System;
using Gtk;

namespace BizeeBirdBoarding
{
	class BizeeBird
	{
		public static void Main (string[] args)
		{
			Application.Init ();
			MainWindow win = new MainWindow ();
			win.Show ();
			Application.Run ();
		}
	}
}
