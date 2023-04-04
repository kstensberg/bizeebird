CREATE TABLE IF NOT EXISTS "customers"
  (
     [customerid]   INTEGER,
     [name]         NVARCHAR,
     [email]        NVARCHAR,
     [boardingrate] FLOAT NOT NULL,
     [notes]        NVARCHAR,
     PRIMARY KEY(customerid)
  );

CREATE TABLE IF NOT EXISTS "customerphonenumbers"
  (
     [phonenumberid]       INTEGER,
     [phonenumber]         NVARCHAR,
     [customer_customerid] INT,
     PRIMARY KEY(phonenumberid),
     FOREIGN KEY (customer_customerid) REFERENCES "customers"(customerid)
  );

CREATE INDEX "IX_CustomerPhoneNumber_Customer_CustomerId" ON
"CustomerPhoneNumbers" (customer_customerid);

CREATE TABLE IF NOT EXISTS "appointments"
  (
     `appointmentid`       INTEGER,
     `starttime`           DATETIME NOT NULL,
     `endtime`             DATETIME NOT NULL,
     `status`              INT NOT NULL,
     `notes`               NVARCHAR,
     `customer_customerid` INT,
     PRIMARY KEY(appointmentid),
     FOREIGN KEY(`customer_customerid`) REFERENCES `customers`(`customerid`)
  );

CREATE TABLE IF NOT EXISTS "birds"
  (
     `birdid`              INTEGER,
     `deleted`             INTEGER NOT NULL,
     `name`                NVARCHAR,
     `breed`               NVARCHAR,
     `color`               NVARCHAR,
     `age`                 INT NOT NULL,
     `gender`              INT NOT NULL,
     `notes`               NVARCHAR,
     `customer_customerid` INT,
     PRIMARY KEY(birdid),
     FOREIGN KEY(`customer_customerid`) REFERENCES `customers`(`customerid`)
  );

CREATE INDEX "IX_Bird_Customer_CustomerId" ON "Birds" (customer_customerid);

CREATE INDEX "IX_Appointment_Customer_CustomerId" ON "Appointments" (
customer_customerid);

CREATE TABLE IF NOT EXISTS "appointmentbirds"
  (
     `appointmentbirdid`         INTEGER,
     `groomingwings`             BIT NOT NULL,
     `groomingnails`             BIT NOT NULL,
     `cageneeded`                BIT NOT NULL,
     `bird_birdid`               INT,
     `appointment_appointmentid` INT,
     `apptbirdnotes`             TEXT,
     PRIMARY KEY(`appointmentbirdid`),
     FOREIGN KEY(`bird_birdid`) REFERENCES `birds`(`birdid`),
     FOREIGN KEY(`appointment_appointmentid`) REFERENCES `appointments`(
     `appointmentid`)
  ); 