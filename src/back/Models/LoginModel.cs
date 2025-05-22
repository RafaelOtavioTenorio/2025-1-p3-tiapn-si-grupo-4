// -- Tabela LOGIN
// CREATE TABLE LOGIN (
//     ID INT IDENTITY(1,1) PRIMARY KEY,
//     Login VARCHAR(255) NOT NULL,
//     Senha VARCHAR(255) NOT NULL,
//     Usuario INT NOT NULL,
//     FOREIGN KEY (Usuario) REFERENCES USUARIO(ID) ON DELETE CASCADE
// );


using System.ComponentModel.DataAnnotations;

namespace back.Models;

public class LoginModel
{
    [Key]
    public int Id { get; set; }

}
