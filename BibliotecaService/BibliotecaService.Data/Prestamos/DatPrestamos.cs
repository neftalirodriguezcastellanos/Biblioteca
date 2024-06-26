using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Prestamos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using BibliotecaService.Utils;
using BibliotecaService.Entities.Libros;

namespace BibliotecaService.Data
{
    public class DatPrestamos : IDatPrestamos
    {
        private readonly ILogger<DatPrestamos> _logger;
        private readonly BibliotecaContext _context;

        public DatPrestamos(ILogger<DatPrestamos> logger, BibliotecaContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<BBTCResponse<bool>> agregar(EntPrestamo entPrestamo)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                //Obtener el libro
                var libro = await _context.Libros.FirstOrDefaultAsync(l => l.uIdLibro == entPrestamo.uIdLibros);
                if (libro == null)
                {
                    response.SetError("No se encontro el libro");
                    return response;
                }
                else
                {
                    libro.bDisponible = false;
                    _context.Libros.Update(libro);
                }

                _context.Prestamos.Add(entPrestamo);

                if (await _context.SaveChangesAsync() == 0)
                {
                    response.SetError("No se pudo agregar el prestamo");
                }
                else
                {
                    response.SetSuccess(true);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al agregar prestamo");
                response.SetError(ex.Message);
            }

            return response;
        }

        public async Task<BBTCResponse<bool>> devolver(EntDevolver entDevolver)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                var prestamo = await _context.Prestamos.FirstOrDefaultAsync(p => p.uIdPrestamo == entDevolver.uIdPrestamo);
                if (prestamo == null)
                {
                    response.SetError("No se encontro el prestamo");
                    return response;
                }
                else
                {
                    _context.Entry(prestamo).CurrentValues.SetValues(entDevolver);

                    var libro = await _context.Libros.FirstOrDefaultAsync(l => l.uIdLibro == prestamo.uIdLibros);
                    if (libro == null)
                    {
                        response.SetError("No se encontro el libro");
                        return response;
                    }
                    else
                    {
                        libro.bDisponible = true;
                        _context.Libros.Update(libro);
                    }

                    if (await _context.SaveChangesAsync() == 0)
                    {
                        response.SetError("No se pudo devolver el libro");
                    }
                    else
                    {
                        response.SetSuccess(true);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al devolver libro");
                response.SetError(ex.Message);
            }
            return response;
        }

        public async Task<BBTCResponse<List<EntFilter>>> filtarUsuarios(string query)
        {
            BBTCResponse<List<EntFilter>> response = new BBTCResponse<List<EntFilter>>();

            try
            {
                List<EntFilter> usuarios = await _context.Usuarios
                    .Where(u =>
                        u.sEmail.ToLower().Contains(query.ToLower()) ||
                        u.sApellidos.ToLower().Contains(query.ToLower()) ||
                        u.sNombre.ToLower().Contains(query.ToLower()))
                    .Select(u => new EntFilter
                    {
                        Key = u.uIdUsuario.ToString(),
                        Id = u.sEmail,
                        Descripcion = u.sNombre + " " + u.sApellidos
                    })
                    .ToListAsync();

                response.SetSuccess(usuarios);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en filtrar usuarios");
                response.SetError(ex.Message);
            }

            return response;
        }

        public async Task<BBTCResponse<List<EntPrestamoUsuario>>> obtenerPrestamosUsuario()
        {
            BBTCResponse<List<EntPrestamoUsuario>> response = new BBTCResponse<List<EntPrestamoUsuario>>();
            try
            {
                var prestamos = from prestamo in _context.Prestamos
                                join usuario in _context.Usuarios on prestamo.uIdUsuarios equals usuario.uIdUsuario
                                join libro in _context.Libros on prestamo.uIdLibros equals libro.uIdLibro
                                where prestamo.bActivo
                                select new EntPrestamoUsuario
                                {
                                    uIdPrestamo = prestamo.uIdPrestamo,
                                    sNombre = usuario.sNombre + " " + usuario.sApellidos,
                                    sEmail = usuario.sEmail,
                                    sTitulo = libro.sTitulo,
                                    dtFechaPrestamo = prestamo.dtFechaPrestamo,
                                    dtFechaExpiracion = prestamo.dtFechaExpiracion,
                                    dtFechaDevolucion = prestamo.dtFechaDevolucion,
                                    sAutor = libro.sAutor,
                                    sCodigo = libro.sCodigo
                                };
                if (prestamos.Count() == 0)
                {
                    response.SetError("No se encontraron prestamos");
                }
                else
                {
                    response.SetSuccess(prestamos.ToList());
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener prestamos de usuario");
                response.SetError(ex.Message);
            }

            return response;
        }
    }
}