using System.Text;
using BibliotecaService.Api;
using BibliotecaService.Data;
using BibliotecaService.Entities.Libros;
using BibliotecaService.Entities.Roles;
using BibliotecaService.Entities.Usuarios;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BibliotecaContext>(options =>
{
    options.UseInMemoryDatabase("Biblioteca");
});

#region JWT
var key = builder.Configuration.GetSection("JwtSettings:Key");
var keyByte = Encoding.UTF8.GetBytes(key.Value!);

builder.Services.AddAuthentication(config =>
{
    config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(config =>
{
    config.RequireHttpsMetadata = false;
    config.SaveToken = true;
    config.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(keyByte),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero

    };
});
#endregion

RegistrarServices.AddRegistration(builder.Services);

#region Inicializar datos
using (var _context = builder.Services.BuildServiceProvider().GetService<BibliotecaContext>())
{
    var rolAdmin = new EntRol { uIdRoles = Guid.Parse("7a5a4201-48c8-4625-bc77-4f832ba1c188"), sNombre = "Administrador" };
    var rolBibliotecario = new EntRol { uIdRoles = Guid.NewGuid(), sNombre = "Bibliotecario" };
    var rolUsuario = new EntRol { uIdRoles = Guid.NewGuid(), sNombre = "Usuario" };

    _context.Roles.Add(rolAdmin);
    _context.Roles.Add(rolBibliotecario);
    _context.Roles.Add(rolUsuario);

    var usuario = new EntUsuario
    {
        uIdUsuario = Guid.NewGuid(),
        sEmail = "admin@biblioteca.com",
        sPassword = "admin",
        sNombre = "Administrador",
        sApellidos = "De la Biblioteca",
        uIdRoles = rolAdmin.uIdRoles
    };

    _context.Usuarios.Add(usuario);

    var usuarioBibliotecario = new EntUsuario
    {
        uIdUsuario = Guid.NewGuid(),
        sEmail = "bibliotecario@biblioteca.com",
        sPassword = "bibliotecario",
        sNombre = "Bibliotecario",
        sApellidos = "De la Biblioteca",
        uIdRoles = rolBibliotecario.uIdRoles
    };

    _context.Usuarios.Add(usuarioBibliotecario);

    string sLibros = "[{\"uIdLibro\":\"79097388-398f-48e0-86b0-5d5badb2c91e\",\"sCodigo\":\"00001\",\"sTitulo\":\"Combate espiritual\",\"sAutor\":\"Scúpoli, Lorenzo\",\"sISBN\":\"978-607-69767-7-7\",\"sEditorial\":\"García Bellorín Juana Auxiliadora\",\"iAnio\":2024},{\"uIdLibro\":\"9f18181e-4fed-4f03-9b6b-b063bd2895e0\",\"sCodigo\":\"00002\",\"sTitulo\":\"El monstruo\",\"sAutor\":\"PardoNaredo,Pablo\",\"sISBN\":\"978-607-69899-1-3\",\"sEditorial\":\"Lid Editorial Mexicana\",\"iAnio\":2024},{\"uIdLibro\":\"dc8285f8-72ac-41a2-929d-460e0f6f22e2\",\"sCodigo\":\"00003\",\"sTitulo\":\"El encuentro entre la docencia y la realidad pospandemia: experiencias y narrativas\",\"sAutor\":\"Contreras Dávalos, Julio\",\"sISBN\":\"978-607-495-730-3\",\"sEditorial\":\"Secretaría de Educación del Gobierno del Estado de México\",\"iAnio\":2024},{\"uIdLibro\":\"801d9426-2e10-4012-900e-8cab0b60b28d\",\"sCodigo\":\"00004\",\"sTitulo\":\"Curso de ética general y aplicada\",\"sAutor\":\"Sada Fernández, Ricardo Manuel\",\"sISBN\":\"978-607-5909-13-4\",\"sEditorial\":\"Sada Fernández Ricardo Manuel\",\"iAnio\":2024},{\"uIdLibro\":\"5689cb5f-3910-45a8-b80d-23d9e16dfb18\",\"sCodigo\":\"00005\",\"sTitulo\":\"Navegar en aguas bravas\",\"sAutor\":\"Alba Romo, José Marcos\",\"sISBN\":\"978-607-8804-14-6\",\"sEditorial\":\"Sabino Cruz Viveros\",\"iAnio\":2024}]";
    var libros = System.Text.Json.JsonSerializer.Deserialize<List<EntLibro>>(sLibros);

    foreach (var libro in libros)
    {
        _context.Libros.Add(libro);
    }

    _context.SaveChanges();
}
#endregion

#region Habilitar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowOrigin");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

