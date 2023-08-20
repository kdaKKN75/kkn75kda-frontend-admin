const ModalPerangkatUpdate = ({ showModal, setShowModal, setFile, setNama, setJabatan, handleSubmit, title }) => {
    return (
        <>
            {showModal ? (
                <>
                    <div className="absolute no-scrollbar justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none transition duration-300 ease-in-out">
                        <div className="relative w-auto my-5 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">{`${title} Perangkat Desa`}</h3>
                                </div>
                                <div className="relative px-6 py-2 flex-auto">
                                    <div className="flex flex-col w-full">
                                        <label className="mb-2 font-medium" htmlFor="nama">
                                            Nama
                                        </label>
                                        <input
                                            className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                            type="text"
                                            id="nama"
                                            placeholder="Budi"
                                            onChange={(e) => setNama(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label className="mb-2 font-medium" htmlFor="jabatan">
                                            Jabatan
                                        </label>
                                        <input
                                            className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3"
                                            type="text"
                                            id="jabatan"
                                            placeholder="Kepala Desa"
                                            onChange={(e) => setJabatan(e.target.value)}
                                        />
                                    </div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Upload Foto</label>
                                    <input
                                        className="px-3 py-2 mb-2 border-2 border-slate-400 rounded-md focus:outline-meta-3 focus:caret-meta-3 file:bg-white file:border-meta-3 file:rounded file:text-sm"
                                        type="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        className="bg-meta-3 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={() => handleSubmit()}
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default ModalPerangkatUpdate;
