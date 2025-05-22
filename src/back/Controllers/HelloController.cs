

using Sprache;

namespace back.Controllers;

public static class HelloController
{
    public static void HelloRoutes(this WebApplication app)
    {
        app.MapGet("/", () =>
        {
            return Results.Ok("OKOK");
        });
    }
}