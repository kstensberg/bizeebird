using BizeeBirdBoarding.Db.Model;
using SQLite.CodeFirst;
using System.Data.Entity;

namespace BizeeBirdBoarding.Db
{
    public class BizeeBirdDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Bird> Birds { get; set; }
        public DbSet<CustomerPhoneNumber> CustomerPhoneNumbers { get; set; }

        public BizeeBirdDbContext() : base("name=BizeeBirdContext")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer(new SqliteCreateDatabaseIfNotExists<BizeeBirdDbContext>(modelBuilder));
        }
    }
}
