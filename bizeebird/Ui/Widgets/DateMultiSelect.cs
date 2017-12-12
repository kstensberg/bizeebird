using Gtk;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizeeBirdBoarding.Ui.Widgets
{
    class DateMultiSelect : Gtk.VBox
    {
        public DateTime Date
        {
            get { return _Date; }
            set { SetDate(value); }
        }

        private DateTime _Date;

        private Gtk.Calendar calendar;
        private ComboBox MonthCombo;
        private ComboBox DayCombo;
        private ComboBox YearCombo;

        public DateMultiSelect()
        {
            DateTime now = DateTime.Now;

            MonthCombo = new ComboBox(new string[] { "January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" });
            YearCombo = new ComboBox();
            DayCombo = new ComboBox();

            HBox comboHbox = new HBox();
            comboHbox.Add(MonthCombo);
            comboHbox.Add(DayCombo);
            comboHbox.Add(YearCombo);
            Add(comboHbox);

            calendar = new Gtk.Calendar();
            Add(calendar);

            SetDate(DateTime.Now);

            ShowAll();
        }

        private void SetDate(DateTime dateTime)
        {
            _Date = dateTime;

            calendar.Date = dateTime;

            PopulateDropDowns();
        }

        private void PopulateDropDowns()
        {          
            int daysInMonth = DateTime.DaysInMonth(_Date.Year, _Date.Month);

            var test = Enumerable.Range(_Date.Year - 5, _Date.Year + 5);

            var years = Enumerable.Range(_Date.Year - 5, 11).Select(x => x.ToString()).ToList();
            var days = Enumerable.Range(1, daysInMonth).Select(x => x.ToString()).ToList();

            UpdateCombo(YearCombo, years);
            UpdateCombo(DayCombo, days);

            SetComboActive(YearCombo, _Date.Year.ToString());
            SetComboActive(DayCombo, _Date.Day.ToString());

            var monthStr = new DateTimeFormatInfo().GetMonthName(_Date.Month);

            SetComboActive(MonthCombo, monthStr);
        }

        private void UpdateCombo(ComboBox comboBox, List<string> values)
        {
            comboBox.Clear();
            CellRendererText cell = new CellRendererText();
            comboBox.PackStart(cell, false);
            comboBox.AddAttribute(cell, "text", 0);
            ListStore store = new ListStore(typeof(string));
            comboBox.Model = store;

            foreach (var value in values)
            {
                store.AppendValues(value);
            }
        }

        private void SetComboActive(ComboBox comboBox, string activeValue)
        {
            Gtk.TreeIter iter;

            comboBox.Model.GetIterFirst(out iter);
            do
            {
                GLib.Value thisRow = new GLib.Value();
                comboBox.Model.GetValue(iter, 0, ref thisRow);

                if (thisRow.Val.ToString() == activeValue)
                {
                    comboBox.SetActiveIter(iter);
                    return;
                }
            } while (comboBox.Model.IterNext(ref iter));
        }
    }
}
