using Gtk;

namespace BizeeBirdBoarding.Ui
{
    public partial class MainWindow
    {
        private VBox topLevelVbox;

        private HButtonBox toolbarButtonBox;

        private Button button1;

        private Button button2;

        private Notebook notebook;

        private HPaned appointmentsTabHPaned;

        private Frame upcomingDropOffsFrame;

        private Alignment upcomingDropOffsGtkAlignment;

        private ScrolledWindow upcomingDropOffsGtkScrolledWindow;

        private TreeView upcomingDropOffsTreeView;

        private Label upcomingDropOffsLabel;

        private Frame upcomingPickupsFrame;

        private Alignment upcomingPickupsAlignment;

        private ScrolledWindow upcomingPickupsScrolledWindow;

        private TreeView upcomingPickupsTreeview;

        private Label upcomingPickupsLabel;

        private Label appointmentsTabLabel;

        private VBox customerTabVbox;

        private HBox hbox1;

        private Label customerSearchLabel;

        private Entry customerSearchEntry;

        private ScrolledWindow customersScrolledWindow;

        private TreeView customersTreeview;

        private Label customerTabLabel;

        private VBox historyTablVbox;

        private HBox historySearchHbox;

        private Label historySearchLabel;

        private Entry historySearchEntry;

        private ScrolledWindow historyScrolledWindow;

        private TreeView historyTreeview;

        private Label historyTabLabel;

        protected virtual void Build()
        {
            // Widget BizeeBirdBoarding.Ui.MainWindow
            Name = "BizeeBirdBoarding.Ui.MainWindow";
            Title = "BiZee Bird Boarding";
            WindowPosition = WindowPosition.CenterOnParent;
            DefaultWidth = 1115;
            DefaultHeight = 480;
            // Container child BizeeBirdBoarding.Ui.MainWindow.Container+ContainerChild
            topLevelVbox = new VBox();
            topLevelVbox.Name = "topLevelVbox";
            topLevelVbox.Spacing = 6;
            // Container child topLevelVbox.Box+BoxChild
            toolbarButtonBox = new HButtonBox();
            toolbarButtonBox.Name = "toolbarButtonBox";
            toolbarButtonBox.LayoutStyle = ((ButtonBoxStyle)(3));
            // Container child toolbarButtonBox.ButtonBox+ButtonBoxChild
            button1 = new Button();
            button1.CanFocus = true;
            button1.Name = "button1";
            button1.UseUnderline = true;
            button1.Label = "New Customer";
            toolbarButtonBox.Add(button1);
            ButtonBox.ButtonBoxChild w1 = ((ButtonBox.ButtonBoxChild)(toolbarButtonBox[button1]));
            w1.Expand = false;
            w1.Fill = false;
            // Container child toolbarButtonBox.ButtonBox+ButtonBoxChild
            button2 = new Button();
            button2.CanFocus = true;
            button2.Name = "button2";
            button2.UseUnderline = true;
            button2.Label = "New Appointment";
            toolbarButtonBox.Add(button2);
            ButtonBox.ButtonBoxChild w2 = ((ButtonBox.ButtonBoxChild)(toolbarButtonBox[button2]));
            w2.Position = 1;
            w2.Expand = false;
            w2.Fill = false;
            topLevelVbox.Add(toolbarButtonBox);
            Box.BoxChild w3 = ((Box.BoxChild)(topLevelVbox[toolbarButtonBox]));
            w3.Position = 0;
            w3.Expand = false;
            w3.Fill = false;
            // Container child topLevelVbox.Box+BoxChild
            notebook = new Notebook();
            notebook.CanFocus = true;
            notebook.Name = "notebook";
            notebook.CurrentPage = 0;
            // Container child notebook.Notebook+NotebookChild
            appointmentsTabHPaned = new HPaned();
            appointmentsTabHPaned.Name = "appointmentsTabHPaned";
            // Container child appointmentsTabHPaned.Paned+PanedChild
            upcomingDropOffsFrame = new Frame();
            upcomingDropOffsFrame.WidthRequest = 450;
            upcomingDropOffsFrame.Name = "upcomingDropOffsFrame";
            upcomingDropOffsFrame.ShadowType = ((ShadowType)(1));
            // Container child upcomingDropOffsFrame.Container+ContainerChild
            upcomingDropOffsGtkAlignment = new Alignment(0F, 0F, 1F, 1F);
            upcomingDropOffsGtkAlignment.Name = "upcomingDropOffsGtkAlignment";
            upcomingDropOffsGtkAlignment.LeftPadding = ((uint)(12));
            // Container child upcomingDropOffsGtkAlignment.Container+ContainerChild
            upcomingDropOffsGtkScrolledWindow = new ScrolledWindow();
            upcomingDropOffsGtkScrolledWindow.Name = "upcomingDropOffsGtkScrolledWindow";
            upcomingDropOffsGtkScrolledWindow.ShadowType = ((ShadowType)(1));
            // Container child upcomingDropOffsGtkScrolledWindow.Container+ContainerChild
            upcomingDropOffsTreeView = new TreeView();
            upcomingDropOffsTreeView.CanFocus = true;
            upcomingDropOffsTreeView.Name = "upcomingDropOffsTreeView";
            upcomingDropOffsGtkScrolledWindow.Add(upcomingDropOffsTreeView);
            upcomingDropOffsGtkAlignment.Add(upcomingDropOffsGtkScrolledWindow);
            upcomingDropOffsFrame.Add(upcomingDropOffsGtkAlignment);
            upcomingDropOffsLabel = new Label();
            upcomingDropOffsLabel.Name = "upcomingDropOffsLabel";
            upcomingDropOffsLabel.LabelProp = "<b>Upcoming Drop Offs</b>";
            upcomingDropOffsLabel.UseMarkup = true;
            upcomingDropOffsFrame.LabelWidget = upcomingDropOffsLabel;
            appointmentsTabHPaned.Add(upcomingDropOffsFrame);
            Paned.PanedChild w7 = ((Paned.PanedChild)(appointmentsTabHPaned[upcomingDropOffsFrame]));
            w7.Resize = false;
            // Container child appointmentsTabHPaned.Paned+PanedChild
            upcomingPickupsFrame = new Frame();
            upcomingPickupsFrame.Name = "upcomingPickupsFrame";
            upcomingPickupsFrame.ShadowType = ((ShadowType)(1));
            // Container child upcomingPickupsFrame.Container+ContainerChild
            upcomingPickupsAlignment = new Alignment(0F, 0F, 1F, 1F);
            upcomingPickupsAlignment.Name = "upcomingPickupsAlignment";
            upcomingPickupsAlignment.LeftPadding = ((uint)(12));
            // Container child upcomingPickupsAlignment.Container+ContainerChild
            upcomingPickupsScrolledWindow = new ScrolledWindow();
            upcomingPickupsScrolledWindow.Name = "upcomingPickupsScrolledWindow";
            upcomingPickupsScrolledWindow.ShadowType = ((ShadowType)(1));
            // Container child upcomingPickupsScrolledWindow.Container+ContainerChild
            upcomingPickupsTreeview = new TreeView();
            upcomingPickupsTreeview.CanFocus = true;
            upcomingPickupsTreeview.Name = "upcomingPickupsTreeview";
            upcomingPickupsScrolledWindow.Add(upcomingPickupsTreeview);
            upcomingPickupsAlignment.Add(upcomingPickupsScrolledWindow);
            upcomingPickupsFrame.Add(upcomingPickupsAlignment);
            upcomingPickupsLabel = new Label();
            upcomingPickupsLabel.Name = "upcomingPickupsLabel";
            upcomingPickupsLabel.LabelProp = "<b>Upcoming Pickups</b>";
            upcomingPickupsLabel.UseMarkup = true;
            upcomingPickupsFrame.LabelWidget = upcomingPickupsLabel;
            appointmentsTabHPaned.Add(upcomingPickupsFrame);
            notebook.Add(appointmentsTabHPaned);
            // Notebook tab
            appointmentsTabLabel = new Label();
            appointmentsTabLabel.Name = "appointmentsTabLabel";
            appointmentsTabLabel.LabelProp = "Appointments";
            notebook.SetTabLabel(appointmentsTabHPaned, appointmentsTabLabel);
            appointmentsTabLabel.ShowAll();
            // Container child notebook.Notebook+NotebookChild
            customerTabVbox = new VBox();
            customerTabVbox.Name = "customerTabVbox";
            customerTabVbox.Spacing = 6;
            // Container child customerTabVbox.Box+BoxChild
            hbox1 = new HBox();
            hbox1.Name = "hbox1";
            hbox1.Spacing = 6;
            // Container child hbox1.Box+BoxChild
            customerSearchLabel = new Label();
            customerSearchLabel.Name = "customerSearchLabel";
            customerSearchLabel.LabelProp = "Search";
            hbox1.Add(customerSearchLabel);
            Box.BoxChild w13 = ((Box.BoxChild)(hbox1[customerSearchLabel]));
            w13.Position = 0;
            w13.Expand = false;
            w13.Fill = false;
            // Container child hbox1.Box+BoxChild
            customerSearchEntry = new Entry();
            customerSearchEntry.CanFocus = true;
            customerSearchEntry.Name = "customerSearchEntry";
            customerSearchEntry.IsEditable = true;
            customerSearchEntry.InvisibleChar = '●';
            hbox1.Add(customerSearchEntry);
            Box.BoxChild w14 = ((Box.BoxChild)(hbox1[customerSearchEntry]));
            w14.Position = 1;
            customerTabVbox.Add(hbox1);
            Box.BoxChild w15 = ((Box.BoxChild)(customerTabVbox[hbox1]));
            w15.Position = 0;
            w15.Expand = false;
            w15.Fill = false;
            // Container child customerTabVbox.Box+BoxChild
            customersScrolledWindow = new ScrolledWindow();
            customersScrolledWindow.Name = "customersScrolledWindow";
            customersScrolledWindow.ShadowType = ((ShadowType)(1));
            // Container child customersScrolledWindow.Container+ContainerChild
            customersTreeview = new TreeView();
            customersTreeview.CanFocus = true;
            customersTreeview.Name = "customersTreeview";
            customersScrolledWindow.Add(customersTreeview);
            customerTabVbox.Add(customersScrolledWindow);
            Box.BoxChild w17 = ((Box.BoxChild)(customerTabVbox[customersScrolledWindow]));
            w17.Position = 1;
            notebook.Add(customerTabVbox);
            Notebook.NotebookChild w18 = ((Notebook.NotebookChild)(notebook[customerTabVbox]));
            w18.Position = 1;
            // Notebook tab
            customerTabLabel = new Label();
            customerTabLabel.Name = "customerTabLabel";
            customerTabLabel.LabelProp = "Customers";
            notebook.SetTabLabel(customerTabVbox, customerTabLabel);
            customerTabLabel.ShowAll();
            // Container child notebook.Notebook+NotebookChild
            historyTablVbox = new VBox();
            historyTablVbox.Name = "historyTablVbox";
            historyTablVbox.Spacing = 6;
            // Container child historyTablVbox.Box+BoxChild
            historySearchHbox = new HBox();
            historySearchHbox.Name = "historySearchHbox";
            historySearchHbox.Spacing = 6;
            // Container child historySearchHbox.Box+BoxChild
            historySearchLabel = new Label();
            historySearchLabel.Name = "historySearchLabel";
            historySearchLabel.LabelProp = "Search";
            historySearchHbox.Add(historySearchLabel);
            Box.BoxChild w19 = ((Box.BoxChild)(historySearchHbox[historySearchLabel]));
            w19.Position = 0;
            w19.Expand = false;
            w19.Fill = false;
            // Container child historySearchHbox.Box+BoxChild
            historySearchEntry = new Entry();
            historySearchEntry.CanFocus = true;
            historySearchEntry.Name = "historySearchEntry";
            historySearchEntry.IsEditable = true;
            historySearchEntry.InvisibleChar = '●';
            historySearchHbox.Add(historySearchEntry);
            Box.BoxChild w20 = ((Box.BoxChild)(historySearchHbox[historySearchEntry]));
            w20.Position = 1;
            historyTablVbox.Add(historySearchHbox);
            Box.BoxChild w21 = ((Box.BoxChild)(historyTablVbox[historySearchHbox]));
            w21.Position = 0;
            w21.Expand = false;
            w21.Fill = false;
            // Container child historyTablVbox.Box+BoxChild
            historyScrolledWindow = new ScrolledWindow();
            historyScrolledWindow.Name = "historyScrolledWindow";
            historyScrolledWindow.ShadowType = ((ShadowType)(1));
            // Container child historyScrolledWindow.Container+ContainerChild
            historyTreeview = new TreeView();
            historyTreeview.CanFocus = true;
            historyTreeview.Name = "historyTreeview";
            historyScrolledWindow.Add(historyTreeview);
            historyTablVbox.Add(historyScrolledWindow);
            Box.BoxChild w23 = ((Box.BoxChild)(historyTablVbox[historyScrolledWindow]));
            w23.Position = 1;
            notebook.Add(historyTablVbox);
            Notebook.NotebookChild w24 = ((Notebook.NotebookChild)(notebook[historyTablVbox]));
            w24.Position = 2;
            // Notebook tab
            historyTabLabel = new Label();
            historyTabLabel.Name = "historyTabLabel";
            historyTabLabel.LabelProp = "History";
            notebook.SetTabLabel(historyTablVbox, historyTabLabel);
            historyTabLabel.ShowAll();
            topLevelVbox.Add(notebook);
            Box.BoxChild w25 = ((Box.BoxChild)(topLevelVbox[notebook]));
            w25.Position = 1;
            Add(topLevelVbox);
            if ((Child != null))
            {
                Child.ShowAll();
            }
            Show();
            DeleteEvent += new DeleteEventHandler(OnDeleteEvent);
            button1.Clicked += new System.EventHandler(onNewCustomerClicked);
            button2.Clicked += new System.EventHandler(onNewApointmentButtonClicked);
            upcomingDropOffsTreeView.RowActivated += new RowActivatedHandler(onUpcomingDropOffsRowActivated);
            upcomingPickupsTreeview.RowActivated += new RowActivatedHandler(onUpcomingPickupsRowActivated);
            customerSearchEntry.Changed += new System.EventHandler(onCustomerSearchEntryChanged);
            customersTreeview.RowActivated += new RowActivatedHandler(onCustomersRowActivated);
            historySearchEntry.Changed += new System.EventHandler(onHistorySearchEntryChanged);
            historyTreeview.RowActivated += new RowActivatedHandler(onHistoryRowActivated);
        }
    }
}
