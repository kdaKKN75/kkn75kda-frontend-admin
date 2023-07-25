const ExpandTable = ({ data }) => {
    return (
        <div className="rounded-md my-3 mx-2 pb-3 text-sm shadow">
            <div className="w-full py-2 px-4 bg-slate-400 rounded-t-md">
                <h1 className="font-medium text-white">Biodata Penduduk</h1>
            </div>
            <div className="px-10 pt-3">
                <table className="table-fixed">
                    <tbody>
                        <tr className="h-7">
                            <td>Nama Lengkap</td>
                            <td className="px-10">:</td>
                            <td>Heri Junianto</td>
                        </tr>
                        <tr className="h-7">
                            <td>NIK</td>
                            <td className="px-10">:</td>
                            <td>3511082511780001</td>
                        </tr>
                        <tr className="h-7">
                            <td>Jenis Kelamin</td>
                            <td className="px-10">:</td>
                            <td>Laki - Laki</td>
                        </tr>
                        <tr className="h-7">
                            <td>Tempat Lahir</td>
                            <td className="px-10">:</td>
                            <td>Bondowoso</td>
                        </tr>
                        <tr className="h-7">
                            <td>Tanggal Lahir</td>
                            <td className="px-10">:</td>
                            <td>25-11-1978</td>
                        </tr>
                        <tr className="h-7">
                            <td>Agama</td>
                            <td className="px-10">:</td>
                            <td>Islam</td>
                        </tr>
                        <tr className="h-7">
                            <td>Pendidikan</td>
                            <td className="px-10">:</td>
                            <td>SLTP</td>
                        </tr>
                        <tr className="h-7">
                            <td>Pekerjaan</td>
                            <td className="px-10">:</td>
                            <td>Tukang Becak</td>
                        </tr>
                        <tr className="h-7">
                            <td>Status</td>
                            <td className="px-10">:</td>
                            <td>Menikah</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpandTable;
