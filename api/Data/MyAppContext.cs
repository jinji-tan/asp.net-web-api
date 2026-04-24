

using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

namespace api.Data
{
    public class MyAppContext
    {
        private string _connectioString;
        public MyAppContext(IConfiguration config)
        {
            _connectioString = config.GetConnectionString("DefaultConnection") ??
            throw new Exception("Missing connection string");
        }

        private IDbConnection CreateConnection() => new SqlConnection(_connectioString);

        public async Task<IEnumerable<T>> LoadDataAsync<T>(string sql, object? parameter = null)
        {
            using var connection = CreateConnection();
            return await connection.QueryAsync<T>(sql, parameter);
        }

        public async Task<T?> LoadDataSingleAsync<T>(string sql, object? parameter)
        {
            using var connection = CreateConnection();
            return await connection.QueryFirstOrDefaultAsync<T>(sql, parameter);
        }

        public async Task<bool> ExecuteSqlAsync(string sql, object? parameter = null)
        {
            using var connection = CreateConnection();
            return await connection.ExecuteAsync(sql, parameter) > 0;
        }

        public async Task<int> ExecuteScalarAsync(string sql, object? parameter = null)
        {
            using var connection = CreateConnection();
            var result = await connection.ExecuteScalarAsync<int>(sql, parameter);
            return result;
        }
    }
}