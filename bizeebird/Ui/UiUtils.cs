using Gtk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizeeBirdBoarding.Ui
{
    class UiUtils
    {
        public static void addColumnToTreeView(TreeView treeView, string label, int pos, string attribute)
        {
            Gtk.TreeViewColumn column = new Gtk.TreeViewColumn();
            column.Title = label;
            Gtk.CellRendererText cell = new Gtk.CellRendererText();
            column.PackStart(cell, true);
            column.AddAttribute(cell, attribute, pos);

            treeView.AppendColumn(column);
        }
    }
}
