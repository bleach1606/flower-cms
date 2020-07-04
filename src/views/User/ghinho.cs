using System;
// DateTimeKind.Utc
// System.Globalization.CultureInfo.InvariantCulture
// AddMilliseconds
// Console
// WriteLine
// ParseExact
namespace ConsoleApplication1
{
    class Program
    {
        public static ulong byteToLong(ulong a, ulong b, ulong c, ulong d) {
        return (a*256L*256L*256L + b*256L*256L + c*256L + d);
        }

        public static DateTime DateTimeParser(long k) {
            DateTime temp = new DateTime(1900, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return temp.AddMilliseconds(k);
        }

        static void Main(string[] args) {
            ulong chan = byteToLong((ulong)225, (ulong)72, (ulong)40, (ulong)195); // phần nguyên
            ulong le = byteToLong((ulong)105, (ulong)242, (ulong)38, (ulong)249); // phần thập phân
            ulong millisecond = (chan*1000) + ((le*10000)/0x100000000L);
            DateTime T1 = DateTimeParser((long)(millisecond));
            String fomart = "yyyy-MM-dd HH:mm:ss.fff";
            DateTime T4 = DateTime.ParseExact("2019-10-09 09:37:29.229", fomart, 
            System.Globalization.CultureInfo.InvariantCulture);
            Console.WriteLine("T1 : " + T1.ToString(fomart));
            Console.WriteLine();
            Console.WriteLine("T4 : " + T4.ToString(fomart));
            Console.WriteLine();
            Console.ReadKey();
        }
    }
}