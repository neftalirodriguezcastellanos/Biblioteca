using System.Data;
using BibliotecaService.Data;
using BibliotecaService.Entities.Libros;
using BibliotecaService.Entities.Prestamos;
using Microsoft.Extensions.Logging;

namespace BibliotecaService.Business.Prestamos
{
    public class BusPrestamos : IBusPrestamos
    {
        private readonly ILogger<BusPrestamos> _logger;
        private readonly IDatPrestamos _datPrestamos;

        public BusPrestamos(ILogger<BusPrestamos> logger, IDatPrestamos datPrestamos)
        {
            _logger = logger;
            _datPrestamos = datPrestamos;
        }

        public async Task<BBTCResponse<bool>> agregar(List<EntPrestamoRequest> entPrestamo)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                foreach (var item in entPrestamo)
                {
                    var prestamo = new EntPrestamo
                    {
                        uIdPrestamo = Guid.NewGuid(),
                        bActivo = item.bActivo,
                        dtFechaDevolucion = null,
                        dtFechaPrestamo = DateTime.Now,
                        dtFechaExpiracion = DateTime.Now.AddDays(3),
                        uIdLibros = item.uIdLibro,
                        uIdUsuarios = item.uIdUsuario
                    };

                    response = await _datPrestamos.agregar(prestamo);

                    if (response.HasError)
                    {
                        return response;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en agregar prestamo");
                response.SetError(ex.Message);
            }

            return response;
        }

        public async Task<BBTCResponse<bool>> devolver(List<EntDevolver> entDevolver)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                foreach (var item in entDevolver)
                {
                    item.dtFechaDevolucion = DateTime.Now;
                    item.bActivo = false;
                    response = await _datPrestamos.devolver(item);
                    if (response.HasError)
                    {
                        return response;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en devolver prestamo");
                response.SetError(ex.Message);
            }

            return response;
        }

        public async Task<BBTCResponse<List<EntFilter>>> filtarUsuarios(string query)
        {
            BBTCResponse<List<EntFilter>> response = new BBTCResponse<List<EntFilter>>();
            try
            {
                return await _datPrestamos.filtarUsuarios(query);
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
                return await _datPrestamos.obtenerPrestamosUsuario();
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