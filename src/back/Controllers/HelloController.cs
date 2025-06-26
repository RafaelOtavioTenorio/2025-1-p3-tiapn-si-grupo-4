

using Sprache;

namespace back.Controllers;

public static class HelloController
{
    public static void HelloRoutes(this WebApplication app)
    {
        var route = app.MapGroup("hello").RequireAuthorization("AuthenticatedUser");
        route.MapGet("/{message}", (string message) =>
        {
            return Results.Ok($"You sent: {message}");
        });
    }
}