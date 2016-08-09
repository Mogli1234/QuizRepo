namespace MyQuiz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class create_person_table : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.person",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        LastName = c.String(),
                        Age = c.Int(nullable: false),
                        DescriptionOfYou = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.person");
        }
    }
}
