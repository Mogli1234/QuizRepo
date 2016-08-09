namespace MyQuiz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class create_animal_table : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.animales",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Nombre = c.String(),
                        Tipo = c.String(),
                        Descripcion = c.String(),
                    })
                .PrimaryKey(t => t.ID);
        }
        
        public override void Down()
        {
            DropTable("dbo.animales");
        }
    }
}
