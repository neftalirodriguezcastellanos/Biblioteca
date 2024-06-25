using System.Net;

namespace BibliotecaService.Entities.Utils
{
    public class BBTCResponse<T> : IBBTCResponse<T>
    {
        public HttpStatusCode HttpCode { get; set; }
        public bool HasError { get; set; }
        public string Message { get; set; }
        public T Result { get; set; }

        public void SetSuccess(T result, string message = "OK")
        {
            HttpCode = HttpStatusCode.OK;
            HasError = false;
            Message = message;
            Result = result;
        }

        public void SetNotFound(T result, string message = "NotFound")
        {
            HttpCode = HttpStatusCode.NotFound;
            HasError = true;
            Message = message;
            Result = result;
        }

        public void SetError(Exception exception)
        {
            HttpCode = HttpStatusCode.InternalServerError;
            HasError = true;
            Message = exception.Message;
            Result = default(T);
        }

        public void SetError(string message)
        {
            HttpCode = HttpStatusCode.InternalServerError;
            HasError = true;
            Message = message;
            Result = default(T);
        }

        public void SetCreated(T result, string message = "Created", bool hasError = false)
        {
            HttpCode = HttpStatusCode.Created;
            HasError = hasError;
            Message = message;
            Result = result;
        }

        public void SetNoContent()
        {
            HttpCode = HttpStatusCode.NoContent;
            HasError = false;
            Message = string.Empty;
        }
    }
}