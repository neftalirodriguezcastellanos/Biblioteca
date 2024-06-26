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

    string sUsuarios = "[{\"uIdUsuario\":\"a74ec24f-5533-48d3-9ec7-550b0bab0452\",\"sEmail\":\"ablanshard0@sohu.com\",\"sNombre\":\"Armin\",\"sApellidos\":\"Blanshard\",\"sPassword\":\"Goldenrod\",\"uIdRoles\":\"19615ca5-d9fb-424d-af3a-f894015d69d6\"},{\"uIdUsuario\":\"d90a5978-1cd1-42f2-96aa-ce655047bb80\",\"sEmail\":\"tberk1@4shared.com\",\"sNombre\":\"Torey\",\"sApellidos\":\"Berk\",\"sPassword\":\"Maroon\",\"uIdRoles\":\"6f48f5cf-a1dc-43d2-bb9d-f4fc086dd997\"},{\"uIdUsuario\":\"958c8f4b-26b3-4a83-aa82-dbbc391b6c57\",\"sEmail\":\"drulten2@live.com\",\"sNombre\":\"Duky\",\"sApellidos\":\"Rulten\",\"sPassword\":\"Purple\",\"uIdRoles\":\"3eee3636-bc68-4632-8b37-7b4f601d77e4\"},{\"uIdUsuario\":\"06579475-8b01-4c12-b5f6-6ef9d8ea2406\",\"sEmail\":\"kstede3@themeforest.net\",\"sNombre\":\"Kaylil\",\"sApellidos\":\"Stede\",\"sPassword\":\"Puce\",\"uIdRoles\":\"cb848af6-e80e-4ad8-83bd-f4890689c6be\"},{\"uIdUsuario\":\"2cbf27d9-c3ef-4224-b0a6-bb15f034ff85\",\"sEmail\":\"fclamp4@nytimes.com\",\"sNombre\":\"Fletcher\",\"sApellidos\":\"Clamp\",\"sPassword\":\"Crimson\",\"uIdRoles\":\"eb7e6138-ffbe-4eac-b6d6-4385fe716368\"},{\"uIdUsuario\":\"3d7c18de-9892-4e9c-8d86-79a10d4c0ac8\",\"sEmail\":\"srelf5@shutterfly.com\",\"sNombre\":\"Sampson\",\"sApellidos\":\"Relf\",\"sPassword\":\"Purple\",\"uIdRoles\":\"b7afa634-5858-45b9-941d-51ef87b023ca\"},{\"uIdUsuario\":\"ffac5a8d-2660-4247-9b3a-b5ec0db073cf\",\"sEmail\":\"bbowkett6@symantec.com\",\"sNombre\":\"Broddie\",\"sApellidos\":\"Bowkett\",\"sPassword\":\"Turquoise\",\"uIdRoles\":\"1afdd454-fac4-497c-8f8a-5ab71b5dfb1e\"},{\"uIdUsuario\":\"5b6935eb-fc84-486a-ae5d-aaddd2def1ad\",\"sEmail\":\"eschriren7@bravesites.com\",\"sNombre\":\"Eal\",\"sApellidos\":\"Schriren\",\"sPassword\":\"Green\",\"uIdRoles\":\"0b09ece7-733e-4527-a280-970932929d9b\"},{\"uIdUsuario\":\"a20d08db-f554-487e-b57c-1393c41a8db4\",\"sEmail\":\"snarraway8@japanpost.jp\",\"sNombre\":\"Sonny\",\"sApellidos\":\"Narraway\",\"sPassword\":\"Purple\",\"uIdRoles\":\"5934ecec-c346-4456-a36d-f15fa778b658\"},{\"uIdUsuario\":\"6dd6dd26-cc0f-4fbc-99a0-32d5dec7870c\",\"sEmail\":\"jtybalt9@bloomberg.com\",\"sNombre\":\"Jennette\",\"sApellidos\":\"Tybalt\",\"sPassword\":\"Orange\",\"uIdRoles\":\"9cb95b64-87cd-4bcc-bd2e-7eefc41713ad\"},{\"uIdUsuario\":\"afa9e917-9f8b-44c5-bba8-afab780eddbd\",\"sEmail\":\"drickerda@goo.gl\",\"sNombre\":\"Dannye\",\"sApellidos\":\"Rickerd\",\"sPassword\":\"Indigo\",\"uIdRoles\":\"5c14f169-639a-4f45-a1e6-5bca5d79e907\"},{\"uIdUsuario\":\"78200873-ed0a-47a7-91d3-53f5f8dc51d5\",\"sEmail\":\"sgeelyb@bing.com\",\"sNombre\":\"Scarlet\",\"sApellidos\":\"Geely\",\"sPassword\":\"Orange\",\"uIdRoles\":\"6fa05e3e-38bd-4400-9155-2eb72249abe9\"},{\"uIdUsuario\":\"8b967dcb-bad6-432f-808f-ae88919066fa\",\"sEmail\":\"cparmleyc@youtu.be\",\"sNombre\":\"Calv\",\"sApellidos\":\"Parmley\",\"sPassword\":\"Mauv\",\"uIdRoles\":\"413ac9ea-c62a-4ff7-acdc-853653d047ee\"},{\"uIdUsuario\":\"ac9ca357-631a-427a-a717-e124be19b863\",\"sEmail\":\"aivashintsovd@nyu.edu\",\"sNombre\":\"Anjela\",\"sApellidos\":\"Ivashintsov\",\"sPassword\":\"Maroon\",\"uIdRoles\":\"8ce4a2b6-8e88-4c93-84bf-c1bec02c2adc\"},{\"uIdUsuario\":\"10523ce7-33c8-4e22-bb94-a51363d4e99e\",\"sEmail\":\"tfairee@cocolog-nifty.com\",\"sNombre\":\"Tulley\",\"sApellidos\":\"Faire\",\"sPassword\":\"Red\",\"uIdRoles\":\"b04e7b31-b13c-4004-b65e-82a5efe4f934\"},{\"uIdUsuario\":\"1b612560-3367-4923-b3c8-a58e17fecdbb\",\"sEmail\":\"cpaylief@exblog.jp\",\"sNombre\":\"Carla\",\"sApellidos\":\"Paylie\",\"sPassword\":\"Khaki\",\"uIdRoles\":\"5ce7134a-050c-4303-9fe0-0c131fa2ba90\"},{\"uIdUsuario\":\"a83ce8ea-f486-415c-b3d8-6fd2d670c3d6\",\"sEmail\":\"cmoseg@princeton.edu\",\"sNombre\":\"Charmain\",\"sApellidos\":\"Mose\",\"sPassword\":\"Indigo\",\"uIdRoles\":\"147258a0-f262-44a2-99ca-742c4be0453f\"},{\"uIdUsuario\":\"a6e73642-bde7-4226-bf22-57a8331021fd\",\"sEmail\":\"vodwyerh@jalbum.net\",\"sNombre\":\"Verne\",\"sApellidos\":\"O'Dwyer\",\"sPassword\":\"Teal\",\"uIdRoles\":\"7b8fee82-c057-4ef1-868e-e4b8ba79014c\"},{\"uIdUsuario\":\"e14c4721-df0a-4d16-b9e7-69aa9a3610ee\",\"sEmail\":\"lsavili@princeton.edu\",\"sNombre\":\"Lorna\",\"sApellidos\":\"Savil\",\"sPassword\":\"Puce\",\"uIdRoles\":\"bb5e52e6-1522-4eb9-98f4-83c57a50b015\"},{\"uIdUsuario\":\"7dd157ca-3394-4597-90ba-a2bfb6964106\",\"sEmail\":\"ksurteesj@gnu.org\",\"sNombre\":\"Karalynn\",\"sApellidos\":\"Surtees\",\"sPassword\":\"Mauv\",\"uIdRoles\":\"aee5a1c5-c479-41e1-a714-108503c9ef25\"}]";
    var usuarios = System.Text.Json.JsonSerializer.Deserialize<List<EntUsuario>>(sUsuarios);

    foreach (var _usuario in usuarios)
    {
        _usuario.uIdRoles = rolUsuario.uIdRoles;
        _context.Usuarios.Add(_usuario);
    }

    string sLibros = "[{\"uIdLibro\":\"79097388-398f-48e0-86b0-5d5badb2c91e\",\"sCodigo\":\"00001\",\"sTitulo\":\"Combate espiritual\",\"sAutor\":\"Scúpoli, Lorenzo\",\"sISBN\":\"978-607-69767-7-7\",\"sEditorial\":\"García Bellorín Juana Auxiliadora\",\"iAnio\":2024,\"bDisponible\":true},{\"uIdLibro\":\"9f18181e-4fed-4f03-9b6b-b063bd2895e0\",\"sCodigo\":\"00002\",\"sTitulo\":\"El monstruo\",\"sAutor\":\"PardoNaredo,Pablo\",\"sISBN\":\"978-607-69899-1-3\",\"sEditorial\":\"Lid Editorial Mexicana\",\"iAnio\":2024,\"bDisponible\":true},{\"uIdLibro\":\"dc8285f8-72ac-41a2-929d-460e0f6f22e2\",\"sCodigo\":\"00003\",\"sTitulo\":\"El encuentro entre la docencia y la realidad pospandemia: experiencias y narrativas\",\"sAutor\":\"Contreras Dávalos, Julio\",\"sISBN\":\"978-607-495-730-3\",\"sEditorial\":\"Secretaría de Educación del Gobierno del Estado de México\",\"iAnio\":2024,\"bDisponible\":true},{\"uIdLibro\":\"801d9426-2e10-4012-900e-8cab0b60b28d\",\"sCodigo\":\"00004\",\"sTitulo\":\"Curso de ética general y aplicada\",\"sAutor\":\"Sada Fernández, Ricardo Manuel\",\"sISBN\":\"978-607-5909-13-4\",\"sEditorial\":\"Sada Fernández Ricardo Manuel\",\"iAnio\":2024,\"bDisponible\":true},{\"uIdLibro\":\"5689cb5f-3910-45a8-b80d-23d9e16dfb18\",\"sCodigo\":\"00005\",\"sTitulo\":\"Navegar en aguas bravas\",\"sAutor\":\"Alba Romo, José Marcos\",\"sISBN\":\"978-607-8804-14-6\",\"sEditorial\":\"Sabino Cruz Viveros\",\"iAnio\":2024,\"bDisponible\":true}]";
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

