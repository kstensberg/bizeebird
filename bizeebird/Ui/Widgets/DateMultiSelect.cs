using BizeeBirdBoarding.Db;
using BizeeBirdBoarding.Db.Model;
using Gtk;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizeeBirdBoarding.Ui.Widgets
{
    class DateMultiSelect : Gtk.HBox
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

            MonthCombo = new ComboBox();
            DayCombo = new ComboBox();
            YearCombo = new ComboBox();

            this.Add(MonthCombo);
            this.Add(DayCombo);
            this.Add(YearCombo);

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

            SetComboActive(MonthCombo, _Date.Month);
            SetComboActive(DayCombo, _Date.Day);
            SetComboActive(YearCombo, _Date.Year);
        }

        public void PopulateDropDowns()
        {
            UpdateCombo(MonthCombo, new Dictionary<int, string>()
            {
                { 1, "January"},
                { 2, "Febuary"},
                { 3, "March"},
                { 4, "April"},
                { 5, "May"},
                { 6, "June"},
                { 7, "July"},
                { 8, "August"},
                { 9, "September"},
                { 10, "October"},
                { 11, "November"},
                { 12, "December"}
            });

            int daysInMonth = DateTime.DaysInMonth(_Date.Year, _Date.Month);
            var days = Enumerable.Range(1, daysInMonth).ToDictionary(v => v, v => v.ToString());
            UpdateCombo(DayCombo, days);

            var years = Enumerable.Range(_Date.Year - 5, 11).ToDictionary(v => v, v => v.ToString());
            UpdateCombo(YearCombo, years);
        }

        private void UpdateCombo(ComboBox comboBox, Dictionary<int, string> values)
        {
            comboBox.Clear();
            CellRendererText cell = new CellRendererText();
            comboBox.PackStart(cell, false);
            comboBox.AddAttribute(cell, "text", 0);
            ListStore store = new ListStore(typeof(string), typeof(int));
            comboBox.Model = store;

            using (var db = new BizeeBirdDbContext())
            {

                IQueryable set = db.Customers;

                foreach (KeyValuePair<int, string> kvp in values)
                {
                    store.AppendValues(kvp.Value, kvp.Key);
                }
            }
        }

        private void SetComboActive(ComboBox comboBox, int activeValue)
        {
            Gtk.TreeIter iter;

            comboBox.Model.GetIterFirst(out iter);
            do
            {
                GLib.Value thisRow = new GLib.Value();
                comboBox.Model.GetValue(iter, 1, ref thisRow);

                if ((int)thisRow.Val == activeValue)
                {
                    comboBox.SetActiveIter(iter);
                    return;
                }
            } while (comboBox.Model.IterNext(ref iter));
        }

        private void OnComboChanged(object sender, EventArgs args)
        {
            int month = GetComboValue(MonthCombo);
            int day = GetComboValue(DayCombo);
            int year = GetComboValue(YearCombo);

            if (month == -1 || day == -1 || year == -1)
                return;

            if (month != _Date.Month ||
                day != _Date.Day ||
                year != _Date.Year)
            {
                if (day > DateTime.DaysInMonth(year, month))
                    day = 1;

                DateTime newDate = new DateTime(year, month, day);
                SetDate(newDate);
            }
        }

        private int GetComboValue(ComboBox comboBox)
        {
            Gtk.TreeIter iter;
            comboBox.GetActiveIter(out iter);

            GLib.Value activeRow = new GLib.Value();
            comboBox.Model.GetValue(iter, 1, ref activeRow);

            if (activeRow.Val == null)
            {
                return -1;
            }

            return (int)activeRow.Val;
        }
    }
}
