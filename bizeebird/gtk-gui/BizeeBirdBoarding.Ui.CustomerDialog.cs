
using Gtk;

namespace BizeeBirdBoarding.Ui
{
	public partial class CustomerDialog
	{
		private VBox toplevelVbox;
		
		private Table topTable;
		
		private Label boardingRateLabel;
		
		private SpinButton boardingRateSpinButton;
		
		private Entry customerNameEntry;
		
		private Label customerNotesLabel;
		
		private ScrolledWindow customerNotesScrolledWindow;
		
		private TextView customerNotesTextView;
		
		private Entry emailEntry;
		
		private Label emailLabel;
		
		private Label nameLabel;
		
		private VBox phoneNumberContainerVbox;
		
		private Label phoneNumberLabel;
		
		private Frame birdsFrame;
		
		private Alignment birdsGtkAlignment;
		
		private HBox birdsHbox;
		
		private VBox birdsVBox;
		
		private ScrolledWindow GtkScrolledWindow;
		
		private TreeView birdsTreeView;
		
		private HButtonBox birdsButtonBox;
		
		private Button addBirdButton;
		
		private Button removeBirdButton;
		
		private Table birdsTable;
		
		private Label birdAgeLabel;
		
		private SpinButton birdAgeSpinButton;
		
		private Entry birdBreedEntry;
		
		private Label birdBreedLabel;
		
		private Entry birdColorEntry;
		
		private Label birdColorLabel;
		
		private HBox birdGenderHbox;
		
		private RadioButton birdGenderMaleRadioButton;
		
		private RadioButton birdGenderFemaleRadioButton;
		
		private Label birdGenderLabel;
		
		private Entry birdNameEntry;
		
		private Label birdNameLabel;
		
		private Label birdNotesLabel;
		
		private ScrolledWindow birdNotesScrolledWindow;
		
		private TextView birdNotesTextView;
		
		private Label birdsFrameLabel;
		
		private Button buttonCancel;
		
		private Button buttonOk;

		protected virtual void Build ()
		{
			//Stetic.Gui.Initialize (this);
			// Widget BizeeBirdBoarding.Ui.CustomerDialog
			Name = "BizeeBirdBoarding.Ui.CustomerDialog";
			Title = "New Customer";
			WindowPosition = WindowPosition.CenterOnParent;
			// Internal child BizeeBirdBoarding.Ui.CustomerDialog.VBox
			VBox w1 = VBox;
			w1.Name = "newCustomerDialog_VBox";
			w1.BorderWidth = 2;
			// Container child newCustomerDialog_VBox.Box+BoxChild
			toplevelVbox = new VBox ();
			toplevelVbox.Name = "toplevelVbox";
			toplevelVbox.Spacing = 6;
			// Container child toplevelVbox.Box+BoxChild
			topTable = new Table (5, 2, false);
			topTable.Name = "topTable";
			topTable.RowSpacing = 6;
			topTable.ColumnSpacing = 6;
			// Container child topTable.Table+TableChild
			boardingRateLabel = new Label ();
			boardingRateLabel.Name = "boardingRateLabel";
			boardingRateLabel.LabelProp = "Boarding Rate";
			topTable.Add (boardingRateLabel);
			Table.TableChild w2 = ((Table.TableChild)(topTable [boardingRateLabel]));
			w2.TopAttach = 3;
			w2.BottomAttach = 4;
			w2.XOptions = ((AttachOptions)(4));
			w2.YOptions = ((AttachOptions)(4));
			// Container child topTable.Table+TableChild
			boardingRateSpinButton = new SpinButton (0D, 100D, 1D);
			boardingRateSpinButton.CanFocus = true;
			boardingRateSpinButton.Name = "boardingRateSpinButton";
			boardingRateSpinButton.Adjustment.PageIncrement = 10D;
			boardingRateSpinButton.ClimbRate = 1D;
			boardingRateSpinButton.Digits = 2;
			boardingRateSpinButton.Numeric = true;
			topTable.Add (boardingRateSpinButton);
			Table.TableChild w3 = ((Table.TableChild)(topTable [boardingRateSpinButton]));
			w3.TopAttach = 3;
			w3.BottomAttach = 4;
			w3.LeftAttach = 1;
			w3.RightAttach = 2;
			w3.YOptions = ((AttachOptions)(4));
			// Container child topTable.Table+TableChild
			customerNameEntry = new Entry ();
			customerNameEntry.CanFocus = true;
			customerNameEntry.Name = "customerNameEntry";
			customerNameEntry.IsEditable = true;
			customerNameEntry.InvisibleChar = '●';
			topTable.Add (customerNameEntry);
			Table.TableChild w4 = ((Table.TableChild)(topTable [customerNameEntry]));
			w4.LeftAttach = 1;
			w4.RightAttach = 2;
			w4.YOptions = ((AttachOptions)(4));
			// Container child topTable.Table+TableChild
			customerNotesLabel = new Label ();
			customerNotesLabel.Name = "customerNotesLabel";
			customerNotesLabel.LabelProp = "Notes";
			topTable.Add (customerNotesLabel);
			Table.TableChild w5 = ((Table.TableChild)(topTable [customerNotesLabel]));
			w5.TopAttach = 4;
			w5.BottomAttach = 5;
			w5.XOptions = ((AttachOptions)(4));
			w5.YOptions = ((AttachOptions)(4));
			// Container child topTable.Table+TableChild
			customerNotesScrolledWindow = new ScrolledWindow ();
			customerNotesScrolledWindow.Name = "customerNotesScrolledWindow";
			customerNotesScrolledWindow.ShadowType = ((ShadowType)(1));
			// Container child customerNotesScrolledWindow.Container+ContainerChild
			customerNotesTextView = new TextView ();
			customerNotesTextView.CanFocus = true;
			customerNotesTextView.Name = "customerNotesTextView";
			customerNotesScrolledWindow.Add (customerNotesTextView);
			topTable.Add (customerNotesScrolledWindow);
			Table.TableChild w7 = ((Table.TableChild)(topTable [customerNotesScrolledWindow]));
			w7.TopAttach = 4;
			w7.BottomAttach = 5;
			w7.LeftAttach = 1;
			w7.RightAttach = 2;
			// Container child topTable.Table+TableChild
			emailEntry = new Entry ();
			emailEntry.CanFocus = true;
			emailEntry.Name = "emailEntry";
			emailEntry.IsEditable = true;
			emailEntry.InvisibleChar = '●';
			topTable.Add (emailEntry);
			Table.TableChild w8 = ((Table.TableChild)(topTable [emailEntry]));
			w8.TopAttach = 2;
			w8.BottomAttach = 3;
			w8.LeftAttach = 1;
			w8.RightAttach = 2;
			w8.YOptions = ((AttachOptions)(4));
			// Container child topTable.Table+TableChild
			emailLabel = new Label ();
			emailLabel.Name = "emailLabel";
			emailLabel.LabelProp = "E-mail";
			topTable.Add (emailLabel);
			Table.TableChild w9 = ((Table.TableChild)(topTable [emailLabel]));
			w9.TopAttach = 2;
			w9.BottomAttach = 3;
			w9.XOptions = ((AttachOptions)(4));
			w9.YOptions = ((AttachOptions)(4));
			// Container child topTable.Table+TableChild
			nameLabel = new Label ();
			nameLabel.Name = "nameLabel";
			nameLabel.LabelProp = "Name";
			topTable.Add (nameLabel);
			Table.TableChild w10 = ((Table.TableChild)(topTable [nameLabel]));
			w10.XOptions = ((AttachOptions)(4));
			w10.YOptions = ((AttachOptions)(4));
			// Container child topTable.Table+TableChild
			phoneNumberContainerVbox = new VBox ();
			phoneNumberContainerVbox.Name = "phoneNumberContainerVbox";
			phoneNumberContainerVbox.Spacing = 6;
			topTable.Add (phoneNumberContainerVbox);
			Table.TableChild w11 = ((Table.TableChild)(topTable [phoneNumberContainerVbox]));
			w11.TopAttach = 1;
			w11.BottomAttach = 2;
			w11.LeftAttach = 1;
			w11.RightAttach = 2;
			w11.XOptions = ((AttachOptions)(4));
			w11.YOptions = ((AttachOptions)(4));
			// Container child topTable.Table+TableChild
			phoneNumberLabel = new Label ();
			phoneNumberLabel.Name = "phoneNumberLabel";
			phoneNumberLabel.LabelProp = "Phone Number";
			topTable.Add (phoneNumberLabel);
			Table.TableChild w12 = ((Table.TableChild)(topTable [phoneNumberLabel]));
			w12.TopAttach = 1;
			w12.BottomAttach = 2;
			w12.XOptions = ((AttachOptions)(4));
			w12.YOptions = ((AttachOptions)(4));
			toplevelVbox.Add (topTable);
			Box.BoxChild w13 = ((Box.BoxChild)(toplevelVbox [topTable]));
			w13.Position = 0;
			// Container child toplevelVbox.Box+BoxChild
			birdsFrame = new Frame ();
			birdsFrame.Name = "birdsFrame";
			birdsFrame.ShadowType = ((ShadowType)(1));
			// Container child birdsFrame.Container+ContainerChild
			birdsGtkAlignment = new Alignment (0F, 0F, 1F, 1F);
			birdsGtkAlignment.Name = "birdsGtkAlignment";
			birdsGtkAlignment.LeftPadding = ((uint)(12));
			// Container child birdsGtkAlignment.Container+ContainerChild
			birdsHbox = new HBox ();
			birdsHbox.Name = "birdsHbox";
			birdsHbox.Spacing = 6;
			// Container child birdsHbox.Box+BoxChild
			birdsVBox = new VBox ();
			birdsVBox.Name = "birdsVBox";
			birdsVBox.Spacing = 6;
			// Container child birdsVBox.Box+BoxChild
			GtkScrolledWindow = new ScrolledWindow ();
			GtkScrolledWindow.Name = "GtkScrolledWindow";
			GtkScrolledWindow.ShadowType = ((ShadowType)(1));
			// Container child GtkScrolledWindow.Container+ContainerChild
			birdsTreeView = new TreeView ();
			birdsTreeView.WidthRequest = 300;
			birdsTreeView.CanFocus = true;
			birdsTreeView.Name = "birdsTreeView";
			GtkScrolledWindow.Add (birdsTreeView);
			birdsVBox.Add (GtkScrolledWindow);
			Box.BoxChild w15 = ((Box.BoxChild)(birdsVBox [GtkScrolledWindow]));
			w15.Position = 0;
			// Container child birdsVBox.Box+BoxChild
			birdsButtonBox = new HButtonBox ();
			birdsButtonBox.Name = "birdsButtonBox";
			// Container child birdsButtonBox.ButtonBox+ButtonBoxChild
			addBirdButton = new Button ();
			addBirdButton.CanFocus = true;
			addBirdButton.Name = "addBirdButton";
			addBirdButton.UseStock = true;
			addBirdButton.UseUnderline = true;
			addBirdButton.Label = "gtk-add";
			birdsButtonBox.Add (addBirdButton);
			ButtonBox.ButtonBoxChild w16 = ((ButtonBox.ButtonBoxChild)(birdsButtonBox [addBirdButton]));
			w16.Expand = false;
			w16.Fill = false;
			// Container child birdsButtonBox.ButtonBox+ButtonBoxChild
			removeBirdButton = new Button ();
			removeBirdButton.CanFocus = true;
			removeBirdButton.Name = "removeBirdButton";
			removeBirdButton.UseStock = true;
			removeBirdButton.UseUnderline = true;
			removeBirdButton.Label = "gtk-remove";
			birdsButtonBox.Add (removeBirdButton);
			ButtonBox.ButtonBoxChild w17 = ((ButtonBox.ButtonBoxChild)(birdsButtonBox [removeBirdButton]));
			w17.Position = 1;
			w17.Expand = false;
			w17.Fill = false;
			birdsVBox.Add (birdsButtonBox);
			Box.BoxChild w18 = ((Box.BoxChild)(birdsVBox [birdsButtonBox]));
			w18.Position = 1;
			w18.Expand = false;
			w18.Fill = false;
			birdsHbox.Add (birdsVBox);
			Box.BoxChild w19 = ((Box.BoxChild)(birdsHbox [birdsVBox]));
			w19.Position = 0;
			// Container child birdsHbox.Box+BoxChild
			birdsTable = new Table (6, 2, false);
			birdsTable.Name = "birdsTable";
			birdsTable.RowSpacing = 6;
			birdsTable.ColumnSpacing = 6;
			// Container child birdsTable.Table+TableChild
			birdAgeLabel = new Label ();
			birdAgeLabel.Name = "birdAgeLabel";
			birdAgeLabel.LabelProp = "Age";
			birdsTable.Add (birdAgeLabel);
			Table.TableChild w20 = ((Table.TableChild)(birdsTable [birdAgeLabel]));
			w20.TopAttach = 3;
			w20.BottomAttach = 4;
			w20.XOptions = ((AttachOptions)(4));
			w20.YOptions = ((AttachOptions)(4));
			// Container child birdsTable.Table+TableChild
			birdAgeSpinButton = new SpinButton (0D, 100D, 1D);
			birdAgeSpinButton.CanFocus = true;
			birdAgeSpinButton.Name = "birdAgeSpinButton";
			birdAgeSpinButton.Adjustment.PageIncrement = 10D;
			birdAgeSpinButton.ClimbRate = 1D;
			birdAgeSpinButton.Numeric = true;
			birdsTable.Add (birdAgeSpinButton);
			Table.TableChild w21 = ((Table.TableChild)(birdsTable [birdAgeSpinButton]));
			w21.TopAttach = 3;
			w21.BottomAttach = 4;
			w21.LeftAttach = 1;
			w21.RightAttach = 2;
			w21.YOptions = ((AttachOptions)(4));
			// Container child birdsTable.Table+TableChild
			birdBreedEntry = new Entry ();
			birdBreedEntry.CanFocus = true;
			birdBreedEntry.Name = "birdBreedEntry";
			birdBreedEntry.IsEditable = true;
			birdBreedEntry.InvisibleChar = '●';
			birdsTable.Add (birdBreedEntry);
			Table.TableChild w22 = ((Table.TableChild)(birdsTable [birdBreedEntry]));
			w22.TopAttach = 1;
			w22.BottomAttach = 2;
			w22.LeftAttach = 1;
			w22.RightAttach = 2;
			w22.YOptions = ((AttachOptions)(4));
			// Container child birdsTable.Table+TableChild
			birdBreedLabel = new Label ();
			birdBreedLabel.Name = "birdBreedLabel";
			birdBreedLabel.LabelProp = "Breed";
			birdsTable.Add (birdBreedLabel);
			Table.TableChild w23 = ((Table.TableChild)(birdsTable [birdBreedLabel]));
			w23.TopAttach = 1;
			w23.BottomAttach = 2;
			w23.XOptions = ((AttachOptions)(4));
			w23.YOptions = ((AttachOptions)(4));
			// Container child birdsTable.Table+TableChild
			birdColorEntry = new Entry ();
			birdColorEntry.CanFocus = true;
			birdColorEntry.Name = "birdColorEntry";
			birdColorEntry.IsEditable = true;
			birdColorEntry.InvisibleChar = '●';
			birdsTable.Add (birdColorEntry);
			Table.TableChild w24 = ((Table.TableChild)(birdsTable [birdColorEntry]));
			w24.TopAttach = 2;
			w24.BottomAttach = 3;
			w24.LeftAttach = 1;
			w24.RightAttach = 2;
			w24.YOptions = ((AttachOptions)(4));
			// Container child birdsTable.Table+TableChild
			birdColorLabel = new Label ();
			birdColorLabel.Name = "birdColorLabel";
			birdColorLabel.LabelProp = "Color";
			birdsTable.Add (birdColorLabel);
			Table.TableChild w25 = ((Table.TableChild)(birdsTable [birdColorLabel]));
			w25.TopAttach = 2;
			w25.BottomAttach = 3;
			w25.XOptions = ((AttachOptions)(4));
			w25.YOptions = ((AttachOptions)(4));
			// Container child birdsTable.Table+TableChild
			birdGenderHbox = new HBox ();
			birdGenderHbox.Name = "birdGenderHbox";
			birdGenderHbox.Spacing = 6;
			// Container child birdGenderHbox.Box+BoxChild
			birdGenderMaleRadioButton = new RadioButton ("Male");
			birdGenderMaleRadioButton.CanFocus = true;
			birdGenderMaleRadioButton.Name = "birdGenderMaleRadioButton";
			birdGenderMaleRadioButton.DrawIndicator = true;
			birdGenderMaleRadioButton.UseUnderline = true;
			birdGenderMaleRadioButton.Group = new GLib.SList (System.IntPtr.Zero);
			birdGenderHbox.Add (birdGenderMaleRadioButton);
			Box.BoxChild w26 = ((Box.BoxChild)(birdGenderHbox [birdGenderMaleRadioButton]));
			w26.Position = 0;
			// Container child birdGenderHbox.Box+BoxChild
			birdGenderFemaleRadioButton = new RadioButton ("Female");
			birdGenderFemaleRadioButton.CanFocus = true;
			birdGenderFemaleRadioButton.Name = "birdGenderFemaleRadioButton";
			birdGenderFemaleRadioButton.DrawIndicator = true;
			birdGenderFemaleRadioButton.UseUnderline = true;
			birdGenderFemaleRadioButton.Group = birdGenderMaleRadioButton.Group;
			birdGenderHbox.Add (birdGenderFemaleRadioButton);
			Box.BoxChild w27 = ((Box.BoxChild)(birdGenderHbox [birdGenderFemaleRadioButton]));
			w27.Position = 1;
			birdsTable.Add (birdGenderHbox);
			Table.TableChild w28 = ((Table.TableChild)(birdsTable [birdGenderHbox]));
			w28.TopAttach = 4;
			w28.BottomAttach = 5;
			w28.LeftAttach = 1;
			w28.RightAttach = 2;
			w28.YOptions = ((AttachOptions)(4));
			// Container child birdsTable.Table+TableChild
			birdGenderLabel = new Label ();
			birdGenderLabel.Name = "birdGenderLabel";
			birdGenderLabel.LabelProp = "Gender";
			birdsTable.Add (birdGenderLabel);
			Table.TableChild w29 = ((Table.TableChild)(birdsTable [birdGenderLabel]));
			w29.TopAttach = 4;
			w29.BottomAttach = 5;
			w29.XOptions = ((AttachOptions)(4));
			w29.YOptions = ((AttachOptions)(4));
			// Container child birdsTable.Table+TableChild
			birdNameEntry = new Entry ();
			birdNameEntry.CanFocus = true;
			birdNameEntry.Name = "birdNameEntry";
			birdNameEntry.IsEditable = true;
			birdNameEntry.InvisibleChar = '●';
			birdsTable.Add (birdNameEntry);
			Table.TableChild w30 = ((Table.TableChild)(birdsTable [birdNameEntry]));
			w30.LeftAttach = 1;
			w30.RightAttach = 2;
			w30.YOptions = ((AttachOptions)(4));
			// Container child birdsTable.Table+TableChild
			birdNameLabel = new Label ();
			birdNameLabel.Name = "birdNameLabel";
			birdNameLabel.LabelProp = "Name";
			birdsTable.Add (birdNameLabel);
			Table.TableChild w31 = ((Table.TableChild)(birdsTable [birdNameLabel]));
			w31.XOptions = ((AttachOptions)(4));
			w31.YOptions = ((AttachOptions)(4));
			// Container child birdsTable.Table+TableChild
			birdNotesLabel = new Label ();
			birdNotesLabel.Name = "birdNotesLabel";
			birdNotesLabel.LabelProp = "Notes";
			birdsTable.Add (birdNotesLabel);
			Table.TableChild w32 = ((Table.TableChild)(birdsTable [birdNotesLabel]));
			w32.TopAttach = 5;
			w32.BottomAttach = 6;
			w32.XOptions = ((AttachOptions)(4));
			w32.YOptions = ((AttachOptions)(4));
			// Container child birdsTable.Table+TableChild
			birdNotesScrolledWindow = new ScrolledWindow ();
			birdNotesScrolledWindow.Name = "birdNotesScrolledWindow";
			birdNotesScrolledWindow.ShadowType = ((ShadowType)(1));
			// Container child birdNotesScrolledWindow.Container+ContainerChild
			birdNotesTextView = new TextView ();
			birdNotesTextView.CanFocus = true;
			birdNotesTextView.Name = "birdNotesTextView";
			birdNotesScrolledWindow.Add (birdNotesTextView);
			birdsTable.Add (birdNotesScrolledWindow);
			Table.TableChild w34 = ((Table.TableChild)(birdsTable [birdNotesScrolledWindow]));
			w34.TopAttach = 5;
			w34.BottomAttach = 6;
			w34.LeftAttach = 1;
			w34.RightAttach = 2;
			birdsHbox.Add (birdsTable);
			Box.BoxChild w35 = ((Box.BoxChild)(birdsHbox [birdsTable]));
			w35.Position = 1;
			birdsGtkAlignment.Add (birdsHbox);
			birdsFrame.Add (birdsGtkAlignment);
			birdsFrameLabel = new Label ();
			birdsFrameLabel.Name = "birdsFrameLabel";
			birdsFrameLabel.LabelProp = "<b>Birds</b>";
			birdsFrameLabel.UseMarkup = true;
			birdsFrame.LabelWidget = birdsFrameLabel;
			toplevelVbox.Add (birdsFrame);
			Box.BoxChild w38 = ((Box.BoxChild)(toplevelVbox [birdsFrame]));
			w38.Position = 1;
			w1.Add (toplevelVbox);
			Box.BoxChild w39 = ((Box.BoxChild)(w1 [toplevelVbox]));
			w39.Position = 0;
			// Internal child BizeeBirdBoarding.Ui.CustomerDialog.ActionArea
			HButtonBox w40 = ActionArea;
			w40.Name = "newCustomerDialog_ActionArea";
			w40.Spacing = 10;
			w40.BorderWidth = 5;
			w40.LayoutStyle = ((ButtonBoxStyle)(4));
			// Container child newCustomerDialog_ActionArea.ButtonBox+ButtonBoxChild
			buttonCancel = new Button ();
			buttonCancel.CanDefault = true;
			buttonCancel.CanFocus = true;
			buttonCancel.Name = "buttonCancel";
			buttonCancel.UseStock = true;
			buttonCancel.UseUnderline = true;
			buttonCancel.Label = "gtk-cancel";
			AddActionWidget (buttonCancel, -6);
			ButtonBox.ButtonBoxChild w41 = ((ButtonBox.ButtonBoxChild)(w40 [buttonCancel]));
			w41.Expand = false;
			w41.Fill = false;
			// Container child newCustomerDialog_ActionArea.ButtonBox+ButtonBoxChild
			buttonOk = new Button ();
			buttonOk.CanDefault = true;
			buttonOk.CanFocus = true;
			buttonOk.Name = "buttonOk";
			buttonOk.UseStock = true;
			buttonOk.UseUnderline = true;
			buttonOk.Label = "gtk-ok";
			AddActionWidget (buttonOk, -5);
			ButtonBox.ButtonBoxChild w42 = ((ButtonBox.ButtonBoxChild)(w40 [buttonOk]));
			w42.Position = 1;
			w42.Expand = false;
			w42.Fill = false;
			if ((Child != null)) {
				Child.ShowAll ();
			}
			DefaultWidth = 551;
			DefaultHeight = 490;
			Show ();
			addBirdButton.Clicked += new System.EventHandler (onBirdAddButtonClicked);
			removeBirdButton.Clicked += new System.EventHandler (onBirdRemoveButtonClicked);
			buttonCancel.Clicked += new System.EventHandler (onCancelButtonClicked);
			buttonOk.Clicked += new System.EventHandler (onOkButtonClicked);
		}
	}
}
