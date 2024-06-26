using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibliotecaService.Utils
{
    public static class StringExtensions
    {
        public static string ToUTF8(this string text)
        {
            Encoding iso = Encoding.GetEncoding("ISO-8859-1");
            string _text = Encoding.UTF8.GetString(iso.GetBytes(text));

            if (_text.IndexOf('�') != -1)
            {
                _text = text;
            }

            return _text;
        }

        public static string RemoveDiacritics(string text)
        {
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            foreach (var c in normalizedString)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }
    }
}