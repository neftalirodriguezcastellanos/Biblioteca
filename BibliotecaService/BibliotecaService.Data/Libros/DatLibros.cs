using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Libros;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BibliotecaService.Data
{
    public class DatLibros : IDatLibros
    {
        private readonly ILogger<DatLibros> _logger;
        private readonly BibliotecaContext _context;

        public DatLibros(ILogger<DatLibros> logger, BibliotecaContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<BBTCResponse<bool>> Actualizar(EntLibro libro)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                var validaCodigo = await _context.Libros.FirstOrDefaultAsync(x => x.sCodigo == libro.sCodigo && x.uIdLibro != libro.uIdLibro);
                if (validaCodigo != null)
                {
                    response.SetError("Ya existe un libro con el código " + libro.sCodigo + ".");
                    return response;
                }

                var libroExist = await _context.Libros.FirstOrDefaultAsync(x => x.uIdLibro == libro.uIdLibro);
                if (libroExist != null)
                {
                    _context.Entry(libroExist).CurrentValues.SetValues(libro);
                    if (await _context.SaveChangesAsync() != 0)
                    {
                        response.SetSuccess(true);
                    }
                    else
                    {
                        response.SetError("No hay datos para actualizar.");
                    }
                }
                else
                {
                    response.SetError("No se encontró el libro.");
                    return response;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }

            return response;
        }

        public async Task<BBTCResponse<bool>> Agregar(EntLibro libro)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                var libroExistente = await _context.Libros.FirstOrDefaultAsync(x => x.sCodigo == libro.sCodigo);
                if (libroExistente != null)
                {
                    response.SetError("Ya existe un libro con el código " + libro.sCodigo + ".");
                    return response;
                }

                _context.Libros.Add(libro);
                if (await _context.SaveChangesAsync() != 0)
                {
                    response.SetSuccess(true);
                }
                else
                {
                    response.SetError("No se pudo agregar el libro.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }

            return response;
        }

        public async Task<BBTCResponse<bool>> Eliminar(Guid uIdLibro)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                var libro = await _context.Libros.FirstOrDefaultAsync(x => x.uIdLibro == uIdLibro);
                if (libro != null)
                {
                    _context.Libros.Remove(libro);
                    if (await _context.SaveChangesAsync() != 0)
                    {
                        response.SetSuccess(true);
                    }
                    else
                    {
                        response.SetError("No se pudo eliminar el libro.");
                    }
                }
                else
                {
                    response.SetError("No se encontró el libro.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }
            return response;
        }

        public async Task<BBTCResponse<List<EntLibroListaDTO>>> Obtener()
        {
            BBTCResponse<List<EntLibroListaDTO>> response = new BBTCResponse<List<EntLibroListaDTO>>();

            try
            {
                var libros = await _context.Libros.Select(x => new EntLibroListaDTO
                {
                    uIdLibro = x.uIdLibro,
                    sCodigo = x.sCodigo,
                    sTitulo = x.sTitulo,
                    sAutor = x.sAutor,
                    sISBN = x.sISBN,
                    sEditorial = x.sEditorial,
                    iAnio = x.iAnio,
                    sPrestado = x.bDisponible ? "NO" : "SI"
                }).ToListAsync();

                response.SetSuccess(libros);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }

            return response;
        }

        public async Task<BBTCResponse<EntLibro>> Obtener(Guid uIdLibro)
        {
            BBTCResponse<EntLibro> response = new BBTCResponse<EntLibro>();

            try
            {
                var libro = await _context.Libros.FirstOrDefaultAsync(x => x.uIdLibro == uIdLibro);
                if (libro != null)
                {
                    response.SetSuccess(libro);
                }
                else
                {
                    response.SetError("No se encontró el libro.");

                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }

            return response;
        }

        public async Task<BBTCResponse<List<EntLibro>>> librosDisponibles()
        {
            BBTCResponse<List<EntLibro>> response = new BBTCResponse<List<EntLibro>>();
            try
            {
                var libros = await _context.Libros.Where(x => x.bDisponible == true).ToListAsync();
                if (libros != null)
                {
                    response.SetSuccess(libros);
                }
                else
                {
                    response.SetError("No hay libros disponibles");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en obtener libros disponibles");
                response.SetError(ex.Message);
            }
            return response;
        }
    }
}