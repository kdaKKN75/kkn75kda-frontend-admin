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
                            <td>{data.namaLengkap}</td>
                        </tr>
                        <tr className="h-7">
                            <td>NIK</td>
                            <td className="px-10">:</td>
                            <td>{data.nik}</td>
                        </tr>
                        <tr className="h-7">
                            <td>Jenis Kelamin</td>
                            <td className="px-10">:</td>
                            <td>{data.gender}</td>
                        </tr>
                        <tr className="h-7">
                            <td>Tempat Lahir</td>
                            <td className="px-10">:</td>
                            <td>{data.tempat_lahir}</td>
                        </tr>
                        <tr className="h-7">
                            <td>Tanggal Lahir</td>
                            <td className="px-10">:</td>
                            <td>{data.tanggal_lahir}</td>
                        </tr>
                        <tr className="h-7">
                            <td>Agama</td>
                            <td className="px-10">:</td>
                            <td>{data.agama}</td>
                        </tr>
                        <tr className="h-7">
                            <td>Pendidikan</td>
                            <td className="px-10">:</td>
                            <td>{data.pendidikan}</td>
                        </tr>
                        <tr className="h-7">
                            <td>Pekerjaan</td>
                            <td className="px-10">:</td>
                            <td>{data.pekerjaan}</td>
                        </tr>
                        <tr className="h-7">
                            <td>No.HP</td>
                            <td className="px-10">:</td>
                            <td>{data.no_hp}</td>
                        </tr>
                        <tr className="h-7">
                            <td>Status</td>
                            <td className="px-10">:</td>
                            <td>{data.status}</td>
                        </tr>
                        <tr className="h-7">
                            <td>No.KK</td>
                            <td className="px-10">:</td>
                            <td>{data.no_kk}</td>
                        </tr>
                        <tr className="h-7">
                            <td>Dusun</td>
                            <td className="px-10">:</td>
                            <td>{data.dusun}</td>
                        </tr>
                        <tr className="h-7">
                            <td>RT</td>
                            <td className="px-10">:</td>
                            <td>{data.rt}</td>
                        </tr>
                        <tr className="h-7">
                            <td>RW</td>
                            <td className="px-10">:</td>
                            <td>{data.rw}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpandTable;
