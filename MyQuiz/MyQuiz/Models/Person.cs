using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Net.Mime;
using System.Web;

namespace MyQuiz.Models
{
    [Table("person")]
    public class Person
    {
        public int ID { get; set; }
        public string  Name { get; set; }
        public string  LastName { get; set; }
        public int Age { get; set; }
        public string DescriptionOfYou { get; set; }
    }
}