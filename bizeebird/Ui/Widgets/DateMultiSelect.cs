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

        private ComboBox MonthCombo;
        private ComboBox DayCombo;
        private ComboBox YearCombo;

        public DateMultiSelect()
        {
            DateTime now = DateTime.Now;

            MonthCombo = new ComboBox(new string[] { "January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" });
            DayCombo = new ComboBox();
            YearCombo = new ComboBox();

            HBox comboHbox = new HBox();
            comboHbox.Add(MonthCombo);
            comboHbox.Add(DayCombo);
            comboHbox.Add(YearCombo);
            Add(comboHbox);

            SetDate(DateTime.Now);

            MonthCombo.Changed += OnComboChanged;
            DayCombo.Changed += OnComboChanged;
            YearCombo.Changed += OnComboChanged;

            ShowAll();
        }

        private void SetDate(DateTime dateTime)
        {
            _Date = dateTime;

            PopulateDropDowns();
        }

        private void PopulateDropDowns()
        {          
            int daysInMonth = DateTime.DaysInMonth(_Date.Year, _Date.Month);

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
            comboBox.Changed -= OnComboChanged;
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

            comboBox.Changed += OnComboChanged;
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
                    comboBox.Changed -= OnComboChanged;
                    comboBox.SetActiveIter(iter);
                    comboBox.Changed += OnComboChanged;
                    return;
                }
            } while (comboBox.Model.IterNext(ref iter));
        }

        private void OnComboChanged(object sender, EventArgs args)
        {
            var month = GetComboValue(MonthCombo);
            var day = GetComboValue(DayCombo);
            var year = GetComboValue(YearCombo);

            if (month == null || day == null || year == null)
                return;

            int monthInt = GetNumericMonth(month);
            int dayInt = Int32.Parse(day);
            int yearInt = Int32.Parse(year);

            if (month != new DateTimeFormatInfo().GetMonthName(_Date.Month) ||
                dayInt != _Date.Day ||
                yearInt != _Date.Year)
            {
                DateTime newDate = new DateTime(yearInt, monthInt, dayInt);
                SetDate(newDate);
            }
        }

        private string GetComboValue(ComboBox comboBox)
        {
            Gtk.TreeIter iter;
            comboBox.GetActiveIter(out iter);

            GLib.Value activeRow = new GLib.Value();
            comboBox.Model.GetValue(iter, 0, ref activeRow);

            if (activeRow.Val == null)
            {
                return null;
            }

            return activeRow.Val.ToString();
        }

        private int GetNumericMonth(string month)
        {
            switch (month)
            {
                case "January": return 1;
                case "Febuary": return 2;
                case "March": return 3;
                case "April": return 4;
                case "May": return 5;
                case "June": return 6;
                case "July": return 7;
                case "August":return 8;
                case "September": return 9;
                case "October": return 10;
                case "November": return 11;
                case "December": return 12;
            }
            return 0;
        }
    }
}
