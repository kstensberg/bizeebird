using Gtk;

namespace BizeeBirdBoarding.Ui
{
    public partial class AppointmentDialog
    {
        private Table topLevelTable;

        private Label birdLabel;

        private ScrolledWindow birdScrolledWindow;

        private HBox birdHBox;

        private Entry boardingRateEntry;

        private Label boardingRateLabel;

        private ComboBoxEntry customerCombobox;

        private Label customerLabel;

        private Alignment endDateContainer;

        private Label endDateLabel;

        private Label notesLabel;

        private ScrolledWindow notesScrolledWindow;

        private TextView notesTextView;

        private Alignment startDateContainer;

        private Label startDateLabel;

        private ComboBox statusCombobox;

        private Label statusLabel;

        private Button buttonCancel;

        private Button buttonOk;

        protected virtual void Build()
        {
            // Widget BizeeBirdBoarding.Ui.AppointmentDialog
            Name = "BizeeBirdBoarding.Ui.AppointmentDialog";
            Title = "New Appointment";
            WindowPosition = WindowPosition.CenterOnParent;
            // Internal child BizeeBirdBoarding.Ui.AppointmentDialog.VBox
            VBox w1 = VBox;
            w1.Name = "topLevelVbox";
            w1.BorderWidth = 2;
            // Container child topLevelVbox.Box+BoxChild
            topLevelTable = new Table(7, 2, false);
            topLevelTable.Name = "topLevelTable";
            topLevelTable.RowSpacing = 6;
            topLevelTable.ColumnSpacing = 6;
            // Container child topLevelTable.Table+TableChild
            birdLabel = new Label();
            birdLabel.Name = "birdLabel";
            birdLabel.LabelProp = "Bird";
            topLevelTable.Add(birdLabel);
            Table.TableChild w2 = (Table.TableChild)topLevelTable[birdLabel];
            w2.TopAttach = 1;
            w2.BottomAttach = 2;
            w2.XOptions = AttachOptions.Fill;
            w2.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            birdScrolledWindow = new ScrolledWindow();
            birdScrolledWindow.HeightRequest = 125;
            birdScrolledWindow.CanFocus = true;
            birdScrolledWindow.Name = "birdScrolledWindow";
            birdScrolledWindow.VscrollbarPolicy = PolicyType.Never;
            birdScrolledWindow.ShadowType = ShadowType.In;
            // Container child birdScrolledWindow.Container+ContainerChild
            Viewport w3 = new Viewport();
            w3.ShadowType = ShadowType.None;
            // Container child GtkViewport.Container+ContainerChild
            birdHBox = new HBox();
            birdHBox.Name = "birdHBox";
            birdHBox.Spacing = 6;
            w3.Add(birdHBox);
            birdScrolledWindow.Add(w3);
            topLevelTable.Add(birdScrolledWindow);
            Table.TableChild w6 = (Table.TableChild)topLevelTable[birdScrolledWindow];
            w6.TopAttach = 1;
            w6.BottomAttach = 2;
            w6.LeftAttach = 1;
            w6.RightAttach = 2;
            w6.XOptions = AttachOptions.Fill;
            w6.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            boardingRateEntry = new Entry();
            boardingRateEntry.Sensitive = false;
            boardingRateEntry.CanFocus = true;
            boardingRateEntry.Name = "boardingRateEntry";
            boardingRateEntry.IsEditable = true;
            topLevelTable.Add(boardingRateEntry);
            Table.TableChild w7 = (Table.TableChild)topLevelTable[boardingRateEntry];
            w7.TopAttach = 2;
            w7.BottomAttach = 3;
            w7.LeftAttach = 1;
            w7.RightAttach = 2;
            w7.XOptions = AttachOptions.Fill;
            w7.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            boardingRateLabel = new Label();
            boardingRateLabel.Name = "boardingRateLabel";
            boardingRateLabel.LabelProp = "Boarding Rate";
            topLevelTable.Add(boardingRateLabel);
            Table.TableChild w8 = (Table.TableChild)topLevelTable[boardingRateLabel];
            w8.TopAttach = 2;
            w8.BottomAttach = 3;
            w8.XOptions = AttachOptions.Fill;
            w8.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            customerCombobox = ComboBoxEntry.NewText();
            customerCombobox.Name = "customerCombobox";
            topLevelTable.Add(customerCombobox);
            Table.TableChild w9 = (Table.TableChild)topLevelTable[customerCombobox];
            w9.LeftAttach = 1;
            w9.RightAttach = 2;
            w9.XOptions = AttachOptions.Fill;
            w9.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            customerLabel = new Label();
            customerLabel.Name = "customerLabel";
            customerLabel.LabelProp = "Customer";
            topLevelTable.Add(customerLabel);
            Table.TableChild w10 = (Table.TableChild)topLevelTable[customerLabel];
            w10.XOptions = AttachOptions.Fill;
            w10.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            endDateContainer = new Alignment(0.5F, 0.5F, 1F, 1F);
            endDateContainer.Name = "endDateContainer";
            topLevelTable.Add(endDateContainer);
            Table.TableChild w11 = (Table.TableChild)topLevelTable[endDateContainer];
            w11.TopAttach = 4;
            w11.BottomAttach = 5;
            w11.LeftAttach = 1;
            w11.RightAttach = 2;
            w11.XOptions = AttachOptions.Fill;
            w11.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            endDateLabel = new Label();
            endDateLabel.Name = "endDateLabel";
            endDateLabel.LabelProp = "End Date";
            topLevelTable.Add(endDateLabel);
            Table.TableChild w12 = (Table.TableChild)topLevelTable[endDateLabel];
            w12.TopAttach = 4;
            w12.BottomAttach = 5;
            w12.XOptions = AttachOptions.Fill;
            w12.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            notesLabel = new Label();
            notesLabel.Name = "notesLabel";
            notesLabel.LabelProp = "Notes";
            topLevelTable.Add(notesLabel);
            Table.TableChild w13 = (Table.TableChild)topLevelTable[notesLabel];
            w13.TopAttach = 6;
            w13.BottomAttach = 7;
            w13.XOptions = AttachOptions.Fill;
            w13.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            notesScrolledWindow = new ScrolledWindow();
            notesScrolledWindow.Name = "notesScrolledWindow";
            notesScrolledWindow.ShadowType = ShadowType.In;
            // Container child notesScrolledWindow.Container+ContainerChild
            notesTextView = new TextView();
            notesTextView.CanFocus = true;
            notesTextView.Name = "notesTextView";
            notesScrolledWindow.Add(notesTextView);
            topLevelTable.Add(notesScrolledWindow);
            Table.TableChild w15 = (Table.TableChild)topLevelTable[notesScrolledWindow];
            w15.TopAttach = 6;
            w15.BottomAttach = 7;
            w15.LeftAttach = 1;
            w15.RightAttach = 2;
            w15.XOptions = ((AttachOptions)(7));
            // Container child topLevelTable.Table+TableChild
            startDateContainer = new Alignment(0.5F, 0.5F, 1F, 1F);
            startDateContainer.Name = "startDateContainer";
            topLevelTable.Add(startDateContainer);
            Table.TableChild w16 = (Table.TableChild)topLevelTable[startDateContainer];
            w16.TopAttach = 3;
            w16.BottomAttach = 4;
            w16.LeftAttach = 1;
            w16.RightAttach = 2;
            w16.XOptions = AttachOptions.Fill;
            w16.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            startDateLabel = new Label();
            startDateLabel.Name = "startDateLabel";
            startDateLabel.LabelProp = "Start Date";
            topLevelTable.Add(startDateLabel);
            Table.TableChild w17 = (Table.TableChild)topLevelTable[startDateLabel];
            w17.TopAttach = 3;
            w17.BottomAttach = 4;
            w17.XOptions = AttachOptions.Fill;
            w17.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            statusCombobox = ComboBox.NewText();
            statusCombobox.AppendText("Scheduled");
            statusCombobox.AppendText("Checked In");
            statusCombobox.AppendText("Checked Out");
            statusCombobox.AppendText("Cancelled");
            statusCombobox.AppendText("No-Show");
            statusCombobox.Name = "statusCombobox";
            statusCombobox.Active = 0;
            topLevelTable.Add(statusCombobox);
            Table.TableChild w18 = (Table.TableChild)topLevelTable[statusCombobox];
            w18.TopAttach = 5;
            w18.BottomAttach = 6;
            w18.LeftAttach = 1;
            w18.RightAttach = 2;
            w18.YOptions = AttachOptions.Fill;
            // Container child topLevelTable.Table+TableChild
            statusLabel = new Label();
            statusLabel.Name = "statusLabel";
            statusLabel.LabelProp = "Status";
            topLevelTable.Add(statusLabel);
            Table.TableChild w19 = (Table.TableChild)topLevelTable[statusLabel];
            w19.TopAttach = 5;
            w19.BottomAttach = 6;
            w19.XOptions = AttachOptions.Fill;
            w19.YOptions = AttachOptions.Fill;
            w1.Add(topLevelTable);
            Box.BoxChild w20 = (Box.BoxChild)w1[topLevelTable];
            w20.Position = 0;
            // Internal child BizeeBirdBoarding.Ui.AppointmentDialog.ActionArea
            HButtonBox w21 = ActionArea;
            w21.Name = "actionArea";
            w21.Spacing = 10;
            w21.BorderWidth = 5;
            w21.LayoutStyle = ButtonBoxStyle.End;
            // Container child actionArea.ButtonBox+ButtonBoxChild
            buttonCancel = new Button();
            buttonCancel.CanDefault = true;
            buttonCancel.CanFocus = true;
            buttonCancel.Name = "buttonCancel";
            buttonCancel.UseStock = true;
            buttonCancel.UseUnderline = true;
            buttonCancel.Label = "gtk-cancel";
            AddActionWidget(buttonCancel, -6);
            ButtonBox.ButtonBoxChild w22 = (ButtonBox.ButtonBoxChild)w21[buttonCancel];
            w22.Expand = false;
            w22.Fill = false;
            // Container child actionArea.ButtonBox+ButtonBoxChild
            buttonOk = new Button();
            buttonOk.CanDefault = true;
            buttonOk.CanFocus = true;
            buttonOk.Name = "buttonOk";
            buttonOk.UseStock = true;
            buttonOk.UseUnderline = true;
            buttonOk.Label = "gtk-ok";
            AddActionWidget(buttonOk, -5);
            ButtonBox.ButtonBoxChild w23 = (ButtonBox.ButtonBoxChild)w21[buttonOk];
            w23.Position = 1;
            w23.Expand = false;
            w23.Fill = false;
            if (Child != null)
            {
                Child.ShowAll();
            }
            DefaultWidth = 400;
            DefaultHeight = 684;
            Show();
            customerCombobox.Changed += new System.EventHandler(onCustomerComboChanged);
            buttonCancel.Clicked += new System.EventHandler(onCancelButtonClicked);
            buttonOk.Clicked += new System.EventHandler(onOkButtonClicked);
        }
    }
}
