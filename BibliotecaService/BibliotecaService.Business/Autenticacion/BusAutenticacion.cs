using BibliotecaService.Data;
using BibliotecaService.Entities.Autenticacion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BibliotecaService.Business.Autenticacion
{
    public class BusAutenticacion : IBusAutenticacion
    {
        private readonly ILogger<BusAutenticacion> _logger;
        private readonly IDatAutenticacion _datAutenticacion;
        private readonly IConfiguration _configuration;

        public BusAutenticacion(ILogger<BusAutenticacion> logger, IDatAutenticacion datAutenticacion, IConfiguration configuration)
        {
            _logger = logger;
            _datAutenticacion = datAutenticacion;
            _configuration = configuration;
        }

        public async Task<BBTCResponse<EntLoginResponse>> login(EntLoginRequest entLoginRequest)
        {
            BBTCResponse<EntLoginResponse> response = new BBTCResponse<EntLoginResponse>();
            try
            {
                var usuario = await _datAutenticacion.login(entLoginRequest);
                if (usuario.HasError || usuario.Result == null)
                {
                    response.SetError("Verifique sus credenciales");
                }
                else
                {
                    //Generar el token
                    var key = _configuration.GetSection("JwtSettings:Key");
                    var keyByte = Encoding.UTF8.GetBytes(key.Value);
                    var claims = new ClaimsIdentity();
                    var keySymmetric = new SymmetricSecurityKey(keyByte);

                    claims.AddClaim(new Claim("uIdUsuario", usuario.Result.uIdUsuario.ToString()));
                    var timeExp = _configuration.GetSection("JwtSettings:timeExpiration");
                    var credencialesToken = new SigningCredentials(keySymmetric, SecurityAlgorithms.HmacSha256);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = claims,
                        Expires = DateTime.UtcNow.AddMinutes(int.Parse(timeExp.Value)),
                        SigningCredentials = credencialesToken
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

                    string tokenCreado = tokenHandler.WriteToken(tokenConfig);
                    string expiraToken = tokenConfig.ValidTo.ToString();

                    var result = new EntLoginResponse
                    {
                        Token = new EntToken
                        {
                            Token = tokenCreado,
                            Expires = tokenConfig.ValidTo
                        },
                        Usuario = usuario.Result
                    };

                    response.SetSuccess(result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError("Error al autenticar usuario");
            }

            return response;
        }
    }
}