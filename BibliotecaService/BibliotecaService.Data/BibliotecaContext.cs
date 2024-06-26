using BibliotecaService.Entities.Libros;
using BibliotecaService.Entities.Prestamos;
using BibliotecaService.Entities.Roles;
using BibliotecaService.Entities.Usuarios;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaService.Data
{
    public class BibliotecaContext : DbContext
    {
        public DbSet<EntUsuario> Usuarios { get; set; }
        public DbSet<EntRol> Roles { get; set; }
        public DbSet<EntLibro> Libros { get; set; }
        public DbSet<EntPrestamo> Prestamos { get; set; }

        public BibliotecaContext(DbContextOptions<BibliotecaContext> options)
        : base(options)
        {
        }
    }
}