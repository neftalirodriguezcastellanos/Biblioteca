using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Data;
using BibliotecaService.Entities.Libros;
using Microsoft.Extensions.Logging;

namespace BibliotecaService.Business.Libros
{
    public class BusLibros : IBusLibros
    {
        private readonly ILogger<BusLibros> _logger;
        private readonly IDatLibros _datLibros;

        public BusLibros(ILogger<BusLibros> logger, IDatLibros datLibros)
        {
            _logger = logger;
            _datLibros = datLibros;
        }

        public async Task<BBTCResponse<bool>> Actualizar(EntLibroDTO libro)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                if (string.IsNullOrEmpty(libro.uIdLibro.ToString()))
                {
                    response.SetError("El id del libro es requerido.");
                    return response;
                }

                EntLibro newLibro = new EntLibro
                {
                    uIdLibro = (Guid)libro.uIdLibro,
                    sCodigo = libro.sCodigo,
                    sTitulo = libro.sTitulo,
                    sAutor = libro.sAutor,
                    sISBN = libro.sISBN,
                    sEditorial = libro.sEditorial,
                    iAnio = libro.iAnio
                };

                response = await _datLibros.Actualizar(newLibro);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }

            return response;
        }

        public async Task<BBTCResponse<bool>> Agregar(EntLibroDTO libro)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                EntLibro newLibro = new EntLibro
                {
                    uIdLibro = Guid.NewGuid(),
                    sCodigo = libro.sCodigo,
                    sTitulo = libro.sTitulo,
                    sAutor = libro.sAutor,
                    sISBN = libro.sISBN,
                    sEditorial = libro.sEditorial,
                    iAnio = libro.iAnio
                };

                response = await _datLibros.Agregar(newLibro);
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
                response = await _datLibros.Eliminar(uIdLibro);
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
                response = await _datLibros.Obtener();
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
                response = await _datLibros.Obtener(uIdLibro);
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
                response = await _datLibros.librosDisponibles();
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