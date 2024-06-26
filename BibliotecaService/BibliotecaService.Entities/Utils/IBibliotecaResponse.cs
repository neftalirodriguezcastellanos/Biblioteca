using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaService.Entities.Utils
{
    public interface IBBTCResponse<T>
    {
        void SetSuccess(T result, string message = "Ok");
        void SetNotFound(T result, string message = "NotFound");
        void SetError(Exception exception);
        void SetError(string message);
        void SetCreated(T result, string message = "Created", bool hasError = false);
        void SetNoContent();
    }
}