using System;

namespace ConsoleApplication1
{
    class Program
    {
        public static ulong byteToLong(ulong a, ulong b, ulong c, ulong d) {
            ulong temp = (a*16777216L + b*65536L + c*256L + d);
            return temp;
        }

        public static DateTime DateTimeParser(long k)
        {
            DateTime RetVal = new DateTime(1900, 1, 1, 0, 0, 0, DateTimeKind.Utc);//**UTC** time
            RetVal = RetVal.AddMilliseconds(k);
            return RetVal;
        }

        static void Main(string[] args)
        {
            // tính t2 
            ulong nguyen = byteToLong((ulong)225, (ulong)72, (ulong)40, (ulong)208); // phần nguyên
            ulong thapPhan = byteToLong((ulong)41, (ulong)242, (ulong)12, (ulong)33); // phần thập phân
            ulong milliseconds = (nguyen * 1000) + ((thapPhan * 1000) / 0x100000000L);     
            DateTime T2 = DateTimeParser((long)milliseconds).ToLocalTime(); //T2

            // tính t3
            nguyen = byteToLong((ulong)225, (ulong)72, (ulong)40, (ulong)208); // phần nguyên
            thapPhan = byteToLong((ulong)41, (ulong)242, (ulong)52, (ulong)101); // phần thập phân
            milliseconds = (nguyen * 1000) + ((thapPhan * 1000) / 0x100000000L); 
            DateTime T3 = DateTimeParser((long)milliseconds).ToLocalTime(); //T3

            // tính t1 and t4
            nguyen = byteToLong((ulong)225, (ulong)72, (ulong)40, (ulong)195); // phần nguyên
            thapPhan = byteToLong((ulong)105, (ulong)242, (ulong)38, (ulong)249); // phần thập phân
            milliseconds = (nguyen * 1000) + ((thapPhan * 1000) / 0x100000000L); 
            DateTime T = DateTimeParser((long)milliseconds).ToLocalTime(); //T1

            DateTime T4 = DateTime.ParseExact("2019-10-09 09:37:29.229", "yyyy-MM-dd HH:mm:ss.fff", System.Globalization.CultureInfo.InvariantCulture);

            long Theta=(long)Math.Round(((T2.Ticks - T.Ticks) + (T3.Ticks - T4.Ticks))/2.0,0);

            string FormatDateTime = "dd/MM/yyyy HH:mm:ss.fff";
            Console.WriteLine("Originate Send Timestamp T1: " + T.ToString(FormatDateTime));
            Console.WriteLine(Environment.NewLine);
            Console.WriteLine("ReceiveTimestamp T2: " + T2.ToString(FormatDateTime));
            Console.WriteLine(Environment.NewLine);
            Console.WriteLine("Transmit Timestamp T3: " + T3.ToString(FormatDateTime));
            Console.WriteLine(Environment.NewLine);
            Console.WriteLine("Originate Receive Time stamp T4: " + T4.ToString(FormatDateTime));
            Console.WriteLine(Environment.NewLine);
            Console.WriteLine("Theta: " + Theta.ToString());
            Console.WriteLine(Environment.NewLine);
            T4 = T4.AddMilliseconds(Theta);
            Console.WriteLine("Final Time: " + T4.ToString(FormatDateTime));
            Console.ReadKey();
        }
    }
}