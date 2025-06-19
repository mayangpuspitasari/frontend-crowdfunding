const UserTable = ({ data }) => {
  return (
    <table className="w-full border mt-4 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th>No</th>
          <th>Id User</th>
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
          <th>No Hp</th>
          <th>Tanggal Daftar</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, i) => (
          <tr key={user.id_user} className="text-center border-t">
            <td>{i + 1}</td>
            <td>{user.id_user}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>••••••</td>
            <td>{user.no_hp}</td>
            <td>{user.tanggal_daftar}</td>
            <td>
              <button>Edit</button> | <button>Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;

