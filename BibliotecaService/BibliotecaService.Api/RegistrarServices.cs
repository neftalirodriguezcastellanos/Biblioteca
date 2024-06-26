using BibliotecaService.Business.Autenticacion;
using BibliotecaService.Business.Libros;
using BibliotecaService.Business.Prestamos;
using BibliotecaService.Business.Roles;
using BibliotecaService.Business.Usuarios;
using BibliotecaService.Data;

namespace BibliotecaService.Api
{
    public static class RegistrarServices
    {
        public static IServiceCollection AddRegistration(this IServiceCollection services)
        {
            //Login
            services.AddScoped<IBusAutenticacion, BusAutenticacion>();
            services.AddScoped<IDatAutenticacion, DatAutenticacion>();

            //Usuarios
            services.AddScoped<IBusUsuarios, BusUsuarios>();
            services.AddScoped<IDatUsuarios, DatUsuarios>();

            //Roles
            services.AddScoped<IBusRoles, BusRoles>();
            services.AddScoped<IDatRoles, DatRoles>();

            //Libros
            services.AddScoped<IBusLibros, BusLibros>();
            services.AddScoped<IDatLibros, DatLibros>();

            //Préstamos
            services.AddScoped<IBusPrestamos, BusPrestamos>();
            services.AddScoped<IDatPrestamos, DatPrestamos>();

            return services;
        }
    }
}