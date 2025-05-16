namespace back.Models;

public class ExempleModel
{
    private static int _idReference;
    public ExempleModel(string nome)
    {
        if (_idReference == 0)
        {
            _idReference = 1;
        }
        else
        {
            _idReference = _idReference + 1;
        }
        Id = _idReference;
        Nome = nome;
    }
    
    public int Id { get; init; }
    public string Nome { get; private set; }

    public void UpdateName(string nome)
    {
        Nome = nome;
    }
    
    public void SetInactive()
    {
        Nome = "Inativo";
    }
}