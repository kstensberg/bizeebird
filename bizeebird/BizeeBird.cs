using BizeeBirdBoarding.Ui;
using Gtk;
using System;
using System.IO;
using System.Net;
using System.Diagnostics;
using System.Threading;

namespace BizeeBirdBoarding
{
    class BizeeBird
	{
		public static void Main (string[] args)
		{
            var th = new Thread(AutoUpdateThread);
            th.Start();

            SetDataDirectory();

            Application.Init ();
			MainWindow win = new MainWindow ();
			win.Show ();
			Application.Run ();
		}

        private static void SetDataDirectory()
        {
            string path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "BizeeBird");
            AppDomain.CurrentDomain.SetData("DataDirectory", path);
        }

        private static void AutoUpdateThread()
        {
            try
            {
                WebRequest webRequest = WebRequest.Create("http://erza.net/bizeebird/update");
                webRequest.Headers.Add("Version", "1.1");
                HttpWebResponse response = (HttpWebResponse)webRequest.GetResponse();

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    string installerPath = Path.GetTempPath() + "\\installer.exe";
                    using (var fileStream = File.Create(installerPath))
                    {
                        response.GetResponseStream().CopyTo(fileStream);
                    }

                    Process.Start(installerPath);
                    Environment.Exit(0);
                }
            }
            catch (WebException)
            {
                //TODO log
                return;
            }
        }
	}
}
