namespace MiAplicacionApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class create_Animal_table : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.animal",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Nombre = c.String(),
                        Descripcion = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.animal");
        }
    }
}
